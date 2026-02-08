import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as path from 'path';
import * as fs from 'fs';
import { localFileToDataUri } from '@/app/api/try-on/route';

// Mock fs to avoid real file system access
vi.mock('fs', async (importOriginal) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actual: any = await importOriginal();
  return {
    ...actual,
    existsSync: vi.fn(),
    readFileSync: vi.fn(),
  };
});

describe('localFileToDataUri Security', () => {
  // const publicDir = path.resolve(process.cwd(), 'public');

  beforeEach(() => {
    vi.clearAllMocks();
    // Default behavior: file exists and has content
    (vi.mocked(fs.existsSync)).mockReturnValue(true);
    (vi.mocked(fs.readFileSync)).mockReturnValue(Buffer.from('fake-image-data'));
  });

  it('should allow valid files within public directory', () => {
    const result = localFileToDataUri('test.png');
    expect(result).not.toBeNull();
    expect(result).toContain('base64');
    // We expect path.resolve to match what logic does
    expect(fs.existsSync).toHaveBeenCalledWith(expect.stringContaining(path.join('public', 'test.png')));
  });

  it('should allow valid files with leading slash', () => {
    const result = localFileToDataUri('/images/test.jpg');
    expect(result).not.toBeNull();
    expect(fs.existsSync).toHaveBeenCalledWith(expect.stringContaining(path.join('public', 'images', 'test.jpg')));
  });

  it('should block simple parent directory traversal', () => {
    const result = localFileToDataUri('../secret.txt');
    expect(result).toBeNull();
    // ensure it didn't try to read it
    expect(fs.readFileSync).not.toHaveBeenCalled();
  });

  it('should block complex traversal attempts', () => {
    const result = localFileToDataUri('images/../../secret.txt');
    expect(result).toBeNull();
    expect(fs.readFileSync).not.toHaveBeenCalled();
  });

  it('should block absolute path traversal attempts', () => {
    const result = localFileToDataUri('/../../etc/passwd');
    expect(result).toBeNull();
    expect(fs.readFileSync).not.toHaveBeenCalled();
  });

  it('should block traversal even if file exists on disk', () => {
    // Mock that the secret file exists
    (vi.mocked(fs.existsSync)).mockReturnValue(true);

    // Attempt to access package.json which is outside public
    const result = localFileToDataUri('../package.json');
    expect(result).toBeNull();
  });
});
