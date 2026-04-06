import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { imageUrl, prompt } = await request.json();

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    // Call Python FastAPI backend orchestration
    const fastApiUrl = process.env.AI_ORCHESTRATOR_URL || 'http://localhost:8000';

    try {
      const response = await fetch(`${fastApiUrl}/generate-motion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_url: imageUrl,
          prompt: prompt || 'Cinematic luxury fashion showcase, 4k, hyper-detailed, slow motion, professional lighting, fabric physics simulation'
        }),
      });

      if (!response.ok) {
        throw new Error(`FastAPI responded with status: ${response.status}`);
      }

      const data = await response.json();
      return NextResponse.json({ videoUrl: data.video_url });

    } catch (error) {
      console.warn('FastAPI backend not available, falling back to mock response', error);

      // Fallback for demo/development if python backend is not running
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 3000));

      return NextResponse.json({
        videoUrl: 'https://storage.googleapis.com/s-fit-assets/demo_cinematic_motion.mp4'
      });
    }

  } catch (error) {
    console.error('Cinematic try-on error:', error);
    return NextResponse.json(
      { error: 'Failed to process cinematic try-on' },
      { status: 500 }
    );
  }
}