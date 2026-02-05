import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { generateRunwayVideo } from '@/lib/runway';

describe('Runway API Integration', () => {
  const originalFetch = global.fetch;
  const mockFetch = vi.fn();

  beforeEach(() => {
    global.fetch = mockFetch;
    process.env.RUNWAY_API_SECRET = 'test_key';
    vi.useFakeTimers();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    delete process.env.RUNWAY_API_SECRET;
    vi.useRealTimers();
    vi.resetAllMocks();
  });

  it('should successfully generate a video', async () => {
    // 1. Mock Start Response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 'task_123' }),
    });

    // 2. Mock Poll Response 1 (PENDING)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 'task_123', status: 'PENDING' }),
    });

    // 3. Mock Poll Response 2 (SUCCEEDED)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 'task_123',
        status: 'SUCCEEDED',
        output: ['https://runway.com/video.mp4']
      }),
    });

    const promise = generateRunwayVideo('test_image.png');

    // Fast-forward timers to trigger polling
    await vi.advanceTimersByTimeAsync(2000); // Poll 1
    await vi.advanceTimersByTimeAsync(2000); // Poll 2

    const result = await promise;

    expect(result.success).toBe(true);
    expect(result.videoUrl).toBe('https://runway.com/video.mp4');
    expect(mockFetch).toHaveBeenCalledTimes(3);
  });

  it('should return error if API key is missing', async () => {
    delete process.env.RUNWAY_API_SECRET;
    const result = await generateRunwayVideo('test.png');
    expect(result.success).toBe(false);
    expect(result.error).toContain('RUNWAY_API_SECRET missing');
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('should handle start failure', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      text: async () => 'Unauthorized',
    });

    const result = await generateRunwayVideo('test.png');
    expect(result.success).toBe(false);
    expect(result.error).toContain('Runway Start Failed');
  });

  it('should handle generation failure', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 'task_fail' }),
    });

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 'task_fail', status: 'FAILED', failure: 'Content filter' }),
    });

    const promise = generateRunwayVideo('test.png');
    await vi.advanceTimersByTimeAsync(2000);
    const result = await promise;

    expect(result.success).toBe(false);
    expect(result.error).toBe('Content filter');
  });
});
