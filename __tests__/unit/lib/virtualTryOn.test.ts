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
const mockRunwayCreate = vi.fn();
const mockRunwayRetrieve = vi.fn();
vi.mock('@runwayml/sdk', () => {
  return {
    default: class {
      imageToVideo = {
        create: mockRunwayCreate
      };
      tasks = {
        retrieve: mockRunwayRetrieve
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
    process.env.RUNWAYML_API_SECRET = 'mock-runway-token';
  });

  afterEach(() => {
    delete process.env.RUNWAYML_API_SECRET;
  });

  it('should return error if RUNWAYML_API_SECRET is missing', async () => {
    delete process.env.RUNWAYML_API_SECRET;
    const result = await generateCinematicVideo('https://runwayml.com/image.jpg');

    expect(result.success).toBe(false);
    expect(result.error).toContain('RUNWAYML_API_SECRET');
  });

  it('should generate cinematic video successfully', async () => {
    mockRunwayCreate.mockResolvedValue({ id: 'mock-task-id' });
    mockRunwayRetrieve.mockResolvedValue({ status: 'SUCCEEDED', output: ['https://runwayml.com/video.mp4'] });

    const result = await generateCinematicVideo('https://runwayml.com/image.jpg');

    expect(result.success).toBe(true);
    expect(result.videoUrl).toBe('https://runwayml.com/video.mp4');
    expect(mockRunwayCreate).toHaveBeenCalledWith(
        expect.objectContaining({
            promptImage: 'https://runwayml.com/image.jpg',
            model: 'gen3a_turbo'
        })
    );
    expect(mockRunwayRetrieve).toHaveBeenCalledWith('mock-task-id');
  });

  it('should handle API errors during create', async () => {
    mockRunwayCreate.mockRejectedValue(new Error('API Error'));

    const result = await generateCinematicVideo('https://runwayml.com/image.jpg');

    expect(result.success).toBe(false);
    expect(result.error).toBe('API Error');
  });

  it('should handle task failures during polling', async () => {
    mockRunwayCreate.mockResolvedValue({ id: 'mock-task-id' });
    mockRunwayRetrieve.mockResolvedValue({ status: 'FAILED' });

    const result = await generateCinematicVideo('https://runwayml.com/image.jpg');

    expect(result.success).toBe(false);
    expect(result.error).toBe('Runway task failed');
  });
});
