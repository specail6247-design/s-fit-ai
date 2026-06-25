import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { generateVirtualTryOn, generateCinematicVideo } from '@/lib/virtualTryOn';

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
const mockRunwayImageToVideoCreate = vi.fn();
const mockRunwayTasksRetrieve = vi.fn();
vi.mock('@runwayml/sdk', () => {
  return {
    default: class {
      imageToVideo = {
        create: mockRunwayImageToVideoCreate
      };
      tasks = {
        retrieve: mockRunwayTasksRetrieve
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
    process.env.RUNWAYML_API_SECRET = 'mock-token';
  });

  afterEach(() => {
    delete process.env.RUNWAYML_API_SECRET;
  });

  it('should generate cinematic video successfully', async () => {
    mockRunwayImageToVideoCreate.mockResolvedValue({ id: 'task-123' });
    mockRunwayTasksRetrieve.mockResolvedValue({
      status: 'SUCCEEDED',
      output: ['https://runwayml.com/video.mp4']
    });

    const result = await generateCinematicVideo('https://replicate.com/image.jpg');

    expect(result.success).toBe(true);
    expect(result.videoUrl).toBe('https://runwayml.com/video.mp4');
    expect(mockRunwayImageToVideoCreate).toHaveBeenCalledWith(
        expect.objectContaining({
            model: 'gen4_turbo',
            promptImage: 'https://replicate.com/image.jpg',
            ratio: '1280:720'
        })
    );
    expect(mockRunwayTasksRetrieve).toHaveBeenCalledWith('task-123');
  });

  it('should handle API errors', async () => {
    mockRunwayImageToVideoCreate.mockRejectedValue(new Error('API Error'));

    const result = await generateCinematicVideo('https://replicate.com/image.jpg');

    expect(result.success).toBe(false);
    expect(result.error).toBe('API Error');
  });
});
