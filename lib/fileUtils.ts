import * as fs from 'fs';
import * as path from 'path';

/**
 * Securely converts a local file in the public directory to a base64 data URI.
 * Prevents path traversal attacks by ensuring the file is within the public directory.
 */
export function localFileToDataUri(localPath: string): string | null {
  try {
    // Remove leading slash to make it relative (e.g., '/clothing/shirt.jpg' -> 'clothing/shirt.jpg')
    const relativePath = localPath.startsWith('/') ? localPath.slice(1) : localPath;

    // Resolve the absolute path to the public directory
    const publicDir = path.resolve(process.cwd(), 'public');

    // Resolve the absolute path to the requested file
    const absolutePath = path.resolve(publicDir, relativePath);

    // Security Check: Ensure the resolved path starts with the public directory path
    // We add path.sep to ensure we don't match partial directory names (e.g. /public-backup)
    if (!absolutePath.startsWith(publicDir + path.sep)) {
      console.error('Security Warning: Path traversal attempt detected:', localPath);
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
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml'
    };
    const mimeType = mimeTypes[ext] || 'application/octet-stream';

    return `data:${mimeType};base64,${base64}`;
  } catch (error) {
    console.error('Error reading local file:', error);
    return null;
  }
}
