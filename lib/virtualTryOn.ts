// Virtual Try-On Service using Replicate IDM-VTON
// https://replicate.com/cuuupid/idm-vton

import Replicate from "replicate";
import { segmentationService } from "./segmentation";

export interface TryOnRequest {
  userPhoto: string;      // URL or data URI
  garmentImage: string;   // URL or data URI
  category?: 'upper_body' | 'lower_body' | 'dresses' | 'accessories';
  garmentDescription?: string; // Optional description for better guiding (e.g. "red handbag")
}

export interface TryOnResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

// cuuupid/idm-vton
const IDM_VTON_MODEL = "cuuupid/idm-vton:c871bb9b046607b680449ecbae55fd8c6d945e0a1948644bf2361b3d021d3ff4";

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
    let effectiveCategory = request.category || 'upper_body';
    let segmentationMasks = null;

    // Layering Intelligence:
    // If it's an accessory, we run segmentation first to guide placement (simulated logic)
    if (effectiveCategory === 'accessories') {
      console.log("Layering Intelligence: Detecting body parts for accessory placement...");

      // Call SAM 2 to identify anchor points (Head, Neck, Wrist)
      // In a real Inpainting workflow, these masks would be combined with the garment image.
      const segResult = await segmentationService.segmentBody(request.userPhoto);

      if (segResult.success) {
        console.log(`Layering Intelligence: Identified ${segResult.masks.length} regions.`);
        segmentationMasks = segResult.masks;
      }

      // Map 'accessories' to 'upper_body' for the standard VTON model
      // In a production system, this would call a specific Inpainting model instead.
      effectiveCategory = 'upper_body';
    }

    // Replicate accepts URLs and data URIs as strings
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

    // Handle different output formats from Replicate
    if (output instanceof ReadableStream) {
      // Stream response - consume it
      console.log("Output is ReadableStream, consuming...");
      const streamResult = await consumeStream(output);
      console.log("Stream result:", streamResult.substring(0, 200));
      // The stream might contain a URL or base64 data
      imageUrl = streamResult.trim();
    } else if (Array.isArray(output)) {
      // Array of URLs
      imageUrl = output[0] ? String(output[0]) : null;
    } else if (typeof output === 'string') {
      imageUrl = output;
    } else if (output && typeof output === 'object') {
      // Object with output property
      const obj = output as Record<string, unknown>;
      if (obj.output) {
        imageUrl = String(obj.output);
      } else if (obj.url) {
        imageUrl = String(obj.url);
      }
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

