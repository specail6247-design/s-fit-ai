import { NextRequest, NextResponse } from 'next/server';
import { generateVirtualTryOn, upscaleImage } from '@/lib/virtualTryOn';
import * as fs from 'fs';
import * as path from 'path';

// Config for Node.js Runtime (required for Replicate SDK)
export const runtime = 'nodejs';
export const maxDuration = 180; // Extended duration for 2-step process

// Helper: Convert local file to base64 data URI (Async)
async function localFileToDataUri(localPath: string): Promise<string | null> {
  try {
    // Remove leading slash and resolve to public directory
    const relativePath = localPath.startsWith('/') ? localPath.slice(1) : localPath;

    // Mitigate path traversal
    if (relativePath.includes('..')) {
      return null;
    }

    const absolutePath = path.join(process.cwd(), 'public', relativePath);

    // Ensure we are still within public directory
    if (!absolutePath.startsWith(path.join(process.cwd(), 'public'))) {
      return null;
    }

    console.log('Reading local file:', absolutePath);

    if (!fs.existsSync(absolutePath)) {
      console.error('File not found:', absolutePath);
      return null;
    }

    const fileBuffer = await fs.promises.readFile(absolutePath);
    const base64 = fileBuffer.toString('base64');

    // Determine MIME type from extension
    const ext = path.extname(localPath).toLowerCase();
    const mimeTypes: Record<string, string> = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.webp': 'image/webp',
      '.gif': 'image/gif'
    };
    const mimeType = mimeTypes[ext] || 'image/png';

    return `data:${mimeType};base64,${base64}`;
  } catch (error) {
    console.error('Error reading local file:', error);
    return null;
  }
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

    console.log('=== Starting Masterpiece Fit Pipeline ===');

    // 1. Process Garment Image (Local -> Data URI if needed)
    let garmentImageInput: string = garmentImageUrl;

    if (typeof garmentImageUrl === 'string') {
      if (garmentImageUrl.startsWith('data:')) {
        // Already a data URI - use as is
        garmentImageInput = garmentImageUrl;
      } else if (garmentImageUrl.startsWith('/')) {
        // Local file in public directory - convert to base64 data URI
        const dataUri = await localFileToDataUri(garmentImageUrl);
        if (!dataUri) {
          return NextResponse.json(
            { error: `Failed to read local image: ${garmentImageUrl}` },
            { status: 400 }
          );
        }
        garmentImageInput = dataUri;
        console.log('Converted local garment file to data URI');
      }
    }

    // 2. Step 1: Virtual Try-On (IDM-VTON)
    console.log('Step 1: IDM-VTON Generation...');
    const tryOnResult = await generateVirtualTryOn({
      userPhoto: userPhotoUrl,
      garmentImage: garmentImageInput,
      category: category || 'upper_body'
    });

    if (!tryOnResult.success || !tryOnResult.imageUrl) {
      console.error('Try-On failed:', tryOnResult.error);
      return NextResponse.json(
        { error: tryOnResult.error || 'Failed to generate try-on' },
        { status: 500 }
      );
    }

    console.log('Try-On Success. Result URL:', tryOnResult.imageUrl.substring(0, 50) + '...');

    // 3. Step 2: Texture Upscaling (Real-ESRGAN)
    console.log('Step 2: Hyper-Zoom Upscaling...');
    const upscaledUrl = await upscaleImage(tryOnResult.imageUrl);

    if (upscaledUrl) {
      console.log('Upscaling Success. Final URL:', upscaledUrl.substring(0, 50) + '...');
      return NextResponse.json({
        success: true,
        imageUrl: upscaledUrl,
        originalUrl: tryOnResult.imageUrl // Return both just in case
      });
    } else {
      console.warn('Upscaling failed or returned null. Returning original try-on result.');
      return NextResponse.json({
        success: true,
        imageUrl: tryOnResult.imageUrl,
        warning: 'Upscaling failed, returned standard resolution'
      });
    }

  } catch (error) {
    console.error('Masterpiece pipeline error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
