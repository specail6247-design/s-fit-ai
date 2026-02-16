import * as fs from 'fs';
import * as path from 'path';

// Helper: Convert local file to base64 data URI
export function localFileToDataUri(localPath: string): string | null {
  try {
    // Remove leading slash and resolve to public directory
    const relativePath = localPath.startsWith('/') ? localPath.slice(1) : localPath;

    // Security Fix: Prevent path traversal
    const publicDir = path.resolve(process.cwd(), 'public');
    const absolutePath = path.resolve(publicDir, relativePath);

    console.log('Reading local file:', absolutePath);

    // Verify the resolved path is inside the public directory
    if (!absolutePath.startsWith(publicDir + path.sep)) {
      console.error('Security violation: Attempted path traversal:', absolutePath);
      return null;
    }

    if (!fs.existsSync(absolutePath)) {
      console.error('File not found:', absolutePath);
      return null;
    }

    const fileBuffer = fs.readFileSync(absolutePath);
    const base64 = fileBuffer.toString('base64');

    // Determine MIME type from extension
    const ext = path.extname(localPath).toLowerCase();
    const mimeTypes: Record<string, string> = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.webp': 'image/webp',
      '.gif': 'image/gif'
    };
    const mimeType = mimeTypes[ext] || 'image/png';

    return `data:${mimeType};base64,${base64}`;
  } catch (error) {
    console.error('Error reading local file:', error);
    return null;
  }
}
