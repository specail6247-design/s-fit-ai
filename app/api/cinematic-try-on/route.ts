import { NextRequest, NextResponse } from 'next/server';
import { generateCinematicVideo } from '@/lib/virtualTryOn';

export async function POST(req: NextRequest) {
  try {
    const { imageUrl, motionType } = await req.json();

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: 'Missing imageUrl' },
        { status: 400 }
      );
    }

    const result = await generateCinematicVideo(imageUrl, motionType);

    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to generate video' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
