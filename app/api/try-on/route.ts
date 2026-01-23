import { NextRequest, NextResponse } from 'next/server';
import { generateVirtualTryOn } from '@/lib/virtualTryOn';

// Config for Vercel Edge Runtime
export const runtime = 'edge';
export const maxDuration = 60;

// Helper to convert data URI to Buffer
function dataUriToBuffer(dataUri: string): Buffer {
  const split = dataUri.split(',');
  const base64 = split.length > 1 ? split[1] : split[0];
  return Buffer.from(base64, 'base64');
}

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

    // Process User Photo
    let userPhotoInput: Buffer | string = userPhotoUrl;
    if (typeof userPhotoUrl === 'string' && userPhotoUrl.startsWith('data:')) {
      // Convert Data URI to Buffer
      userPhotoInput = dataUriToBuffer(userPhotoUrl);
    }

    // Process Garment Image
    let garmentImageInput: Buffer | string = garmentImageUrl;

    if (typeof garmentImageUrl === 'string') {
        if (garmentImageUrl.startsWith('/')) {
             // Local file in public directory - resolve to absolute URL
             // Note: In Edge Runtime we cannot use fs, so we provide the URL
             // for Replicate to fetch.
             const appUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;
             const baseUrl = appUrl.endsWith('/') ? appUrl.slice(0, -1) : appUrl;
             garmentImageInput = `${baseUrl}${garmentImageUrl}`;
        } else if (garmentImageUrl.startsWith('data:')) {
             garmentImageInput = dataUriToBuffer(garmentImageUrl);
        }
    }

    // Call Replicate API
    const result = await generateVirtualTryOn({
      userPhoto: userPhotoInput,
      garmentImage: garmentImageInput,
      category: category || 'upper_body'
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        imageUrl: result.imageUrl
      });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Try-on API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
