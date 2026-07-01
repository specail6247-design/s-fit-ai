import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: Request) {
  try {
    const { imageUrl } = await request.json();

    // Server-side initialization protects the API key
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'missing-key',
    });

    console.log("Starting Deep Vision Analysis on server for image:", imageUrl?.substring(0, 50) + "...");

    if (openai.apiKey === 'missing-key') {
      console.warn("OpenAI API key missing on server, using mock analysis.");
    }

    // A real app would call openai.chat.completions.create(...) here.
    // For now, return the mock data.
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
    console.error('Vision API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
