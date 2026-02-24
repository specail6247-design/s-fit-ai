import { describe, it, expect } from 'vitest';
import { localFileToDataUri } from '@/lib/fileUtils';

describe('localFileToDataUri', () => {
  it('should return null for path traversal attempt', () => {
    // Attempt to access package.json which is outside public/
    const result = localFileToDataUri('../package.json');
    expect(result).toBeNull();
  });

  it('should return null for non-existent file', () => {
    const result = localFileToDataUri('non-existent.png');
    expect(result).toBeNull();
  });

  it('should return data URI for valid file in public', () => {
     // We rely on next.svg existing in public/
     const result = localFileToDataUri('next.svg');
     // The implementation defaults to image/png for unknown extensions like svg
     // We just check it returns a string
     expect(typeof result).toBe('string');
     expect(result?.startsWith('data:')).toBe(true);
  });
});
