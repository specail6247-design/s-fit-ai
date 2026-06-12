import { NextRequest, NextResponse } from 'next/server';
import { generateRunwayVideo, upscaleImage } from '@/lib/virtualTryOn';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageUrl, upscale } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: 'Missing imageUrl' },
        { status: 400 }
      );
    }

    let processedImageUrl = imageUrl;

    // Optional upscale step before video generation
    if (upscale) {
      const upscaled = await upscaleImage(imageUrl);
      if (upscaled) {
        processedImageUrl = upscaled;
      }
    }

    const videoUrl = await generateRunwayVideo(processedImageUrl);

    if (videoUrl) {
      return NextResponse.json({ success: true, videoUrl });
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to generate video' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Runway Motion API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
