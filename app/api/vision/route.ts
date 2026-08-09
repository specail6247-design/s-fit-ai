import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-key-here',
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageUrl } = body;

    if (!imageUrl) {
      return NextResponse.json({ error: 'imageUrl is required' }, { status: 400 });
    }

    if (!openai.apiKey) {
      console.warn("OpenAI API key missing, using mock analysis.");
    }

    // Simulate analysis
    return new Promise<NextResponse>((resolve) => {
      setTimeout(() => {
        resolve(NextResponse.json({
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
        }));
      }, 2000);
    });
  } catch (error) {
    console.error('Vision API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
