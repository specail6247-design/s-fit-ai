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

    const orchestratorUrl = process.env.AI_ORCHESTRATOR_URL || 'http://localhost:8000';
    let videoUrl = null;

    try {
      const orchestratorResponse = await fetch(`${orchestratorUrl}/generate-runway-motion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: processedImageUrl, upscale }),
      });
      if (orchestratorResponse.ok) {
        const orchestratorData = await orchestratorResponse.json();
        if (orchestratorData.success && orchestratorData.videoUrl) {
          videoUrl = orchestratorData.videoUrl;
        }
      }
    } catch (e) {
      console.warn("Orchestrator not available or failed. Falling back to lib/virtualTryOn", e);
    }

    if (!videoUrl) {
      videoUrl = await generateRunwayVideo(processedImageUrl);
    }

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
