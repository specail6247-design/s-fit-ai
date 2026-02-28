import { NextRequest, NextResponse } from 'next/server';
import { generateCinematicVideo } from '@/lib/virtualTryOn';

export async function POST(req: NextRequest) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl || typeof imageUrl !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Missing or invalid imageUrl' },
        { status: 400 }
      );
    }

    // Security: Validate the URL to prevent SSRF or malicious inputs
    const isHttpUrl = imageUrl.startsWith('http://') || imageUrl.startsWith('https://');
    const isDataUri = imageUrl.startsWith('data:image/');

    if (!isHttpUrl && !isDataUri) {
      console.error('Security Warning: Invalid imageUrl format detected.');
      return NextResponse.json(
        { success: false, error: 'Invalid imageUrl format. Must be a valid HTTP(S) URL or image data URI.' },
        { status: 400 }
      );
    }

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
