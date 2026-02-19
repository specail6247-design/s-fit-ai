import { describe, it, expect, vi, beforeEach } from 'vitest';
import { localFileToDataUri } from '../../../lib/fileUtils';
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

describe('localFileToDataUri Security Tests', () => {
  const mockPublicDir = path.resolve(process.cwd(), 'public');

  beforeEach(() => {
    vi.resetAllMocks();

    // Default mocks
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue(Buffer.from('fake-image-data'));
  });

  it('should return data URI for valid image file in public directory', () => {
    const validPath = 'image.png';
    const result = localFileToDataUri(validPath);

    expect(result).toBe('data:image/png;base64,ZmFrZS1pbWFnZS1kYXRh');
    // Verify path resolution matches expected
    const expectedPath = path.resolve(mockPublicDir, 'image.png');
    expect(fs.existsSync).toHaveBeenCalledWith(expectedPath);
  });

  it('should handle paths with leading slash correctly', () => {
    const validPath = '/subfolder/image.jpg';
    const result = localFileToDataUri(validPath);

    expect(result).toBe('data:image/jpeg;base64,ZmFrZS1pbWFnZS1kYXRh');
    const expectedPath = path.resolve(mockPublicDir, 'subfolder/image.jpg');
    expect(fs.existsSync).toHaveBeenCalledWith(expectedPath);
  });

  it('should BLOCK path traversal attempts using ../', () => {
    const maliciousPath = '../secret.env';
    const result = localFileToDataUri(maliciousPath);

    expect(result).toBeNull();
    // Verify file system was NOT accessed for reading
    expect(fs.readFileSync).not.toHaveBeenCalled();
  });

  it('should BLOCK path traversal attempts trying to escape public directory', () => {
    // Assuming we are in /app, public is /app/public
    // Input: /../../etc/passwd -> resolves to /etc/passwd
    const maliciousPath = '/../../etc/passwd';
    const result = localFileToDataUri(maliciousPath);

    expect(result).toBeNull();
    expect(fs.readFileSync).not.toHaveBeenCalled();
  });

  it('should REJECT unsupported file extensions', () => {
    const invalidExtPath = 'script.js';
    const result = localFileToDataUri(invalidExtPath);

    expect(result).toBeNull();
    expect(fs.readFileSync).not.toHaveBeenCalled();
  });

  it('should REJECT files without extension', () => {
    const noExtPath = 'readme';
    const result = localFileToDataUri(noExtPath);

    expect(result).toBeNull();
    expect(fs.readFileSync).not.toHaveBeenCalled();
  });

  it('should return null if file does not exist', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false);
    const result = localFileToDataUri('missing.png');

    expect(result).toBeNull();
  });
});
