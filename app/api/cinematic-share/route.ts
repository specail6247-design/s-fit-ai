import { NextRequest, NextResponse } from 'next/server';
import { generateRunwayVideo } from '@/lib/runway';

export const runtime = 'nodejs';
export const maxDuration = 120;

export async function POST(req: NextRequest) {
  try {
    const { imageUrl, prompt } = await req.json();

    if (!imageUrl) {
      return NextResponse.json({ success: false, error: 'Missing imageUrl' }, { status: 400 });
    }

    const result = await generateRunwayVideo(imageUrl, prompt);

    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }
  } catch (error: unknown) {
    console.error('Cinematic Share API Error:', error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
