import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { localFileToDataUri } from '@/lib/fileUtils';

// Mock fs module
vi.mock('fs', () => ({
  existsSync: vi.fn(),
  readFileSync: vi.fn(),
}));

describe('localFileToDataUri', () => {
  const mockCwd = '/app';
  const mockPublicDir = path.join(mockCwd, 'public');

  beforeEach(() => {
    vi.spyOn(process, 'cwd').mockReturnValue(mockCwd);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return data URI for valid file in public directory', () => {
    const validPath = 'images/test.png';
    const absolutePath = path.resolve(mockPublicDir, validPath);

    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue(Buffer.from('fake-image-data'));

    const result = localFileToDataUri(validPath);

    expect(result).toBe('data:image/png;base64,ZmFrZS1pbWFnZS1kYXRh');
    expect(fs.existsSync).toHaveBeenCalledWith(absolutePath);
    expect(fs.readFileSync).toHaveBeenCalledWith(absolutePath);
  });

  it('should return null for non-existent file', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false);

    const result = localFileToDataUri('images/missing.png');

    expect(result).toBeNull();
  });

  it('should prevent path traversal outside public directory (../)', () => {
    const maliciousPath = '../secret.txt';
    // This resolves to /app/secret.txt which is outside /app/public

    const result = localFileToDataUri(maliciousPath);

    expect(result).toBeNull();
    // fs.readFileSync should NOT be called
    expect(fs.readFileSync).not.toHaveBeenCalled();
  });

  it('should prevent complex path traversal (images/../../secret.txt)', () => {
    const maliciousPath = 'images/../../secret.txt';

    const result = localFileToDataUri(maliciousPath);

    expect(result).toBeNull();
    expect(fs.readFileSync).not.toHaveBeenCalled();
  });

  it('should allow valid nested paths', () => {
    const validNested = 'images/subdir/test.jpg';
    const absolutePath = path.resolve(mockPublicDir, validNested);

    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue(Buffer.from('jpg-data'));

    const result = localFileToDataUri(validNested);

    expect(result).toBe('data:image/jpeg;base64,anBnLWRhdGE=');
    expect(fs.existsSync).toHaveBeenCalledWith(absolutePath);
  });

  it('should handle paths with leading slash', () => {
    const validPath = '/images/test.png';
    const absolutePath = path.resolve(mockPublicDir, 'images/test.png');

    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue(Buffer.from('data'));

    const result = localFileToDataUri(validPath);

    expect(result).toBe('data:image/png;base64,ZGF0YQ=='); // "data" base64 encoded
    expect(fs.existsSync).toHaveBeenCalledWith(absolutePath);
  });
});
