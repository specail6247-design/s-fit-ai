import * as fs from 'fs';
import * as path from 'path';

/**
 * Safely converts a local file path within the 'public' directory to a base64 Data URI.
 * This function enforces strict path validation to prevent directory traversal attacks.
 *
 * @param localPath - The relative path to the file inside the 'public' directory (e.g., '/images/test.png')
 * @returns The Data URI string (e.g., 'data:image/png;base64,...') or null if invalid/not found.
 */
export function localFileToDataUri(localPath: string): string | null {
  try {
    // 1. Sanitize input: Remove leading slash if present
    const relativePath = localPath.startsWith('/') ? localPath.slice(1) : localPath;

    // 2. Define the base directory (public)
    const publicDir = path.join(process.cwd(), 'public');

    // 3. Resolve the absolute path
    const absolutePath = path.resolve(publicDir, relativePath);

    // 4. SECURITY CHECK: Prevent Path Traversal
    const relativeCheck = path.relative(publicDir, absolutePath);

    // Check if the path attempts to go outside the public directory (starts with '..')
    // Also check if it's absolute (which path.relative handles, but good to be explicit on some systems)
    if (relativeCheck.startsWith('..') || path.isAbsolute(relativeCheck)) {
      console.error(`Security Warning: Path traversal attempt detected. Input: ${localPath}, Resolved: ${absolutePath}`);
      return null;
    }

    // 5. Check existence
    if (!fs.existsSync(absolutePath)) {
      console.error('File not found:', absolutePath);
      return null;
    }

    // 6. Read file and convert to base64
    const fileBuffer = fs.readFileSync(absolutePath);
    const base64 = fileBuffer.toString('base64');

    // 7. Determine MIME type
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
