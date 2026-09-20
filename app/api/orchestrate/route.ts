import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Use environment variable for backend URL, fallback to localhost for development
    const backendUrl = process.env.ORCHESTRATION_API_URL || 'http://localhost:8000';

    const response = await fetch(`${backendUrl}/api/v1/orchestrate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Orchestration backend failed: ${response.statusText}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Orchestration proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to orchestrate AI models' },
      { status: 500 }
    );
  }
}
