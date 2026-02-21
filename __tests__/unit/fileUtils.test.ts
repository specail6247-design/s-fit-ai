import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { localFileToDataUri } from '@/lib/fileUtils';

vi.mock('fs', async () => {
  const actual = await vi.importActual<typeof import('fs')>('fs');
  return {
    ...actual,
    existsSync: vi.fn(),
    readFileSync: vi.fn(),
  };
});

describe('localFileToDataUri Security', () => {
  // We use the real process.cwd() for path resolution logic to ensure it matches environment behavior,
  // but we can mock it if we want to test specific directory structures.
  // However, `path.resolve` uses `cwd`, so mocking `process.cwd` is effective.

  const mockCwd = '/app';

  beforeEach(() => {
    vi.spyOn(process, 'cwd').mockReturnValue(mockCwd);
    vi.mocked(fs.existsSync).mockReset();
    vi.mocked(fs.readFileSync).mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should allow access to valid image files in public directory', () => {
    const validPath = '/images/garment.png';
    const absolutePath = path.join(mockCwd, 'public', 'images', 'garment.png');

    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue(Buffer.from('fake-image-data'));

    const result = localFileToDataUri(validPath);

    expect(result).toBeDefined();
    expect(result).toContain('data:image/png;base64,');
    expect(fs.existsSync).toHaveBeenCalledWith(absolutePath);
  });

  it('should block path traversal attempts using ..', () => {
    const maliciousPath = '/../package.json';

    const result = localFileToDataUri(maliciousPath);

    expect(result).toBeNull();
    // Security check should prevent file access
    expect(fs.existsSync).not.toHaveBeenCalled();
  });

  it('should block path traversal attempts accessing files outside public', () => {
    const maliciousPath = '/images/../../secret.txt';

    const result = localFileToDataUri(maliciousPath);

    expect(result).toBeNull();
    expect(fs.existsSync).not.toHaveBeenCalled();
  });

  it('should block disallowed file extensions', () => {
    const invalidExtPath = '/images/script.js';
    // Even if file exists inside public
    vi.mocked(fs.existsSync).mockReturnValue(true);

    const result = localFileToDataUri(invalidExtPath);

    expect(result).toBeNull();
    // Should fail before reading
    expect(fs.readFileSync).not.toHaveBeenCalled();
  });

  it('should return null if file does not exist', () => {
    const missingPath = '/images/missing.png';
    vi.mocked(fs.existsSync).mockReturnValue(false);

    const result = localFileToDataUri(missingPath);

    expect(result).toBeNull();
  });
});
