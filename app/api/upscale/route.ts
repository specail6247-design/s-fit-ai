import { NextRequest, NextResponse } from 'next/server';
import { upscaleImage } from '@/lib/virtualTryOn';

export async function POST(req: NextRequest) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: 'Missing imageUrl' },
        { status: 400 }
      );
    }

    const upscaledUrl = await upscaleImage(imageUrl);

    if (upscaledUrl) {
      return NextResponse.json({ success: true, imageUrl: upscaledUrl });
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to upscale image' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Upscale API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
