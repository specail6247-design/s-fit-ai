import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Proxy the request to the FastAPI backend
    const response = await fetch('http://localhost:8000/api/m-fit/pipeline', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('FastAPI Backend Error:', response.status, errorText);
      return NextResponse.json(
        { success: false, error: `Backend error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Next.js Proxy Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server proxy error' },
      { status: 500 }
    );
  }
}
