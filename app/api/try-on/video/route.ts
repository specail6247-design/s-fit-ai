import { NextRequest, NextResponse } from 'next/server';
import { generateCinematicVideo } from '@/lib/virtualTryOn';

export const runtime = 'nodejs';
export const maxDuration = 180; // Video generation is slow

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageUrl } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'imageUrl is required' },
        { status: 400 }
      );
    }

    console.log('=== Starting Cinematic Video Pipeline ===');
    console.log('Input Image:', imageUrl.substring(0, 50) + '...');

    const result = await generateCinematicVideo(imageUrl);

    if (result.success && result.videoUrl) {
      console.log('Video Generation Success:', result.videoUrl);
      return NextResponse.json({
        success: true,
        videoUrl: result.videoUrl
      });
    } else {
      console.error('Video Generation Failed:', result.error);
      return NextResponse.json(
        { error: result.error || 'Failed to generate video' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Cinematic video API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
