import { NextRequest, NextResponse } from 'next/server';
import { generateVirtualTryOn } from '@/lib/virtualTryOn';
import * as fs from 'fs';
import * as path from 'path';

// Config for Node.js Runtime (required for Replicate SDK)
export const runtime = 'nodejs';
export const maxDuration = 120;

// Helper: Convert local file to base64 data URI
function localFileToDataUri(localPath: string): string | null {
  try {
    // Remove leading slash and resolve to public directory
    const relativePath = localPath.startsWith('/') ? localPath.slice(1) : localPath;

    // Security Fix: Prevent Path Traversal
    const publicDir = path.join(process.cwd(), 'public');
    const absolutePath = path.resolve(publicDir, relativePath);

    // Ensure the path is still within the public directory
    if (!absolutePath.startsWith(publicDir + path.sep)) {
      console.error('Security Warning: Path traversal attempt blocked:', absolutePath);
      return null;
    }
    
    console.log('Reading local file:', absolutePath);
    
    if (!fs.existsSync(absolutePath)) {
      console.error('File not found:', absolutePath);
      return null;
    }
    
    const fileBuffer = fs.readFileSync(absolutePath);
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

    // Process User Photo - Keep as data URI string for Replicate
    const userPhotoInput: string = userPhotoUrl;
    // Replicate accepts data URIs directly

    // Process Garment Image
    let garmentImageInput: string = garmentImageUrl;

    if (typeof garmentImageUrl === 'string') {
      if (garmentImageUrl.startsWith('data:')) {
        // Already a data URI - use as is
        garmentImageInput = garmentImageUrl;
      } else if (garmentImageUrl.startsWith('/')) {
        // Local file in public directory - convert to base64 data URI
        const dataUri = localFileToDataUri(garmentImageUrl);
        if (!dataUri) {
          return NextResponse.json(
            { error: `Failed to read local image: ${garmentImageUrl}` },
            { status: 400 }
          );
        }
        garmentImageInput = dataUri;
        console.log('Converted local file to data URI, length:', dataUri.length);
      } else if (garmentImageUrl.startsWith('http://') || garmentImageUrl.startsWith('https://')) {
        // External URL - Replicate can fetch this directly
        garmentImageInput = garmentImageUrl;
      }
    }

    console.log('Calling Replicate with:');
    console.log('- userPhoto type:', userPhotoInput.startsWith('data:') ? 'data URI' : 'URL');
    console.log('- garmentImage type:', garmentImageInput.startsWith('data:') ? 'data URI' : 'URL');
    console.log('- category:', category || 'upper_body');

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
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
