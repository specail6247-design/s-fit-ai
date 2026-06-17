import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Server-side OpenAI instance
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-key-here',
});

export async function POST(request: Request) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    // Use openai instance in the future for real API calls
    console.log("Starting Deep Vision Analysis for image:", imageUrl.substring(0, 50) + "...");

    if (!openai.apiKey || openai.apiKey === 'your-key-here') {
      console.warn("OpenAI API key missing or default, using mock analysis.");
    }

    // Mock response for client-side demo purposes
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

  } catch (error: any) {
    console.error("Vision API Error:", error);
    return NextResponse.json({ error: 'Failed to analyze clothing style' }, { status: 500 });
  }
}
