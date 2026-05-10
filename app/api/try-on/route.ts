import { NextRequest, NextResponse } from 'next/server';

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

    const backendUrl = process.env.PYTHON_BACKEND_URL || 'http://localhost:8000';

    console.log(`Forwarding try-on request to Python backend at ${backendUrl}/api/try-on`);

    const response = await fetch(`${backendUrl}/api/try-on`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userPhotoUrl, garmentImageUrl, category: category || 'upper_body' })
    });

    if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || `Backend returned ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Try-on API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
