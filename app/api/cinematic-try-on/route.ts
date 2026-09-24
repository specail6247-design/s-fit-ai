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

    const backendUrl = process.env.FASTAPI_BACKEND_URL;

    if (backendUrl) {
      // Proxy request to the FastAPI backend instead of calling generateCinematicVideo directly
      const proxyResponse = await fetch(`${backendUrl}/api/v1/cinematic-motion`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageUrl })
      });

      const data = await proxyResponse.json();

      if (data.success) {
        return NextResponse.json(data);
      } else {
        return NextResponse.json(
          { success: false, error: data.error || 'Failed to generate video' },
          { status: 500 }
        );
      }
    } else {
      // Fallback
      const result = await generateCinematicVideo(imageUrl);

      if (result.success) {
        return NextResponse.json(result);
      } else {
        return NextResponse.json(
          { success: false, error: result.error || 'Failed to generate video' },
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
