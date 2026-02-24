import * as fs from 'fs';
import * as path from 'path';

/**
 * Safely converts a local file to a base64 data URI.
 * Prevents path traversal by ensuring the file is within the public directory.
 *
 * @param localPath - The relative path to the file in the public directory (e.g., '/clothing/shirt.png')
 * @returns The base64 data URI or null if the file is invalid or unsafe.
 */
export function localFileToDataUri(localPath: string): string | null {
  try {
    const publicDir = path.join(process.cwd(), 'public');

    // Remove leading slash to make it relative for joining
    const relativePath = localPath.startsWith('/') ? localPath.slice(1) : localPath;

    // Resolve absolute path
    const absolutePath = path.resolve(publicDir, relativePath);

    // Security Check: Ensure path is within public directory to prevent traversal
    // We append path.sep to ensure we don't match partial directory names (e.g. public-backup)
    if (!absolutePath.startsWith(publicDir + path.sep) && absolutePath !== publicDir) {
      console.error('Security Warning: Attempted path traversal:', localPath);
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
