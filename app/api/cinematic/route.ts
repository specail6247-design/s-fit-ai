import { NextRequest, NextResponse } from 'next/server';
import { upscaleImage, generateCinematicVideo } from '@/lib/virtualTryOn';

export const runtime = 'nodejs';
export const maxDuration = 120; // 2 minutes timeout for long processes

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, imageUrl } = body;

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    if (action === 'upscale') {
        console.log('Processing upscale request for:', imageUrl);
        const resultUrl = await upscaleImage(imageUrl);
        if (resultUrl) {
            return NextResponse.json({ success: true, resultUrl });
        } else {
            return NextResponse.json({ error: 'Upscaling failed' }, { status: 500 });
        }
    } else if (action === 'video') {
        console.log('Processing video generation request for:', imageUrl);
        const result = await generateCinematicVideo(imageUrl);
        if (result.success) {
            return NextResponse.json({ success: true, resultUrl: result.videoUrl });
        } else {
            return NextResponse.json({ error: result.error || 'Video generation failed' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: 'Invalid action. Use "upscale" or "video".' }, { status: 400 });
    }

  } catch (error) {
    console.error('Cinematic API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
