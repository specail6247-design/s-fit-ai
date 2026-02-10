import { POST } from '@/app/api/try-on/route';
import { NextRequest } from 'next/server';
import { vi, describe, it, expect } from 'vitest';
import * as fs from 'fs';

// Mock dependencies
vi.mock('fs');
vi.mock('@/lib/virtualTryOn', () => ({
  generateVirtualTryOn: vi.fn().mockResolvedValue({ success: true, imageUrl: 'http://example.com/result.png' }),
}));

// Mock process.cwd to return a fixed path for consistent testing
const MOCK_CWD = '/app';
vi.spyOn(process, 'cwd').mockReturnValue(MOCK_CWD);

describe('API /api/try-on Path Traversal Security', () => {
  it('should block path traversal attempts in garmentImageUrl', async () => {
    // Setup malicious request
    const maliciousPath = '../package.json';
    const req = new NextRequest('http://localhost/api/try-on', {
      method: 'POST',
      body: JSON.stringify({
        userPhotoUrl: 'http://example.com/user.png',
        garmentImageUrl: maliciousPath,
      }),
    });

    // Mock fs.existsSync to simulate that the traversed file exists (if accessed)
    // The security check should prevent access before this is called for reading
    vi.mocked(fs.existsSync).mockReturnValue(true);

    const res = await POST(req);
    const json = await res.json();

    // Expect 400 Bad Request because localFileToDataUri returns null upon detecting traversal
    expect(res.status).toBe(400);
    expect(json.error).toMatch(/Failed to read local image/);
  });

  it('should allow legitimate files in public directory', async () => {
    // Setup legitimate request
    const legitimatePath = '/test.png';
    const req = new NextRequest('http://localhost/api/try-on', {
      method: 'POST',
      body: JSON.stringify({
        userPhotoUrl: 'http://example.com/user.png',
        garmentImageUrl: legitimatePath,
      }),
    });

    // Mock file existence and content
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue(Buffer.from('fake-image-data'));

    const res = await POST(req);
    const json = await res.json();

    // Expect success (200 OK) because generateVirtualTryOn is mocked to succeed
    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
  });
});
