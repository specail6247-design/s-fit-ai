import { NextRequest, NextResponse } from 'next/server';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { v4 as uuidv4 } from 'uuid';
import os from 'os';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const tempDir = os.tmpdir();
    const fileName = `body-scan-${uuidv4()}.jpg`;
    const filePath = join(tempDir, fileName);

    await writeFile(filePath, buffer);

    try {
      // Execute the HMR adapter script
      // Note: Assuming 'python3' is available in the environment path
      const scriptPath = join(process.cwd(), 'scripts', 'hmr_adapter.py');
      const { stdout, stderr } = await execAsync(`python3 "${scriptPath}" "${filePath}"`);

      if (stderr) {
        console.warn('HMR Script stderr:', stderr);
      }

      const result = JSON.parse(stdout);

      if (!result.success) {
         throw new Error(result.error || 'Unknown error in analysis script');
      }

      return NextResponse.json(result);

    } catch (error) {
      console.error('Body analysis error:', error);
      return NextResponse.json(
        { error: 'Failed to analyze body shape', details: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    } finally {
      // Cleanup temp file
      try {
        await unlink(filePath);
      } catch (e) {
        console.error('Failed to cleanup temp file:', e);
      }
    }

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
