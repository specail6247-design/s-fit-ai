import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Proxy request to the dedicated Python FastAPI orchestration server
    const backendRes = await fetch('http://localhost:8000/api/v1/orchestrate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!backendRes.ok) {
        return NextResponse.json({ success: false, error: "Backend error" }, { status: backendRes.status });
    }

    const data = await backendRes.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Orchestrate proxy error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error connecting to backend' },
      { status: 500 }
    );
  }
}
