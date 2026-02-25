import * as fs from 'fs';
import * as path from 'path';

/**
 * Securely reads a local file from the public directory and converts it to a Data URI.
 * Prevents path traversal attacks by ensuring the resolved path is within the public directory.
 *
 * @param localPath Relative path to the file in the public directory (e.g., 'clothing/shirt.png')
 * @returns Data URI string or null if file not found or access denied
 */
export function localFileToDataUri(localPath: string): string | null {
  try {
    const publicDir = path.resolve(process.cwd(), 'public');

    // Remove leading slash to handle as relative path
    // We treat all paths as relative to public directory
    const relativePath = localPath.replace(/^\/+/, '');

    // Resolve absolute path
    const absolutePath = path.resolve(publicDir, relativePath);

    // Security Check: Ensure the resolved path starts with the public directory
    // We add path.sep to ensure we don't match partial folder names (e.g. public-backup)
    if (!absolutePath.startsWith(publicDir + path.sep)) {
      console.error(`Security Warning: Path traversal detected for '${localPath}'. Resolved to '${absolutePath}' which is outside '${publicDir}'`);
      return null;
    }

    // console.log('Reading local file:', absolutePath);

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
