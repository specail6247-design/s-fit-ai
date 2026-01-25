import { describe, it, expect } from 'vitest';
import { localFileToDataUri } from '@/app/api/try-on/route';

describe('Security: Path Traversal in localFileToDataUri', () => {

  it('should allow access to valid files in public directory', () => {
    // public/next.svg exists in the repo
    const result = localFileToDataUri('/next.svg');

    // It should successfully read the file
    expect(result).not.toBeNull();
    // Due to the implementation defaulting to png for unknown extensions, we verify it returns a data URI
    expect(result).toMatch(/^data:image\/.*;base64,/);
  });

  it('should BLOCK access to files outside public directory (path traversal)', () => {
    // Attempt to read package.json from root (../package.json relative to public/)
    // This file definitely exists in the root
    const result = localFileToDataUri('/../package.json');

    // Vulnerability Check:
    // If vulnerable, it returns the base64 content of package.json.
    // If secure, it returns null.

    // We expect it to be secure.
    expect(result).toBeNull();
  });
});
