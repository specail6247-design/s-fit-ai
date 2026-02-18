import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { localFileToDataUri } from '@/lib/fileUtils';

// Mock path context
const mockRoot = process.platform === 'win32' ? 'C:\\mock-app' : '/mock-app';

// Properly mock fs module supporting both named and default imports
vi.mock('fs', async (importOriginal) => {
  const actual = await importOriginal<typeof import('fs')>();
  const mocks = {
    existsSync: vi.fn(),
    readFileSync: vi.fn(),
  };
  return {
    ...actual,
    ...mocks,
    default: {
      ...actual, // fs usually doesn't have a default export in Node, but for mocking safety
      ...mocks,
    },
  };
});

describe('localFileToDataUri Security Check', () => {
  beforeEach(() => {
    vi.resetAllMocks();

    // Spy on process.cwd to return a controlled path
    vi.spyOn(process, 'cwd').mockReturnValue(mockRoot);

    // Default mock implementation
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue(Buffer.from('mock-content'));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should allow access to files inside public directory', () => {
    const validPath = '/images/test.jpg';
    const result = localFileToDataUri(validPath);

    const expectedPath = path.resolve(mockRoot, 'public', 'images', 'test.jpg');

    expect(fs.existsSync).toHaveBeenCalledWith(expectedPath);
    expect(result).toContain('data:image/jpeg;base64,');
  });

  it('should block path traversal attempting to access parent directories', () => {
    const maliciousPath = '/../../etc/passwd';
    const result = localFileToDataUri(maliciousPath);

    expect(result).toBeNull();
    // Verify file read was NOT attempted
    expect(fs.readFileSync).not.toHaveBeenCalled();
  });

  it('should block path traversal via .. inside the path', () => {
    const maliciousPath = '/images/../../secret.txt';
    const result = localFileToDataUri(maliciousPath);

    expect(result).toBeNull();
    expect(fs.readFileSync).not.toHaveBeenCalled();
  });

  it('should return null if file does not exist', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false);

    const result = localFileToDataUri('/images/missing.jpg');
    expect(result).toBeNull();
  });
});
