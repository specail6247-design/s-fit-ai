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
    const absolutePath = path.join(process.cwd(), 'public', relativePath);
    
    if (!fs.existsSync(absolutePath)) {
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

    // Process User Photo
    const userPhotoInput: string = userPhotoUrl;

    // Process Garment Image
    let garmentImageInput: string = garmentImageUrl;

    if (typeof garmentImageUrl === 'string') {
      if (garmentImageUrl.startsWith('data:')) {
        garmentImageInput = garmentImageUrl;
      } else if (garmentImageUrl.startsWith('/')) {
        const dataUri = localFileToDataUri(garmentImageUrl);
        if (!dataUri) {
          return NextResponse.json({ error: `Failed to read local image: ${garmentImageUrl}` }, { status: 400 });
        }
        garmentImageInput = dataUri;
      } else if (garmentImageUrl.startsWith('http://') || garmentImageUrl.startsWith('https://')) {
        garmentImageInput = garmentImageUrl;
      }
    }

    // Check if the backend is configured, else fallback to local lib
    const backendUrl = process.env.FASTAPI_BACKEND_URL;

    if (backendUrl) {
      // Proxy request to the FastAPI backend
      const proxyResponse = await fetch(`${backendUrl}/api/v1/orchestrate-try-on`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userPhotoUrl: userPhotoInput,
            garmentImageUrl: garmentImageInput,
            category: category || 'upper_body'
          })
      });

      const data = await proxyResponse.json();

      if (data.success) {
        return NextResponse.json({ success: true, imageUrl: data.imageUrl });
      } else {
        return NextResponse.json({ error: data.error || 'Failed to generate try-on' }, { status: 500 });
      }
    } else {
       // Fallback to direct call if python backend isn't configured for production deploy
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
    }
  } catch (error) {
    console.error('Try-on API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
