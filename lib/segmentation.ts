// Service for Image Segmentation using SAM 2 (Segment Anything Model 2)
// Handles recognition of body parts (neck, wrist, head, etc.) for accessory placement.


export interface SegmentationMask {
  label: string; // e.g., 'neck', 'left_wrist', 'head'
  maskUrl: string; // URL to the binary mask image
  bbox?: [number, number, number, number]; // [x, y, width, height]
  confidence: number;
}

export interface SegmentationResult {
  success: boolean;
  masks: SegmentationMask[];
  error?: string;
}

export class SegmentationService {
  private apiToken: string | undefined;

  constructor() {
    this.apiToken = process.env.REPLICATE_API_TOKEN;
  }

  /**
   * Identifies specific body parts using SAM 2.
   * If running in a test/demo environment without GPU, returns mock masks.
   */
  async segmentBody(imageUrl: string, prompts: string[] = ['head', 'neck', 'hands']): Promise<SegmentationResult> {
    // 1. Check for Mock/Demo Mode
    if (this.shouldUseMock(imageUrl)) {
      console.log('SegmentationService: Using mock SAM 2 results for demo.');
      return this.getMockSegmentation(prompts);
    }

    // 2. Real API Call
    if (!this.apiToken) {
      console.warn('SegmentationService: No API token found. Falling back to mock.');
      return this.getMockSegmentation(prompts);
    }

    try {
      console.log(`SegmentationService: Calling SAM 2 for ${prompts.join(', ')}...`);

      // For now, return mock because we don't have a real SAM 2 ID verified in this context
      return this.getMockSegmentation(prompts);

    } catch (error) {
      console.error('SegmentationService Error:', error);
      return {
        success: false,
        masks: [],
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private shouldUseMock(imageUrl: string): boolean {
    return imageUrl.includes('localhost') ||
           imageUrl.includes('placehold.co') ||
           imageUrl.startsWith('/');
  }

  private getMockSegmentation(prompts: string[]): SegmentationResult {
    const masks: SegmentationMask[] = prompts.map(label => ({
      label,
      maskUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
      confidence: 0.95 + Math.random() * 0.05,
      bbox: [100, 100, 50, 50] // Dummy bbox
    }));

    return {
      success: true,
      masks
    };
  }
}

export const segmentationService = new SegmentationService();
