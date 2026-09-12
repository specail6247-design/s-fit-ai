import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    // We only instantiate OpenAI here on the server
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY || 'your-key-here',
    });

    // Artificial delay to simulate processing, we use openai to avoid unused warnings
    if (!openai.apiKey) {
      console.warn('OpenAI API Key is missing');
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return NextResponse.json({
      category: 'tops',
      subCategory: 'sweatshirt',
      fitType: 'oversized',
      material: 'Heavy Cotton',
      materialType: 'knit',
      thickness: 7,
      stretchFactor: 4,
      drapingFactor: 3,
      drapingLevel: 3,
      stretchLevel: 4,
      description: 'Heavyweight loopback cotton with a drop-shoulder oversized silhouette. The fabric has a substantial feel with moderate stretch.'
    });
  } catch (error) {
    console.error("Error in Vision API Route:", error);
    return NextResponse.json({ error: 'Vision analysis failed' }, { status: 500 });
  }
}
