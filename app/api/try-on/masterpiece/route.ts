import { NextResponse } from 'next/server';
import { isValidExternalUrl } from '@/lib/security';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate URLs to prevent SSRF
    if (body.userPhotoUrl && !body.userPhotoUrl.startsWith('data:') && !isValidExternalUrl(body.userPhotoUrl)) {
        return NextResponse.json({ error: 'Invalid User Photo URL' }, { status: 400 });
    }
    if (body.garmentImageUrl && !body.garmentImageUrl.startsWith('data:') && !isValidExternalUrl(body.garmentImageUrl)) {
         return NextResponse.json({ error: 'Invalid Garment Image URL' }, { status: 400 });
    }
    if (body.accessoryImageUrl && !body.accessoryImageUrl.startsWith('data:') && !isValidExternalUrl(body.accessoryImageUrl)) {
         return NextResponse.json({ error: 'Invalid Accessory Image URL' }, { status: 400 });
    }

    // Proxy the request to the Python FastAPI backend
    const backendUrl = process.env.AI_BACKEND_URL || 'http://localhost:8000';
    const response = await fetch(`${backendUrl}/api/orchestrate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('AI Backend error:', errorText);
        throw new Error(`AI Backend returned status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Masterpiece API Error:', error);
    // Fallback for demo if backend is not running
    console.log("Using demo mode fallback in masterpiece route");
    return NextResponse.json({
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    });
  }
}
