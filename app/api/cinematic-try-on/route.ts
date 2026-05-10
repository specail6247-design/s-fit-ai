import { NextRequest, NextResponse } from 'next/server';

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

    const backendUrl = process.env.PYTHON_BACKEND_URL || 'http://localhost:8000';

    console.log(`Forwarding try-on request to Python backend at ${backendUrl}/api/try-on`);

    const tryOnResponse = await fetch(`${backendUrl}/api/try-on`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userPhotoUrl, garmentImageUrl, category: category || 'upper_body' })
    });

    if (!tryOnResponse.ok) {
        const errData = await tryOnResponse.json().catch(() => ({}));
        throw new Error(errData.detail || `Backend TryOn returned ${tryOnResponse.status}`);
    }

    const tryOnData = await tryOnResponse.json();
    const imageUrl = tryOnData.imageUrl;

    if (!imageUrl) {
         throw new Error("No image URL generated from TryOn");
    }

    console.log(`Forwarding video generation request to Python backend at ${backendUrl}/api/generate-video`);

    const videoResponse = await fetch(`${backendUrl}/api/generate-video`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ imageUrl })
    });

    if (!videoResponse.ok) {
        const errData = await videoResponse.json().catch(() => ({}));
        throw new Error(errData.detail || `Backend GenerateVideo returned ${videoResponse.status}`);
    }

    const videoData = await videoResponse.json();

    return NextResponse.json({
        success: true,
        imageUrl: imageUrl,
        videoUrl: videoData.videoUrl
    });
  } catch (error) {
    console.error('Cinematic Try-on API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
