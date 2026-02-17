import { describe, it, expect } from 'vitest';
import { localFileToDataUri } from '../app/api/try-on/route';

describe('Security Checks', () => {
  it('should prevent path traversal attacks', () => {
    // Attempt to access package.json which is one level above public directory
    // public/../package.json
    const maliciousPath = '../package.json';

    const result = localFileToDataUri(maliciousPath);

    // Expect the function to return null, blocking the access
    expect(result).toBeNull();
  });
});
