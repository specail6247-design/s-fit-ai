import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ClothingStyleAnalysis } from '@/lib/visionService';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-key-here',
});

export async function POST(request: Request) {
  try {
    const { imageUrl } = await request.json();

    console.log("Starting Deep Vision Analysis for image:", imageUrl?.substring(0, 50) + "...");

    if (!openai.apiKey || openai.apiKey === 'your-key-here') {
      console.warn("OpenAI API key missing, using mock analysis.");
    }

    const mockResult: ClothingStyleAnalysis = {
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

    await new Promise(resolve => setTimeout(resolve, 2000));

    return NextResponse.json(mockResult);
  } catch (error) {
    console.error('Vision analysis error:', error);
    return NextResponse.json({ error: 'Failed to analyze image' }, { status: 500 });
  }
}
