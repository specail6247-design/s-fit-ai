import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Server-side only OpenAI instance
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-key-here',
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageUrl } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'imageUrl is required' },
        { status: 400 }
      );
    }

    // Use openai instance to avoid unused warning
    if (!openai.apiKey || openai.apiKey === 'your-key-here') {
      console.warn("OpenAI API key missing on server, using mock analysis.");
    }

    // Mock analysis matching the original client-side mock
    // In the future, this is where the real OpenAI Vision call will happen
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

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return NextResponse.json(mockAnalysis);
  } catch (error) {
    console.error('Vision API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
