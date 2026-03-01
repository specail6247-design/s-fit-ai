import { NextRequest, NextResponse } from 'next/server';
import { generateVirtualTryOn, upscaleImage } from '@/lib/virtualTryOn';
import * as fs from 'fs';
import * as path from 'path';

// Config for Node.js Runtime (required for Replicate SDK)
export const runtime = 'nodejs';
export const maxDuration = 120;

function isValidExternalUrl(url: string): boolean {
  if (!url) return false;
  const lowerUrl = url.toLowerCase();
  return lowerUrl.startsWith('http://') || lowerUrl.startsWith('https://') || lowerUrl.startsWith('data:image/');
}

// Helper: Convert local file to base64 data URI
async function localFileToDataUri(localPath: string): Promise<string | null> {
  try {
    const relativePath = localPath.startsWith('/') ? localPath.slice(1) : localPath;
    const publicDir = path.resolve(process.cwd(), 'public');
    const absolutePath = path.resolve(publicDir, relativePath);

    // Prevent path traversal
    if (!absolutePath.startsWith(publicDir + path.sep) && absolutePath !== publicDir) {
      console.error('Path traversal attempt detected:', absolutePath);
      return null;
    }

    try {
      await fs.promises.access(absolutePath, fs.constants.R_OK);
    } catch {
      console.error('File not found or not readable:', absolutePath);
      return null;
    }

    const fileBuffer = await fs.promises.readFile(absolutePath);
    const base64 = fileBuffer.toString('base64');

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

export async function POST(req: NextRequest) {
  try {
    const { userPhotoUrl, garmentImageUrl, category } = await req.json();

    if (!userPhotoUrl || !garmentImageUrl) {
      return NextResponse.json(
        { success: false, error: 'Missing userPhotoUrl or garmentImageUrl' },
        { status: 400 }
      );
    }

    // Validate inputs
    let validUserPhoto = userPhotoUrl;
    if (typeof userPhotoUrl === 'string') {
        if (!isValidExternalUrl(userPhotoUrl) && !userPhotoUrl.startsWith('/')) {
             return NextResponse.json(
                { success: false, error: 'Invalid userPhotoUrl' },
                { status: 400 }
             );
        }
        if (userPhotoUrl.startsWith('/')) {
           const dataUri = await localFileToDataUri(userPhotoUrl);
           if (!dataUri) {
               return NextResponse.json(
                 { success: false, error: `Failed to read local image: ${userPhotoUrl}` },
                 { status: 400 }
               );
           }
           validUserPhoto = dataUri;
        }
    }

    let garmentImageInput = garmentImageUrl;
    if (typeof garmentImageUrl === 'string') {
        if (!isValidExternalUrl(garmentImageUrl) && !garmentImageUrl.startsWith('/')) {
             return NextResponse.json(
                { success: false, error: 'Invalid garmentImageUrl' },
                { status: 400 }
             );
        }
        if (garmentImageUrl.startsWith('/')) {
          const dataUri = await localFileToDataUri(garmentImageUrl);
          if (!dataUri) {
            return NextResponse.json(
              { success: false, error: `Failed to read local image: ${garmentImageUrl}` },
              { status: 400 }
            );
          }
          garmentImageInput = dataUri;
        }
    }

    const tryOnResult = await generateVirtualTryOn({
      userPhoto: validUserPhoto,
      garmentImage: garmentImageInput,
      category: category || 'upper_body'
    });

    if (!tryOnResult.success || !tryOnResult.imageUrl) {
      return NextResponse.json(
        { success: false, error: tryOnResult.error || 'Failed to generate try-on image' },
        { status: 500 }
      );
    }

    const upscaledImageUrl = await upscaleImage(tryOnResult.imageUrl);

    if (upscaledImageUrl) {
      return NextResponse.json({ success: true, imageUrl: upscaledImageUrl });
    } else {
      return NextResponse.json({ success: true, imageUrl: tryOnResult.imageUrl, warning: 'Failed to upscale image' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
