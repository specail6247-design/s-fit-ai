import { NextRequest, NextResponse } from 'next/server';
import { generateCinematicVideo } from '@/lib/virtualTryOn';
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

    // 1. Attempt Runway Gen-3 (High Fidelity)
    if (process.env.RUNWAY_API_SECRET) {
      console.log("Using Runway Gen-3 Engine for Cinematic Motion...");
      const runwayResult = await generateRunwayVideo(imageUrl);

      if (runwayResult.success) {
        return NextResponse.json(runwayResult);
      }

      console.warn("Runway generation failed, falling back to SVD:", runwayResult.error);
      // Fallback proceeds below
    }

    // 2. Fallback to SVD (Standard)
    console.log("Using Standard SVD Engine (Replicate)...");
    const result = await generateCinematicVideo(imageUrl);

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
