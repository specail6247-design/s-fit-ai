import { describe, it, expect, vi, afterEach, beforeAll, afterAll } from 'vitest';
import { localFileToDataUri } from '../../app/api/try-on/route';
import path from 'path';
import fs from 'fs';

describe('Security: Path Traversal Prevention', () => {
  const publicDir = path.join(process.cwd(), 'public');
  const testFileName = 'security_test_file.txt';
  const testFilePath = path.join(publicDir, testFileName);

  beforeAll(() => {
    // Create a dummy file in public directory
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    fs.writeFileSync(testFilePath, 'test content');
  });

  afterAll(() => {
    // Cleanup
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  });

  it('should allow access to valid files in public directory', () => {
    const result = localFileToDataUri(testFileName);
    expect(result).not.toBeNull();
    expect(result).toContain('data:');
  });

  it('should block path traversal with ../', () => {
    // Try to access package.json which is one level up from public
    const traversalPath = '../package.json';
    const result = localFileToDataUri(traversalPath);
    expect(result).toBeNull();
  });

  it('should block multiple ../ traversal', () => {
    const traversalPath = '../../etc/passwd';
    const result = localFileToDataUri(traversalPath);
    expect(result).toBeNull();
  });

  it('should block absolute paths that point outside', () => {
    // On Linux/Mac this points to root
    const absolutePath = '/etc/passwd';
    const result = localFileToDataUri(absolutePath);
    expect(result).toBeNull();
  });

  it('should block absolute paths with leading slashes that resolve outside', () => {
    const absolutePath = '//etc/passwd';
    const result = localFileToDataUri(absolutePath);
    expect(result).toBeNull();
  });

  it('should handle nested files in public correctly', () => {
      // Setup nested file
      const nestedDir = path.join(publicDir, 'nested');
      if (!fs.existsSync(nestedDir)) fs.mkdirSync(nestedDir);
      const nestedFile = path.join(nestedDir, 'test.txt');
      fs.writeFileSync(nestedFile, 'nested');

      const result = localFileToDataUri('nested/test.txt');
      expect(result).not.toBeNull();

      // Cleanup
      fs.unlinkSync(nestedFile);
      fs.rmdirSync(nestedDir);
  });
});
