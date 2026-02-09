import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { subject, description } = await req.json();

    if (!subject || !description) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // In a real app, this would save to a database (e.g., Supabase) or send an email.
    // For now, we log to the console as requested.
    console.log('--- NEW SUPPORT REPORT ---');
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log(`Subject: ${subject}`);
    console.log(`Description: ${description}`);
    console.log('--------------------------');

    return NextResponse.json({ success: true, message: 'Report logged successfully' });
  } catch (error) {
    console.error('Error processing support report:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
