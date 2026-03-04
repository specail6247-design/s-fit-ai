import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Forward orchestration request to Python/FastAPI backend
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';

    const response = await fetch(`${backendUrl}/orchestrate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Masterpiece Orchestration API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error during Masterpiece orchestration' },
      { status: 500 }
    );
  }
}
