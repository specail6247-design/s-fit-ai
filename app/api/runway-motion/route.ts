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

    const backendUrl = process.env.FASTAPI_BACKEND_URL;

    if (backendUrl) {
      // Proxy request to the FastAPI backend instead of calling generateRunwayVideo directly
      const proxyResponse = await fetch(`${backendUrl}/api/v1/cinematic-motion`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageUrl: processedImageUrl })
      });

      const data = await proxyResponse.json();

      if (data.success) {
        return NextResponse.json({ success: true, videoUrl: data.videoUrl });
      } else {
        return NextResponse.json(
          { success: false, error: data.error || 'Failed to generate video' },
          { status: 500 }
        );
      }
    } else {
      // Fallback to direct SDK call if Python backend isn't configured for production deploy
      const videoUrl = await generateRunwayVideo(processedImageUrl);

      if (videoUrl) {
        return NextResponse.json({ success: true, videoUrl });
      } else {
        return NextResponse.json(
          { success: false, error: 'Failed to generate video' },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error('Runway Motion API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
