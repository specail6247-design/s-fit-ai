import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json({ error: 'imageUrl is required' }, { status: 400 });
    }

    // Securely instantiate the SDK on the server using OPENAI_API_KEY
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'your-key-here',
    });

    console.log("Starting Deep Vision Analysis for image:", imageUrl.substring(0, 50) + "...");

    if (!openai.apiKey) {
      console.warn("OpenAI API key missing, using mock analysis.");
    }

    // Returning mock data to match existing behavior
    // In production, this would use the real openai.chat.completions API
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
