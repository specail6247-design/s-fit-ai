import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 120;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userPhotoUrl, garmentImageUrl, category } = body;

    if (!userPhotoUrl || !garmentImageUrl) {
      return NextResponse.json(
        { error: 'userPhotoUrl and garmentImageUrl are required' },
        { status: 400 }
      );
    }

    // Forward to our Python FastAPI Backend for Masterpiece AI Orchestration
    const backendUrl = process.env.PYTHON_BACKEND_URL || 'http://localhost:8000';

    console.log(`Forwarding try-on request to ${backendUrl}/api/orchestrate...`);

    const response = await fetch(`${backendUrl}/api/orchestrate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_photo_url: userPhotoUrl,
        garment_image_url: garmentImageUrl,
        category: category || 'upper_body'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Backend returned ${response.status}: ${errorText}`);
    }

    const result = await response.json();

    if (result.success) {
      // Return the tryon image and also the cinematic motion video if requested
      return NextResponse.json({
        success: true,
        imageUrl: result.tryon_image_url,
        videoUrl: result.final_video_url,
        textureSharpened: result.texture_sharpened
      });
    } else {
      return NextResponse.json(
        { error: result.error || 'Failed to generate try-on' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Try-on API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
