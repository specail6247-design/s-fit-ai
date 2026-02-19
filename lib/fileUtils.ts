import * as fs from 'fs';
import * as path from 'path';

/**
 * Converts a local file path (relative to public directory) to a data URI.
 * SECURITY: Prevents path traversal by ensuring the resolved path is within the public directory.
 * SECURITY: Restricts access to specific image extensions.
 */
export function localFileToDataUri(localPath: string): string | null {
  try {
    // 1. Resolve the public directory absolute path
    const publicDir = path.resolve(process.cwd(), 'public');

    // 2. Sanitize and resolve the target file path
    // Remove leading slash if present to treat it as relative to public
    const cleanPath = localPath.startsWith('/') ? localPath.slice(1) : localPath;
    const absolutePath = path.resolve(publicDir, cleanPath);

    // 3. SECURITY CHECK: Ensure the resolved path starts with the public directory path
    // This prevents directory traversal attacks (e.g., ../../etc/passwd)
    if (!absolutePath.startsWith(publicDir + path.sep)) {
      console.error(`Security Alert: Path traversal attempt blocked: ${localPath} -> ${absolutePath}`);
      return null;
    }

    // 4. SECURITY CHECK: Validate file extension
    const ext = path.extname(localPath).toLowerCase();
    const mimeTypes: Record<string, string> = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.webp': 'image/webp',
      '.gif': 'image/gif'
    };

    const mimeType = mimeTypes[ext];
    if (!mimeType) {
      console.warn(`Security Alert: Unsupported file type rejected: ${ext}`);
      return null;
    }

    // 5. Check if file exists
    if (!fs.existsSync(absolutePath)) {
      console.error('File not found:', absolutePath);
      return null;
    }

    // 6. Read file and convert to base64
    const fileBuffer = fs.readFileSync(absolutePath);
    const base64 = fileBuffer.toString('base64');

    return `data:${mimeType};base64,${base64}`;
  } catch (error) {
    console.error('Error reading local file:', error);
    return null;
  }
}
