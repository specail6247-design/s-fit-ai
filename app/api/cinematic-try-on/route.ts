import { NextRequest, NextResponse } from 'next/server';
import { generateCinematicVideo } from '@/lib/virtualTryOn';

export async function POST(req: NextRequest) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: 'Missing imageUrl' },
        { status: 400 }
      );
    }

    try {
        const response = await fetch('http://localhost:8000/api/orchestrate/cinematic', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageUrl })
        });

        const result = await response.json();

        if (result.success) {
            return NextResponse.json(result);
        } else {
            return NextResponse.json({ success: false, error: result.error || 'Failed to generate video' }, { status: 500 });
        }
    } catch {
        // Fallback to internal lib
        const fallbackResult = await generateCinematicVideo(imageUrl);

        if (fallbackResult.success) {
          return NextResponse.json(fallbackResult);
        } else {
          return NextResponse.json(
            { success: false, error: fallbackResult.error || 'Failed to generate video' },
            { status: 500 }
          );
        }
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
