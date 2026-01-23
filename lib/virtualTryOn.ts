// Virtual Try-On Service using Replicate IDM-VTON
// https://replicate.com/cuuupid/idm-vton

import Replicate from "replicate";

export interface TryOnRequest {
  userPhoto: string;      // URL or data URI
  garmentImage: string;   // URL or data URI
  category?: 'upper_body' | 'lower_body' | 'dresses';
}

export interface TryOnResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

export interface CinematicVideoResult {
  success: boolean;
  videoUrl?: string;
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
    // Replicate accepts URLs and data URIs as strings
    const output = await replicate.run(
      IDM_VTON_MODEL,
      {
        input: {
          human_img: request.userPhoto,
          garm_img: request.garmentImage,
          garment_des: 'A clothing item',
          is_checked: true,
          is_checked_crop: false,
          denoise_steps: 30,
          seed: 42,
          category: request.category || 'upper_body'
        }
      }
    );

    console.log("Replicate raw output type:", typeof output, output);

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

// stability-ai/stable-video-diffusion
const SVD_MODEL = "stability-ai/stable-video-diffusion:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b";

export async function generateCinematicVideo(imageUrl: string): Promise<CinematicVideoResult> {
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
    const output = await replicate.run(
      SVD_MODEL,
      {
        input: {
          input_image: imageUrl,
          video_length: "25_frames_with_svd_xt",
          sizing_strategy: "maintain_aspect_ratio",
          motion_bucket_id: 127,
          frames_per_second: 6,
        }
      }
    );

    console.log("SVD output:", output);

    let videoUrl = "";
    if (typeof output === 'string') {
        videoUrl = output;
    } else if (Array.isArray(output) && output.length > 0) {
        videoUrl = String(output[0]);
    } else if (output && typeof output === 'object') {
         // @ts-expect-error - Handling unknown output structure
         videoUrl = output.output || output.url || "";
    }

    if (videoUrl) {
      return {
        success: true,
        videoUrl: videoUrl
      };
    } else {
      return {
        success: false,
        error: "No video URL in output"
      };
    }

  } catch (error) {
    console.error('Cinematic video generation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
