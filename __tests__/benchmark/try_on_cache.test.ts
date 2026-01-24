import { vi, describe, it, expect, beforeEach } from 'vitest';
import { POST } from '@/app/api/try-on/route';
import { NextRequest } from 'next/server';

// Mock the generateVirtualTryOn function
vi.mock('@/lib/virtualTryOn', () => ({
  generateVirtualTryOn: vi.fn().mockImplementation(async () => {
    // Simulate expensive operation
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, imageUrl: 'https://example.com/result.jpg' };
  }),
}));

// We need to mock fs and path for localFileToDataUri to work or just avoid using local paths in test
// The POST handler uses fs.existsSync etc.
vi.mock('fs', async () => {
    return {
        ...await vi.importActual<typeof import('fs')>('fs'),
        existsSync: vi.fn().mockReturnValue(true),
        readFileSync: vi.fn().mockReturnValue(Buffer.from('fake-image-data')),
    }
});

describe('Try-On API Performance', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should use cache for repeated calls', async () => {
    const body = {
      userPhotoUrl: 'https://example.com/user.jpg',
      garmentImageUrl: 'https://example.com/garment.jpg',
      category: 'upper_body',
    };

    const req1 = new NextRequest('http://localhost/api/try-on', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    const start1 = performance.now();
    const res1 = await POST(req1);
    const end1 = performance.now();

    expect(res1.status).toBe(200);
    const time1 = end1 - start1;
    console.log(`First call time: ${time1.toFixed(2)}ms`);

    const req2 = new NextRequest('http://localhost/api/try-on', {
        method: 'POST',
        body: JSON.stringify(body),
      });

    const start2 = performance.now();
    const res2 = await POST(req2);
    const end2 = performance.now();

    expect(res2.status).toBe(200);
    const time2 = end2 - start2;
    console.log(`Second call time: ${time2.toFixed(2)}ms`);

    // With cache, the second call should be much faster
    expect(time1).toBeGreaterThan(450);
    expect(time2).toBeLessThan(100); // Should be very fast (in-memory cache)

    const json2 = await res2.json();
    expect(json2.cached).toBe(true);
    expect(json2.imageUrl).toBe('https://example.com/result.jpg');
  });
});
