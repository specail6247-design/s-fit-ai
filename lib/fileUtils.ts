import * as fs from 'fs';
import * as path from 'path';

/**
 * Securely converts a local file path to a base64 data URI.
 * Prevents path traversal outside the public directory.
 * Only allows specific image extensions.
 *
 * @param localPath - The relative path to the file (e.g., '/images/garment.png')
 * @returns The data URI string or null if invalid/not found
 */
export function localFileToDataUri(localPath: string): string | null {
  try {
    // 1. Sanitize the path
    // Remove leading slash if present to make it relative for path.join
    const relativePath = localPath.startsWith('/') ? localPath.slice(1) : localPath;

    // 2. Resolve absolute path
    const publicDir = path.join(process.cwd(), 'public');
    const absolutePath = path.resolve(publicDir, relativePath);

    // 3. Security Check: Path Traversal
    // Ensure the resolved path starts with the public directory path
    const relativeToPublic = path.relative(publicDir, absolutePath);
    const isInsidePublic = !relativeToPublic.startsWith('..') && !path.isAbsolute(relativeToPublic);

    if (!isInsidePublic) {
      console.error('Security Alert: Path traversal attempt detected:', localPath);
      return null;
    }

    // 4. Security Check: Allowed Extensions
    const allowedExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif'];
    const ext = path.extname(absolutePath).toLowerCase();

    if (!allowedExtensions.includes(ext)) {
       console.error('Security Alert: Invalid file extension:', ext);
       return null;
    }

    // 5. File Existence Check
    if (!fs.existsSync(absolutePath)) {
      console.error('File not found:', absolutePath);
      return null;
    }

    // 6. Read and Convert
    const fileBuffer = fs.readFileSync(absolutePath);
    const base64 = fileBuffer.toString('base64');

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
