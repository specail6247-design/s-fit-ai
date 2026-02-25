import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import * as path from 'path';
import * as fs from 'fs';

// Mock fs module
vi.mock('fs', () => ({
  existsSync: vi.fn(),
  readFileSync: vi.fn(),
}));

import { localFileToDataUri } from '../../../lib/fileUtils';

describe('localFileToDataUri', () => {
  const originalCwd = process.cwd;
  // Use a simulated path for the app root
  const mockCwd = path.resolve('/tmp/mock-app');

  beforeEach(() => {
    // Mock process.cwd() to return our controlled path
    process.cwd = vi.fn().mockReturnValue(mockCwd);

    // Setup fs mocks
    vi.mocked(fs.existsSync).mockImplementation((filePath) => {
      // Simulate that 'valid.png' exists in the public directory
      // We need to be careful with path separators in tests
      const p = filePath.toString();
      return p.includes('valid.png') || p.includes('valid.jpg');
    });

    vi.mocked(fs.readFileSync).mockReturnValue(Buffer.from('test-content'));
  });

  afterEach(() => {
    process.cwd = originalCwd;
    vi.clearAllMocks();
  });

  it('should prevent path traversal with ../', () => {
    const result = localFileToDataUri('../secret.txt');
    expect(result).toBeNull();
  });

  it('should prevent path traversal with leading /../', () => {
    const result = localFileToDataUri('/../secret.txt');
    expect(result).toBeNull();
  });

  it('should allow access to valid files in public directory', () => {
    const result = localFileToDataUri('valid.png');
    expect(result).toBe('data:image/png;base64,dGVzdC1jb250ZW50');

    const expectedPath = path.resolve(mockCwd, 'public', 'valid.png');
    expect(fs.existsSync).toHaveBeenCalledWith(expectedPath);
  });

  it('should return null for non-existent files', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false);
    const result = localFileToDataUri('missing.png');
    expect(result).toBeNull();
  });

  it('should handle different mime types', () => {
    const result = localFileToDataUri('valid.jpg');
    expect(result).toBe('data:image/jpeg;base64,dGVzdC1jb250ZW50');
  });
});
