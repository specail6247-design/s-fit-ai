import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { generateVirtualTryOn, generateCinematicVideo, generateRunwayVideo } from '@/lib/virtualTryOn';

// Mock Replicate
const mockReplicateRun = vi.fn();
vi.mock('replicate', () => {
  return {
    default: class {
      run = mockReplicateRun;
    }
  };
});

// Mock RunwayML
const mockImageToVideoCreate = vi.fn();
const mockTasksRetrieve = vi.fn();

vi.mock('@runwayml/sdk', () => {
  return {
    default: class {
      imageToVideo = {
        create: mockImageToVideoCreate
      };
      tasks = {
        retrieve: mockTasksRetrieve
      };
    }
  };
});

describe('Virtual Try-On Service', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    process.env.REPLICATE_API_TOKEN = 'mock-token';
  });

  afterEach(() => {
    delete process.env.REPLICATE_API_TOKEN;
  });

  it('should return error if REPLICATE_API_TOKEN is missing', async () => {
    delete process.env.REPLICATE_API_TOKEN;
    const result = await generateVirtualTryOn({
      userPhoto: 'user.jpg',
      garmentImage: 'garment.jpg'
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain('REPLICATE_API_TOKEN');
  });

  it('should generate try-on image successfully', async () => {
    mockReplicateRun.mockResolvedValue(['https://replicate.com/output.jpg']);

    const result = await generateVirtualTryOn({
      userPhoto: 'user.jpg',
      garmentImage: 'garment.jpg',
      category: 'upper_body'
    });

    expect(result.success).toBe(true);
    expect(result.imageUrl).toBe('https://replicate.com/output.jpg');
    expect(mockReplicateRun).toHaveBeenCalled();
  });

  it('should handle API errors', async () => {
    mockReplicateRun.mockRejectedValue(new Error('API Error'));

    const result = await generateVirtualTryOn({
      userPhoto: 'user.jpg',
      garmentImage: 'garment.jpg'
    });

    expect(result.success).toBe(false);
    expect(result.error).toBe('API Error');
  });

  it('should handle empty output', async () => {
    mockReplicateRun.mockResolvedValue([]); // Or null/undefined

    const result = await generateVirtualTryOn({
      userPhoto: 'user.jpg',
      garmentImage: 'garment.jpg'
    });

    expect(result.success).toBe(false);
  });
});

describe('Cinematic Video Generation', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    process.env.REPLICATE_API_TOKEN = 'mock-token';
  });

  afterEach(() => {
    delete process.env.REPLICATE_API_TOKEN;
  });

  it('should generate cinematic video successfully', async () => {
    mockReplicateRun.mockResolvedValue('https://replicate.com/video.mp4');

    const result = await generateCinematicVideo('https://replicate.com/image.jpg');

    expect(result.success).toBe(true);
    expect(result.videoUrl).toBe('https://replicate.com/video.mp4');
    expect(mockReplicateRun).toHaveBeenCalledWith(
        expect.stringContaining('stable-video-diffusion'),
        expect.objectContaining({
            input: expect.objectContaining({
                input_image: 'https://replicate.com/image.jpg'
            })
        })
    );
  });

  it('should handle API errors', async () => {
    mockReplicateRun.mockRejectedValue(new Error('API Error'));

    const result = await generateCinematicVideo('https://replicate.com/image.jpg');

    expect(result.success).toBe(false);
    expect(result.error).toBe('API Error');
  });
});

describe('Runway Video Generation', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    process.env.RUNWAYML_API_SECRET = 'mock-runway-token';
    vi.useFakeTimers();
  });

  afterEach(() => {
    delete process.env.RUNWAYML_API_SECRET;
    vi.useRealTimers();
  });

  it('should return null if RUNWAYML_API_SECRET is missing', async () => {
    delete process.env.RUNWAYML_API_SECRET;
    const result = await generateRunwayVideo('https://example.com/image.jpg');
    expect(result).toBeNull();
  });

  it('should generate runway video successfully with polling', async () => {
    mockImageToVideoCreate.mockResolvedValue({ id: 'task-123' });

    // First call: PENDING, Second call: PENDING, Third call: SUCCEEDED
    mockTasksRetrieve
      .mockResolvedValueOnce({ id: 'task-123', status: 'PENDING' })
      .mockResolvedValueOnce({ id: 'task-123', status: 'PENDING' })
      .mockResolvedValueOnce({ id: 'task-123', status: 'SUCCEEDED', output: ['https://runwayml.com/video.mp4'] });

    const promise = generateRunwayVideo('https://example.com/image.jpg');

    // Advance timers by 5s for the first poll
    await vi.advanceTimersByTimeAsync(5000);
    // Advance timers by 5s for the second poll
    await vi.advanceTimersByTimeAsync(5000);
    // Advance timers by 5s for the third poll
    await vi.advanceTimersByTimeAsync(5000);

    const result = await promise;

    expect(result).toBe('https://runwayml.com/video.mp4');
    expect(mockImageToVideoCreate).toHaveBeenCalledWith({
      model: 'gen4_turbo',
      ratio: '1280:720',
      promptImage: 'https://example.com/image.jpg'
    });
    expect(mockTasksRetrieve).toHaveBeenCalledTimes(3);
    expect(mockTasksRetrieve).toHaveBeenCalledWith('task-123');
  });

  it('should return null if task fails', async () => {
    mockImageToVideoCreate.mockResolvedValue({ id: 'task-123' });
    mockTasksRetrieve.mockResolvedValue({ id: 'task-123', status: 'FAILED' });

    const promise = generateRunwayVideo('https://example.com/image.jpg');

    await vi.advanceTimersByTimeAsync(5000);

    const result = await promise;

    expect(result).toBeNull();
  });

  it('should return null if it times out after max attempts', async () => {
    mockImageToVideoCreate.mockResolvedValue({ id: 'task-123' });
    mockTasksRetrieve.mockResolvedValue({ id: 'task-123', status: 'PENDING' });

    const promise = generateRunwayVideo('https://example.com/image.jpg');

    // Advance 60 attempts * 5000ms = 300,000ms
    for(let i=0; i<60; i++) {
        await vi.advanceTimersByTimeAsync(5000);
    }

    const result = await promise;

    expect(result).toBeNull();
    expect(mockTasksRetrieve).toHaveBeenCalledTimes(60);
  });

  it('should return null on SDK error', async () => {
    mockImageToVideoCreate.mockRejectedValue(new Error('SDK Error'));

    const result = await generateRunwayVideo('https://example.com/image.jpg');

    expect(result).toBeNull();
  });
});
