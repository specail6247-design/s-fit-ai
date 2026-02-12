import { describe, it, expect } from 'vitest';
import { localFileToDataUri } from '../../app/api/try-on/route';

describe('Security: Path Traversal Vulnerability', () => {

  it('should allow access to valid files in public directory', () => {
    // We use a known file in the repo
    const validPath = '/clothing/cos_top.png';
    const result = localFileToDataUri(validPath);
    expect(result).not.toBeNull();
    expect(result?.startsWith('data:image/png;base64,')).toBe(true);
  });

  it('should block access to files outside public directory (simple traversal)', () => {
    // Attempt to access package.json in root
    const maliciousPath = '/../package.json';
    const result = localFileToDataUri(maliciousPath);

    // This assertion should pass IF the code is secure.
    // If vulnerable, it returns the file content, so this assertion fails.
    expect(result).toBeNull();
  });

  it('should block access to files outside public directory (nested traversal)', () => {
    const maliciousPath = '/clothing/../../package.json';
    const result = localFileToDataUri(maliciousPath);
    expect(result).toBeNull();
  });
});
