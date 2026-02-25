import { NextRequest, NextResponse } from 'next/server';
import { upscaleImage } from '@/lib/virtualTryOn';

export const runtime = 'nodejs';
export const maxDuration = 120;

export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'imageUrl is required' },
        { status: 400 }
      );
    }

    const upscaledUrl = await upscaleImage(imageUrl);

    if (upscaledUrl) {
      return NextResponse.json({ success: true, imageUrl: upscaledUrl });
    } else {
      return NextResponse.json({ error: 'Upscaling failed' }, { status: 500 });
    }
  } catch (error) {
    console.error('Upscale API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
