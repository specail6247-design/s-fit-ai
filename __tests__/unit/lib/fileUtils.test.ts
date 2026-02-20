import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { localFileToDataUri } from '@/lib/fileUtils';
import * as fs from 'fs';
import * as path from 'path';

// Mock fs module
vi.mock('fs', async (importOriginal) => {
  const actual = await importOriginal<typeof import('fs')>();
  return {
    ...actual,
    existsSync: vi.fn(),
    readFileSync: vi.fn(),
  };
});

describe('localFileToDataUri', () => {
  const mockCwd = '/app';
  const publicDir = path.join(mockCwd, 'public');

  beforeEach(() => {
    vi.spyOn(process, 'cwd').mockReturnValue(mockCwd);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return data URI for valid file in public directory', () => {
    const validPath = '/images/test.jpg';
    const absolutePath = path.join(publicDir, 'images/test.jpg');

    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue(Buffer.from('test-image-content'));

    const result = localFileToDataUri(validPath);

    expect(fs.existsSync).toHaveBeenCalledWith(absolutePath);
    expect(fs.readFileSync).toHaveBeenCalledWith(absolutePath);
    expect(result).toBe('data:image/jpeg;base64,dGVzdC1pbWFnZS1jb250ZW50'); // base64 of 'test-image-content'
  });

  it('should return null for path traversal attempt', () => {
    const exploitPath = '/../../etc/passwd';
    // resolved path would be /app/etc/passwd which is outside /app/public

    const result = localFileToDataUri(exploitPath);

    expect(result).toBeNull();
    expect(fs.existsSync).not.toHaveBeenCalled(); // Should fail before checking FS
  });

  it('should return null for file with invalid extension', () => {
    const invalidExtPath = '/images/script.js';
    const absolutePath = path.join(publicDir, 'images/script.js');

    // Even if it exists (path resolution checks first, then extension check)
    // Actually my code checks startWith -> exist -> extension.
    // So if it exists, it proceeds to check extension.

    // We need to mock existsSync to true for it to reach extension check
    // Wait, let's verify logic in fileUtils.ts:
    // 1. Resolve
    // 2. Traversal Check
    // 3. Exists Check
    // 4. Extension Check

    // So to test extension check, we need to pass steps 2 and 3.
    vi.mocked(fs.existsSync).mockReturnValue(true);

    const result = localFileToDataUri(invalidExtPath);

    expect(result).toBeNull();
    // It should have called existsSync
    expect(fs.existsSync).toHaveBeenCalledWith(absolutePath);
  });

  it('should return null if file does not exist', () => {
    const missingPath = '/images/missing.jpg';
    vi.mocked(fs.existsSync).mockReturnValue(false);

    const result = localFileToDataUri(missingPath);

    expect(result).toBeNull();
  });
});
