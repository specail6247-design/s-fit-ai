import { describe, it, expect, vi, beforeEach } from 'vitest';
import { analyzeFace, analyzePose } from '@/lib/mediapipe';

const mocks = vi.hoisted(() => {
  return {
    mockDetect: vi.fn(),
    mockFaceDetectorCreate: vi.fn(),
    mockPoseLandmarkerCreate: vi.fn(),
  }
});

vi.mock('@mediapipe/tasks-vision', () => {
  return {
    FilesetResolver: {
      forVisionTasks: vi.fn().mockResolvedValue('mock-vision-fileset'),
    },
    FaceDetector: {
      createFromOptions: mocks.mockFaceDetectorCreate,
    },
    PoseLandmarker: {
      createFromOptions: mocks.mockPoseLandmarkerCreate,
    },
  };
});

describe('MediaPipe Service', () => {
  beforeEach(() => {
    vi.resetAllMocks();

    // Default mocks
    mocks.mockFaceDetectorCreate.mockResolvedValue({
      detect: mocks.mockDetect,
    });
    mocks.mockPoseLandmarkerCreate.mockResolvedValue({
      detect: mocks.mockDetect,
    });

    // Mock Image loading
    class MockImage {
      onload: () => void = () => {};
      onerror: () => void = () => {};
      width: number = 100;
      height: number = 100;
      src: string = '';

      constructor() {
        setTimeout(() => this.onload(), 10);
      }
    }

    global.Image = MockImage as unknown as typeof Image;
  });

  describe('analyzeFace', () => {
    it('should return analysis for valid detection', async () => {
      mocks.mockDetect.mockReturnValue({
        detections: [{
          boundingBox: { width: 50, height: 50 },
          categories: [{ score: 0.9 }],
        }],
      });

      const result = await analyzeFace('mock-url');

      expect(result.faceCount).toBe(1);
      expect(result.confidence).toBe(0.9);
      expect(result.score).toBeGreaterThan(0);
    });

    it('should handle no face detected', async () => {
        mocks.mockDetect.mockReturnValue({
          detections: [],
        });

        const result = await analyzeFace('mock-url');

        expect(result.faceCount).toBe(0);
        expect(result.note).toContain('No face detected');
    });
  });

  describe('analyzePose', () => {
    it('should analyze pose with landmarks', async () => {
      // Mock 33 landmarks
      const mockLandmarks = Array(33).fill({ x: 0.5, y: 0.5, z: 0, visibility: 0.9 });

      mocks.mockDetect.mockReturnValue({
        landmarks: [mockLandmarks],
      });

      const result = await analyzePose('mock-url');

      expect(result.landmarkCount).toBe(33);
      expect(result.score).toBeGreaterThan(0);
      expect(result.proportions).not.toBeNull();
    });

    it('should handle missing pose', async () => {
        mocks.mockDetect.mockReturnValue({
            landmarks: [],
        });

        const result = await analyzePose('mock-url');

        expect(result.landmarkCount).toBe(0);
        expect(result.proportions).toBeNull();
    });
  });
});
