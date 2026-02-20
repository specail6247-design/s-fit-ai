import * as fs from 'fs';
import * as path from 'path';

/**
 * Converts a local file path to a base64 data URI.
 * Implements strict path traversal prevention and extension validation.
 * @param localPath The local file path (relative to public directory or absolute).
 * @returns The base64 data URI or null if invalid/not found.
 */
export function localFileToDataUri(localPath: string): string | null {
  try {
    // 1. Resolve the absolute path
    // Remove leading slash if present to treat as relative to CWD
    const relativePath = localPath.startsWith('/') ? localPath.slice(1) : localPath;
    const publicDir = path.join(process.cwd(), 'public');
    const absolutePath = path.resolve(publicDir, relativePath);

    // 2. Strict Path Traversal Check
    // Ensure the resolved path starts with the public directory
    const relative = path.relative(publicDir, absolutePath);
    if (relative.startsWith('..') || path.isAbsolute(relative)) {
      console.error('Security Alert: Path traversal attempt detected:', localPath);
      return null;
    }

    // 3. Verify File Existence
    if (!fs.existsSync(absolutePath)) {
      console.error('File not found:', absolutePath);
      return null;
    }

    // 4. Validate File Extension (Allowlist)
    const allowedExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif'];
    const ext = path.extname(absolutePath).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      console.error('Security Alert: Invalid file extension:', ext);
      return null;
    }

    // 5. Read File and Convert to Base64
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
