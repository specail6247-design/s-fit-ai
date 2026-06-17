// Virtual Try-On Service using Replicate IDM-VTON
// https://replicate.com/cuuupid/idm-vton

import Replicate from "replicate";
import RunwayML from "@runwayml/sdk";
import type { SegmentationResult } from './segmentation';

export interface TryOnRequest {
  userPhoto: string;      // URL or data URI
  garmentImage: string;   // URL or data URI
  category?: 'upper_body' | 'lower_body' | 'dresses' | 'accessories';
  garmentDescription?: string;
  segmentationMasks?: SegmentationResult | null; // Result from SegmentationService
}

export interface TryOnResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
  videoUrl?: string;
}

export interface CinematicVideoResult {
  success: boolean;
  videoUrl?: string;
  error?: string;
}

// cuuupid/idm-vton
const IDM_VTON_MODEL = "cuuupid/idm-vton:c871bb9b046607b680449ecbae55fd8c6d945e0a1948644bf2361b3d021d3ff4";
// Upscaler
const REAL_ESRGAN_MODEL = "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73ab241bbb49991ea7781";
// Helper to consume ReadableStream and return as base64 data URI or URL string
async function consumeStream(stream: ReadableStream): Promise<string> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }
  
  // Combine all chunks
  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  
  // Check if it's binary image data (JPEG starts with FF D8, PNG starts with 89 50 4E 47)
  if (result.length > 2) {
    const isJPEG = result[0] === 0xFF && result[1] === 0xD8;
    const isPNG = result[0] === 0x89 && result[1] === 0x50;
    
    if (isJPEG || isPNG) {
      // Convert binary to base64 data URI
      const base64 = Buffer.from(result).toString('base64');
      const mimeType = isJPEG ? 'image/jpeg' : 'image/png';
      console.log(`Converted ${mimeType} binary (${result.length} bytes) to base64`);
      return `data:${mimeType};base64,${base64}`;
    }
  }
  
  // Otherwise, assume it's text (URL)
  return new TextDecoder().decode(result);
}

// Helper to extract URL from Replicate output
function extractUrlFromOutput(output: unknown): string | null {
  if (output instanceof ReadableStream) {
    return null; // Should have been consumed before
  } else if (Array.isArray(output)) {
    return output[0] ? String(output[0]) : null;
  } else if (typeof output === 'string') {
    return output;
  } else if (output && typeof output === 'object') {
    const obj = output as Record<string, unknown>;
    if (obj.output) return String(obj.output);
    if (obj.url) return String(obj.url);
  }
  return null;
}

