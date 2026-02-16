import { describe, it, expect } from 'vitest';
import { localFileToDataUri } from '@/lib/fileUtils';

describe('Security Check: Path Traversal', () => {
  it('should prevent access to files outside public directory', () => {
    // Attempt to access package.json which is one level up from public
    // The vulnerability allows resolving public/../package.json -> package.json
    const vulnerablePath = '/../package.json';

    const result = localFileToDataUri(vulnerablePath);

    // Expect null (secure behavior)
    // If vulnerable, it returns a data URI containing the file content
    expect(result).toBeNull();
  });

  it('should allow access to valid files in public directory', () => {
    const validPath = '/next.svg';
    const result = localFileToDataUri(validPath);

    // Expect data URI
    expect(result).not.toBeNull();
    expect(result).toMatch(/^data:image\/.*;base64,/);
  });
});
