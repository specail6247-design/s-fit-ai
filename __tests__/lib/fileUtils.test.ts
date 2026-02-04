import { describe, it, expect } from 'vitest';
import { localFileToDataUri } from '@/lib/fileUtils';

describe('localFileToDataUri', () => {
  it('should return null for path traversal attempts (../package.json)', () => {
    // Attempt to access package.json at root (outside public)
    const result = localFileToDataUri('../package.json');
    expect(result).toBeNull();
  });

  it('should return null for absolute path traversal (/../../package.json)', () => {
    // Attempt to access root via absolute-like path
    const result = localFileToDataUri('/../../package.json');
    expect(result).toBeNull();
  });

  it('should return null for non-existent files', () => {
    const result = localFileToDataUri('non-existent-image.png');
    expect(result).toBeNull();
  });

  it('should read a valid file in public directory', () => {
    // next.svg exists in public
    const result = localFileToDataUri('next.svg');
    expect(result).not.toBeNull();
    expect(result).toContain('base64');
  });
});
