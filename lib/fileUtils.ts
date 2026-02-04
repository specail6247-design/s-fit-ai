import * as fs from 'fs';
import * as path from 'path';

/**
 * Securely converts a local file in the public directory to a base64 data URI.
 * Prevents path traversal by ensuring the resolved path is within the public directory.
 *
 * @param localPath - The relative path to the file (e.g., '/images/avatar.jpg')
 * @returns The base64 data URI or null if file not found or access denied.
 */
export function localFileToDataUri(localPath: string): string | null {
  try {
    // Remove leading slash if present to make it relative for path.join
    const relativePath = localPath.startsWith('/') ? localPath.slice(1) : localPath;

    const publicDir = path.join(process.cwd(), 'public');
    const absolutePath = path.join(publicDir, relativePath);

    // Security Check: Path Traversal
    // Normalize path to resolve '..' segments
    const normalizedPath = path.normalize(absolutePath);

    // Check if the normalized path is still within the public directory
    const rel = path.relative(publicDir, normalizedPath);

    const isSafe = !rel.startsWith('..') && !path.isAbsolute(rel);

    if (!isSafe) {
      console.error('Security Warning: Path traversal attempt detected:', localPath);
      return null;
    }

    console.log('Reading local file:', normalizedPath);

    if (!fs.existsSync(normalizedPath)) {
      console.error('File not found:', normalizedPath);
      return null;
    }

    const fileBuffer = fs.readFileSync(normalizedPath);
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
