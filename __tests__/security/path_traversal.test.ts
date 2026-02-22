// @vitest-environment node
import { describe, it, expect, vi, beforeAll, afterAll, beforeEach } from 'vitest';
import { localFileToDataUri } from '../../app/api/try-on/route';
import * as fs from 'fs';
import * as path from 'path';

// Mock fs to avoid actual file system calls and control behavior
vi.mock('fs', async (importOriginal) => {
  const actual = await importOriginal<typeof import('fs')>();
  return {
    ...actual,
    existsSync: vi.fn(),
    readFileSync: vi.fn(),
  };
});

describe('localFileToDataUri Security Tests', () => {
  const publicDir = path.join(process.cwd(), 'public');

  beforeAll(() => {
    vi.mocked(fs.readFileSync).mockReturnValue(Buffer.from('fake-image-data'));
  });

  beforeEach(() => {
    vi.mocked(fs.existsSync).mockReset();
    vi.mocked(fs.existsSync).mockReturnValue(true); // Assume file exists if checked
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should ALLOW valid paths inside public directory', () => {
    const validPath = '/images/test.png';
    const result = localFileToDataUri(validPath);

    // Check that fs.existsSync was called with the correct absolute path
    const expectedPath = path.join(publicDir, 'images', 'test.png');
    expect(fs.existsSync).toHaveBeenCalledWith(expectedPath);
    expect(result).toBeTruthy();
  });

  it('should BLOCK directory traversal attacks', () => {
    const attackPath = '/../../package.json';
    const result = localFileToDataUri(attackPath);

    // Should return null (blocked)
    expect(result).toBeNull();

    // Should NOT attempt to access the file outside public
    const sensitivePath = path.join(process.cwd(), 'package.json');
    expect(fs.existsSync).not.toHaveBeenCalledWith(sensitivePath);
  });

  it('should BLOCK sneaky directory traversal (edge case)', () => {
      // If public is /app/public, this tries /app/public-secret
      const edgeCasePath = '/../public-secret';
      const result = localFileToDataUri(edgeCasePath);

      expect(result).toBeNull();

      const sensitivePath = path.join(process.cwd(), 'public-secret');
      expect(fs.existsSync).not.toHaveBeenCalledWith(sensitivePath);
  });
});
