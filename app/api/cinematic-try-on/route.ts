import { NextRequest, NextResponse } from 'next/server';
import { generateCinematicVideo as generateSVDVideo } from '@/lib/virtualTryOn';
import { generateRunwayVideo } from '@/lib/runway';

export async function POST(req: NextRequest) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: 'Missing imageUrl' },
        { status: 400 }
      );
    }

    // Attempt Runway Gen-3 first (High Fidelity)
    let result = await generateRunwayVideo(imageUrl);

    // Fallback to SVD if Runway fails or key missing
    if (!result.success) {
        console.log("Falling back to SVD generation due to:", result.error);
        result = await generateSVDVideo(imageUrl);
    }

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
