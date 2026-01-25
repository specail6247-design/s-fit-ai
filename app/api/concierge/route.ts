import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
// Note: Client-side usage is prevented by Next.js, but this is a server route.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  // Check for API key or development mock mode
  const apiKey = process.env.OPENAI_API_KEY;
  const isDev = process.env.NODE_ENV !== 'production';
  const shouldMock = !apiKey && isDev;

  if (!apiKey && !shouldMock) {
    return NextResponse.json(
      { error: 'OpenAI API key not configured' },
      { status: 500 }
    );
  }

  try {
    const { action, item, userStats } = await req.json();

    if (!action) {
      return NextResponse.json(
        { error: 'Missing action parameter' },
        { status: 400 }
      );
    }

    if (shouldMock) {
       console.warn('[VoiceConcierge] Running in MOCK mode due to missing API key in dev.');
       const mockScript = "Welcome to the S-Fit AI Concierge (Mock Mode).";
       // Return a dummy buffer (text as buffer, won't play but won't crash fetch)
       const buffer = Buffer.from("mock audio data");

       return new NextResponse(buffer, {
         headers: {
           'Content-Type': 'audio/mpeg',
           'Content-Length': buffer.length.toString(),
           'X-Script-Text': mockScript,
         },
       });
    }

    // 1. Generate Contextual Script
    const systemPrompt = `You are a high-end luxury fashion concierge at an exclusive digital boutique.
Your tone is sophisticated, polite, attentive, and knowledgeable.
You are speaking to a valued client. Keep your response brief (1-2 sentences max).
Avoid sounding robotic. Use elegant vocabulary.`;

    let userPrompt = '';

    switch (action) {
      case 'welcome':
        userPrompt = `The user has just entered the private fitting suite. Welcome them warmly.`;
        break;
      case 'select_item':
        if (!item) throw new Error('Item data required for selection event');
        userPrompt = `The user has selected the following item:
        Name: ${item.name}
        Brand: ${item.brand}
        Category: ${item.category}
        Material/Description: ${item.description || 'Premium material'}
        Price: ${item.price} ${item.currency}
        Is Luxury: ${item.isLuxury}

        Comment on this specific choice. Mention the brand heritage or the material quality. Compliment their taste.`;
        break;
      case 'complete_look':
        userPrompt = `The user has just completed a virtual try-on with ${item?.name || 'the selected ensemble'}.
        The look is ready. Congratulate them on the stunning result and suggest saving or sharing it.`;
        break;
      default:
        userPrompt = `The user performed action: ${action}. Acknowledge it politely.`;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 100,
      temperature: 0.7,
    });

    const script = completion.choices[0].message.content || "Excellent choice.";
    console.log(`[VoiceConcierge] Generated script: "${script}"`);

    // 2. Generate Audio (TTS)
    const mp3 = await openai.audio.speech.create({
      model: "tts-1-hd",
      voice: "shimmer",
      input: script,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': buffer.length.toString(),
        'X-Script-Text': script, // Send script back in headers for potential captioning
      },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    console.error('[VoiceConcierge] Error:', error);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
