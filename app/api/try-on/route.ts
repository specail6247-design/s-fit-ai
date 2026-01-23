import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

// Config for Node.js Runtime
export const runtime = 'nodejs';
export const maxDuration = 120;

// Helper: Convert local file to base64 data URI
function localFileToDataUri(localPath: string): string | null {
  try {
    const relativePath = localPath.startsWith('/') ? localPath.slice(1) : localPath;
    const absolutePath = path.join(process.cwd(), 'public', relativePath);
    
    if (!fs.existsSync(absolutePath)) {
      console.error('File not found:', absolutePath);
      return null;
    }
    
    const fileBuffer = fs.readFileSync(absolutePath);
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

    // Process Garment Image
    let garmentImageInput: string = garmentImageUrl;
    if (typeof garmentImageUrl === 'string' && garmentImageUrl.startsWith('/')) {
      const dataUri = localFileToDataUri(garmentImageUrl);
      if (dataUri) {
        garmentImageInput = dataUri;
      }
    }

    // Call Python Backend
    const backendUrl = (process.env.PYTHON_BACKEND_URL || 'http://127.0.0.1:8000') + '/try-on';
    console.log(`Forwarding request to Python Backend: ${backendUrl}`);

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userPhotoUrl: userPhotoUrl,
          garmentImageUrl: garmentImageInput,
          category: category || 'upper_body'
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Backend error: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      return NextResponse.json(data);

    } catch (backendError) {
      console.error('Python Backend Connection Error:', backendError);
      return NextResponse.json(
        { error: 'Failed to connect to AI Engine (Python Backend). Ensure it is running on port 8000.' },
        { status: 503 }
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
