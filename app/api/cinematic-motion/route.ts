import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 120;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageUrl, prompt } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'imageUrl is required' },
        { status: 400 }
      );
    }

    // Call Python Backend
    const backendUrl = (process.env.PYTHON_BACKEND_URL || 'http://127.0.0.1:8000') + '/cinematic-motion';
    console.log(`Forwarding request to Python Backend: ${backendUrl}`);

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: imageUrl,
          prompt: prompt || "Cinematic slow motion fashion shoot, high fashion, 4k, highly detailed"
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Backend error: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      return NextResponse.json(data);

    } catch (backendError) {
      console.error('Python Backend Connection Error:', backendError);
      return NextResponse.json(
        { error: 'Failed to connect to AI Engine (Python Backend). Ensure it is running on port 8000.' },
        { status: 503 }
      );
    }

  } catch (error) {
    console.error('Cinematic API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
