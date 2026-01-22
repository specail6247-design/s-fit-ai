import { NextRequest, NextResponse } from 'next/server';
import { generateVirtualTryOn } from '@/lib/virtualTryOn';
import fs from 'fs';
import path from 'path';

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
    let userPhotoBuffer: Buffer | string = userPhotoUrl;
    if (typeof userPhotoUrl === 'string' && userPhotoUrl.startsWith('data:')) {
      // Convert Data URI to Buffer
      userPhotoBuffer = dataUriToBuffer(userPhotoUrl);
    }

    // Process Garment Image
    let garmentImageBuffer: Buffer | string = garmentImageUrl;
    if (typeof garmentImageUrl === 'string' && garmentImageUrl.startsWith('/')) {
      // Local file in public directory - resolve to absolute path
      const filePath = path.join(process.cwd(), 'public', garmentImageUrl);
      try {
        if (fs.existsSync(filePath)) {
          garmentImageBuffer = fs.readFileSync(filePath);
        } else {
          console.error(`Garment file not found at ${filePath}`);
          return NextResponse.json(
            { error: 'Garment image file not found' },
            { status: 404 }
          );
        }
      } catch (err) {
        console.error('Error reading garment file:', err);
        return NextResponse.json(
          { error: 'Failed to read garment file' },
          { status: 500 }
        );
      }
    } else if (typeof garmentImageUrl === 'string' && garmentImageUrl.startsWith('data:')) {
       garmentImageBuffer = dataUriToBuffer(garmentImageUrl);
    }

    // Call Replicate API
    const result = await generateVirtualTryOn({
      userPhoto: userPhotoBuffer,
      garmentImage: garmentImageBuffer,
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

// Config for Vercel
export const maxDuration = 60;
