import { NextRequest, NextResponse } from 'next/server';
import { generateVirtualTryOn } from '@/lib/virtualTryOn';
import * as fs from 'fs';
import * as path from 'path';

// Config for Node.js Runtime (required for Replicate SDK)
export const runtime = 'nodejs';
export const maxDuration = 120;

// Helper: Validate that a URL is safe to use as an external resource
function isValidExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:image/');
}

// Helper: Convert local file to base64 data URI
async function localFileToDataUri(localPath: string): Promise<string | null> {
  try {
    // Remove leading slash and resolve to public directory
    const relativePath = localPath.startsWith('/') ? localPath.slice(1) : localPath;
    const publicDir = path.join(process.cwd(), 'public');
    const absolutePath = path.resolve(publicDir, relativePath);

    // Mitigate Path Traversal Vulnerability
    // Ensure the absolute path starts with the public directory path
    if (!absolutePath.startsWith(publicDir + path.sep) && absolutePath !== publicDir) {
      console.error('Invalid path:', absolutePath);
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

    // Validate User Photo against SSRF and malicious schemes
    if (!isValidExternalUrl(userPhotoUrl)) {
      return NextResponse.json(
        { error: 'Invalid userPhotoUrl scheme' },
        { status: 400 }
      );
    }
    const userPhotoInput: string = userPhotoUrl;

    // Process Garment Image
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
        console.log('Converted local file to data URI, length:', dataUri.length);
      } else if (isValidExternalUrl(garmentImageUrl)) {
        // External URL - Replicate can fetch this directly
        garmentImageInput = garmentImageUrl;
      } else {
        return NextResponse.json(
          { error: 'Invalid garmentImageUrl scheme' },
          { status: 400 }
        );
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
