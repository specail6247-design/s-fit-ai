// Virtual Try-On Service using Replicate IDM-VTON
// https://replicate.com/cuuupid/idm-vton

import Replicate from "replicate";

export interface TryOnRequest {
  userPhoto: string | Buffer;      // URL or Buffer
  garmentImage: string | Buffer;   // URL or Buffer
  category?: 'upper_body' | 'lower_body' | 'dresses';
}

export interface TryOnResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

// cuuupid/idm-vton
const IDM_VTON_MODEL = "cuuupid/idm-vton:c871bb9b046607b680449ecbae55fd8c6d945e0a1948644bf2361b3d021d3ff4";

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
    // Replicate client automatically uploads Buffer/Blob inputs
    const output = await replicate.run(
      IDM_VTON_MODEL,
      {
        input: {
          human_img: request.userPhoto,
          garm_img: request.garmentImage,
          garment_des: 'A clothing item', // Prompt is required but often ignored or generic is fine for IDM-VTON
          is_checked: true,
          is_checked_crop: false,
          denoise_steps: 30,
          seed: 42,
          category: request.category || 'upper_body'
        }
      }
    );

    console.log("Replicate output:", output);

    // The output is typically an array of image URLs
    const imageUrl = Array.isArray(output) ? output[0] : output;

    if (imageUrl) {
      return {
        success: true,
        imageUrl: String(imageUrl)
      };
    } else {
      return {
        success: false,
        error: 'Failed to generate try-on image'
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
