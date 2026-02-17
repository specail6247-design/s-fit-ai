import * as fs from 'fs';
import * as path from 'path';

// Helper: Convert local file to base64 data URI
export function localFileToDataUri(localPath: string): string | null {
  try {
    // Security: Prevent path traversal
    const publicDir = path.resolve(process.cwd(), 'public');
    // Remove leading slash to ensure we join relatively
    const safeRelativePath = localPath.startsWith('/') ? localPath.slice(1) : localPath;
    const absolutePath = path.resolve(publicDir, safeRelativePath);

    // Ensure the resolved path is strictly inside the public directory
    const relative = path.relative(publicDir, absolutePath);
    if (relative.startsWith('..') || path.isAbsolute(relative)) {
      console.error('Security alert: Path traversal attempt blocked:', localPath);
      return null;
    }

    console.log('Reading local file:', absolutePath);

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
