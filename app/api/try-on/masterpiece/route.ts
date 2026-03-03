import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';
import { isValidExternalUrl } from '@/lib/security';

export const runtime = 'nodejs';
export const maxDuration = 120;

async function localFileToDataUri(localPath: string): Promise<string | null> {
  try {
    const relativePath = localPath.startsWith('/') ? localPath.slice(1) : localPath;
    const publicDir = path.resolve(process.cwd(), 'public');
    const absolutePath = path.resolve(publicDir, relativePath);

    if (!absolutePath.startsWith(publicDir + path.sep) && absolutePath !== publicDir) {
      console.error('Security alert: Path traversal attempt denied');
      return null;
    }

    try {
      await fs.promises.access(absolutePath);
    } catch {
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

    if (!isValidExternalUrl(userPhotoUrl) && !userPhotoUrl.startsWith('/')) {
        return NextResponse.json({ error: 'Invalid userPhotoUrl' }, { status: 400 });
    }

    let userPhotoInput = userPhotoUrl;
    if (userPhotoUrl.startsWith('/')) {
        const dataUri = await localFileToDataUri(userPhotoUrl);
        if (!dataUri) return NextResponse.json({ error: 'Failed to read local image' }, { status: 400 });
        userPhotoInput = dataUri;
    }

    let garmentImageInput = garmentImageUrl;
    if (!isValidExternalUrl(garmentImageUrl) && !garmentImageUrl.startsWith('/')) {
         return NextResponse.json({ error: 'Invalid garmentImageUrl' }, { status: 400 });
    }

    if (garmentImageUrl.startsWith('/')) {
      const dataUri = await localFileToDataUri(garmentImageUrl);
      if (!dataUri) {
        return NextResponse.json(
          { error: `Failed to read local image: ${garmentImageUrl}` },
          { status: 400 }
        );
      }
      garmentImageInput = dataUri;
    }

    // Call FastAPI Backend
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000/api/orchestrate';

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userPhotoUrl: userPhotoInput,
        garmentImageUrl: garmentImageInput,
        category: category || 'upper_body'
      })
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Backend returned ${response.status}: ${text}`);
    }

    const result = await response.json();

    if (result.success) {
      return NextResponse.json({
        success: true,
        imageUrl: result.imageUrl,
        videoUrl: result.videoUrl
      });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Masterpiece API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
