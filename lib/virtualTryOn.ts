// Virtual Try-On Service using Replicate IDM-VTON
// https://replicate.com/cuuupid/idm-vton

export interface TryOnRequest {
  userPhotoUrl: string;      // 사용자 전신 사진 URL
  garmentImageUrl: string;   // 옷 이미지 URL (배경 제거된)
  category?: 'upper_body' | 'lower_body' | 'dresses';
}

export interface TryOnResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

const REPLICATE_API_URL = 'https://api.replicate.com/v1/predictions';
const IDM_VTON_VERSION = 'c871bb9b046607b680449ecbae55fd8c6d945e0a1948644bf2361b3d021d3ff4';

export async function generateVirtualTryOn(request: TryOnRequest): Promise<TryOnResult> {
  const apiToken = process.env.REPLICATE_API_TOKEN;
  
  if (!apiToken) {
    return {
      success: false,
      error: 'REPLICATE_API_TOKEN not configured'
    };
  }

  try {
    // Step 1: Create prediction
    const response = await fetch(REPLICATE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: IDM_VTON_VERSION,
        input: {
          human_img: request.userPhotoUrl,
          garm_img: request.garmentImageUrl,
          garment_des: 'A clothing item',
          is_checked: true,
          is_checked_crop: false,
          denoise_steps: 30,
          seed: 42,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: `API Error: ${errorData.detail || response.statusText}`
      };
    }

    const prediction = await response.json();
    
    // Step 2: Poll for completion
    const resultUrl = await pollForResult(prediction.id, apiToken);
    
    if (resultUrl) {
      return {
        success: true,
        imageUrl: resultUrl
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

async function pollForResult(predictionId: string, apiToken: string): Promise<string | null> {
  const maxAttempts = 60; // 최대 60초 대기
  const pollInterval = 1000; // 1초마다 체크

  for (let i = 0; i < maxAttempts; i++) {
    const response = await fetch(`${REPLICATE_API_URL}/${predictionId}`, {
      headers: {
        'Authorization': `Token ${apiToken}`,
      }
    });

    const data = await response.json();

    if (data.status === 'succeeded') {
      // IDM-VTON은 output이 배열로 반환됨
      return Array.isArray(data.output) ? data.output[0] : data.output;
    }

    if (data.status === 'failed' || data.status === 'canceled') {
      console.error('Prediction failed:', data.error);
      return null;
    }

    // 아직 처리 중이면 대기
    await new Promise(resolve => setTimeout(resolve, pollInterval));
  }

  console.error('Timed out waiting for prediction');
  return null;
}

// 이미지를 base64로 변환하는 유틸리티
export async function imageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// base64를 임시 URL로 업로드 (실제로는 cloudinary 등 사용 권장)
export async function uploadToTempStorage(base64: string): Promise<string> {
  // 실제 구현에서는 Cloudinary, S3, 또는 다른 스토리지 사용
  // 여기서는 base64를 바로 반환 (data URL)
  return base64;
}
