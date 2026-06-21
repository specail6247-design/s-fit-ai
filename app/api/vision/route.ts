import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Server-side OpenAI instantiation
// Mock key used if env variable is missing to prevent crashes
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-key-here',
});

export async function POST(req: NextRequest) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Missing imageUrl' },
        { status: 400 }
      );
    }

    console.log("Server-Side: Starting Deep Vision Analysis for image:", imageUrl.substring(0, 50) + "...");

    // Currently, this simulates a delay and returns mock data as in the original implementation.
    // In a full production app, you would make the actual call to openai.chat.completions here.

    if (!openai.apiKey || openai.apiKey === 'your-key-here') {
      console.warn("OpenAI API key missing or mock, using mock analysis.");
    }

    // Simulate 2-second processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockAnalysis = {
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
    };

    return NextResponse.json(mockAnalysis);
  } catch (error: unknown) {
    console.error('Vision API Error:', error);
    // Secure error response without leaking details
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
