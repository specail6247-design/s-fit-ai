import { NextResponse } from 'next/server';
import { analyzeClothingStyle } from '@/lib/visionService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { imageUrl } = body;

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    const analysis = await analyzeClothingStyle(imageUrl);
    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Vision API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
