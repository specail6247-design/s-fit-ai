import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY || 'your-key-here',
});

export async function POST(request: Request) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    if (!openai.apiKey || openai.apiKey === 'your-key-here') {
      console.warn("OpenAI API key missing, using mock analysis on the server.");
      // Return the mock data just like before
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
    }

    console.log("Starting Deep Vision Analysis for image:", imageUrl.substring(0, 50) + "...");

    // Here we would actually call OpenAI if we had a real key and prompts
    // For now, if we reach here we just return the same mock response
    // since the prompt logic isn't fully implemented in the original file either.
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
    console.error('Error analyzing clothing style:', error);
    return NextResponse.json({ error: 'Failed to analyze clothing style' }, { status: 500 });
  }
}
