import * as fs from 'fs';
import * as path from 'path';

// Helper: Convert local file to base64 data URI
export function localFileToDataUri(localPath: string): string | null {
  try {
    // SECURITY: Prevent path traversal
    const cwd = process.cwd();
    const publicDir = path.resolve(cwd, 'public');

    // Remove leading slash to ensure path.resolve treats it as relative to publicDir
    // Also handles backslashes for cross-platform safety
    const normalizedLocalPath = localPath.replace(/^[\/\\]/, '');
    const absolutePath = path.resolve(publicDir, normalizedLocalPath);

    // Ensure the resolved path is still inside the public directory
    const relative = path.relative(publicDir, absolutePath);
    const isSafe = relative && !relative.startsWith('..') && !path.isAbsolute(relative);

    if (!isSafe) {
      console.error('Security violation: Access outside public directory denied:', absolutePath);
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
