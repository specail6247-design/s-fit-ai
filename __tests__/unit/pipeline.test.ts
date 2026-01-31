import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { generateRunwayVideo } from '@/lib/runway';
import * as virtualTryOn from '@/lib/virtualTryOn';

// Mock the SVD fallback
vi.mock('@/lib/virtualTryOn', () => ({
  generateCinematicVideo: vi.fn().mockResolvedValue({ success: true, videoUrl: 'svd_video_url' })
}));

describe('Multi-Model Orchestration (Runway/SVD)', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should fallback to SVD if RUNWAY_API_TOKEN is missing', async () => {
    delete process.env.RUNWAY_API_TOKEN;

    const result = await generateRunwayVideo('test_image.png');

    expect(virtualTryOn.generateCinematicVideo).toHaveBeenCalledWith('test_image.png');
    expect(result.success).toBe(true);
    expect(result.videoUrl).toBe('svd_video_url');
  });

  it('should attempt Runway if RUNWAY_API_TOKEN is present', async () => {
    process.env.RUNWAY_API_TOKEN = 'fake_token';

    // Mock global fetch
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ url: 'runway_video_url' })
    });
    global.fetch = mockFetch;

    const result = await generateRunwayVideo('test_image.png');

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('api.runwayml.com'),
      expect.objectContaining({
        headers: expect.objectContaining({
            'Authorization': 'Bearer fake_token'
        })
      })
    );
    expect(result.success).toBe(true);
    expect(result.videoUrl).toBe('runway_video_url');
    // SVD should NOT be called if Runway succeeds
    expect(virtualTryOn.generateCinematicVideo).not.toHaveBeenCalled();
  });

  it('should fallback to SVD if Runway API fails', async () => {
    process.env.RUNWAY_API_TOKEN = 'fake_token';

    // Mock global fetch failure
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error'
    });

    const result = await generateRunwayVideo('test_image.png');

    // Runway failed, so SVD SHOULD be called
    expect(virtualTryOn.generateCinematicVideo).toHaveBeenCalledWith('test_image.png');
    expect(result.success).toBe(true); // Because SVD succeeded
    expect(result.videoUrl).toBe('svd_video_url');
  });
});