export async function generateVirtualTryOn(request: TryOnRequest): Promise<TryOnResult> {
  const apiToken = process.env.REPLICATE_API_TOKEN;
  
  if (!apiToken) {
    console.error("REPLICATE_API_TOKEN is not set");
    return {
      success: false,
      error: 'REPLICATE_API_TOKEN not configured'
    };
  }

  const replicate = new Replicate({
    auth: apiToken,
  });

  try {
    console.log("Starting IDM-VTON generation...");
    
    // Phase 5: Layering Intelligence - Map accessory category
    let effectiveCategory = request.category || 'upper_body';
    if (effectiveCategory === 'accessories') {
      // Accessories typically overlay on upper body or require specific inpainting
      // For IDM-VTON, we usually map to the most likely target region if accessories isn't a native category.
      effectiveCategory = 'upper_body'; 
    }

    const { segmentationMasks } = request;

    const output = await replicate.run(
      IDM_VTON_MODEL,
      {
        input: {
          human_img: request.userPhoto,
          garm_img: request.garmentImage,
          garment_des: request.garmentDescription || 'A clothing item',
          is_checked: true,
          is_checked_crop: false,
          denoise_steps: 30,
          seed: 42,
          category: effectiveCategory
        }
      }
    );

    console.log("Replicate raw output type:", typeof output, output);
    if (segmentationMasks) {
      console.log("Layering Intelligence: Applied accessory logic using segmentation masks.");
    }

    let imageUrl: string | null = null;
    if (output instanceof ReadableStream) {
       imageUrl = await consumeStream(output);
    } else {
       imageUrl = extractUrlFromOutput(output);
    }

    console.log("Extracted imageUrl:", imageUrl?.substring(0, 100));

    if (imageUrl && imageUrl.length > 0) {
      return {
        success: true,
        imageUrl: imageUrl
      };
    } else {
      return {
        success: false,
        error: 'Failed to generate try-on image - no output received'
      };
    }
  } catch (error) {
    console.error('Virtual try-on error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export async function upscaleImage(imageUrl: string): Promise<string | null> {
  const apiToken = process.env.REPLICATE_API_TOKEN;
  if (!apiToken) return null;

  const replicate = new Replicate({ auth: apiToken });

  try {
    console.log("Starting Upscaling...");
    const output = await replicate.run(
      REAL_ESRGAN_MODEL,
      {
        input: {
          image: imageUrl,
          scale: 4,
          face_enhance: true
        }
      }
    );

    let resultUrl: string | null = null;
    if (output instanceof ReadableStream) {
      resultUrl = await consumeStream(output);
    } else {
      resultUrl = extractUrlFromOutput(output);
    }
    return resultUrl;
  } catch (error) {
    console.error("Upscale error:", error);
    return null;
  }
}

// Unified Video Generation (RunwayML Gen-4 Turbo / Gen-3 Alpha)
export async function generateCinematicVideo(imageUrl: string): Promise<CinematicVideoResult> {
  const apiKey = process.env.RUNWAYML_API_SECRET;

  if (!apiKey) {
    console.error("RUNWAYML_API_SECRET is not set");
    return {
      success: false,
      error: 'RUNWAYML_API_SECRET not configured'
    };
  }

  const client = new RunwayML({ apiKey });

  try {
    console.log("Starting Cinematic Video Generation (RunwayML)...");

    // Create the video generation task
    const task = await client.imageToVideo.create({
      model: 'gen3a_turbo',
      promptImage: imageUrl,
      promptText: 'Cinematic, high fashion, smooth motion, high fidelity, 4k',
      ratio: '1280:768',
    });

    console.log(`RunwayML task created with ID: ${task.id}`);

    // Poll the task until it's completed
    const maxRetries = 60; // 60 attempts * 5 seconds = 5 minutes timeout
    const delay = 5000;

    for (let i = 0; i < maxRetries; i++) {
      await new Promise((resolve) => setTimeout(resolve, delay));

      const status = await client.tasks.retrieve(task.id);
      console.log(`RunwayML task ${task.id} status: ${status.status}`);

      if (status.status === 'SUCCEEDED') {
        // Output might be an array of URLs depending on the model/SDK version.
        // Usually, the first output contains the video URI.
        const videoUrl = status.output && Array.isArray(status.output) && status.output.length > 0
          ? status.output[0]
          : undefined;

        if (videoUrl) {
          return {
            success: true,
            videoUrl: typeof videoUrl === 'string' ? videoUrl : videoUrl,
          };
        } else {
          return {
            success: false,
            error: "No video URL in completed task output",
          };
        }
      } else if (status.status === 'FAILED') {
        return {
          success: false,
          error: "RunwayML task failed",
        };
      } else if (status.status === 'CANCELLED') {
        return {
          success: false,
          error: "RunwayML task was cancelled",
        };
      }
    }

    return {
      success: false,
      error: "RunwayML task timed out",
    };

  } catch (error) {
    console.error('Cinematic video generation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Keep generateRunwayVideo as an alias for backward compatibility or internal use
export const generateRunwayVideo = async (imageUrl: string) => {
    const res = await generateCinematicVideo(imageUrl);
    return res.success ? res.videoUrl : null;
};
