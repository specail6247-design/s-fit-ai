import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subject, description } = body;

    if (!subject || !description) {
      return NextResponse.json(
        { error: 'Subject and description are required' },
        { status: 400 }
      );
    }

    // In a real app, this would save to a database or send an email.
    // For this demo, we log to the server console.
    console.log('--- NEW SUPPORT REPORT ---');
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log(`Subject: ${subject}`);
    console.log(`Description: ${description}`);
    console.log('--------------------------');

    return NextResponse.json({ success: true, message: 'Report received' });
  } catch (error) {
    console.error('Error processing report:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
