import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { subject, description } = body;

    if (!subject || !description) {
      return NextResponse.json(
        { error: 'Subject and description are required.' },
        { status: 400 }
      );
    }

    console.log(`[SUPPORT REPORT] Subject: ${subject}`);
    console.log(`[SUPPORT REPORT] Description: ${description}`);
    // Here you would typically save to database or send email

    return NextResponse.json({ success: true, message: 'Report submitted successfully.' });
  } catch (error) {
    console.error('Error submitting report:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
