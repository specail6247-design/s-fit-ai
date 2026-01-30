import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { imageUrl, imageBase64 } = body;

    if (!imageUrl && !imageBase64) {
      return NextResponse.json({ success: false, error: 'Missing image data' }, { status: 400 });
    }

    // Call Python Service
    // Default to localhost:8000 if not set
    const pythonServiceUrl = process.env.PYTHON_SERVICE_URL || 'http://127.0.0.1:8000';

    try {
      const res = await fetch(`${pythonServiceUrl}/enhance-texture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_url: imageUrl,
          image_base64: imageBase64
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error('Python service error:', errText);
        // Fallback: If python service fails, return original image?
        // Or strictly fail. Let's return error so UI knows.
        return NextResponse.json({ success: false, error: 'Texture enhancement failed' }, { status: 502 });
      }

      const data = await res.json();
      return NextResponse.json(data);

    } catch (fetchError) {
      console.error('Failed to connect to Python service:', fetchError);
      // Fail gracefully or strictly.
      // Prompt implies "Build a seamless pipeline", so we should probably alert the user
      // or just return the original if we wanted to be robust, but for this task
      // we want to prove the python service is working/integrated.
      return NextResponse.json({ success: false, error: 'AI Texture Engine unavailable' }, { status: 503 });
    }

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
