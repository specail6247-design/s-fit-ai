import os
import time
import logging
from typing import Optional, List
from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel
import replicate

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("masterpiece-backend")

app = FastAPI(title="Masterpiece Fit API")

# Replicate Models
MODEL_IDM_VTON = "cuuupid/idm-vton:c871bb9b046607b680449ecbae55fd8c6d945e0a1948644bf2361b3d021d3ff4"
MODEL_REAL_ESRGAN = "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73ab415c7253d1253711d"

class TryOnRequest(BaseModel):
    userPhotoUrl: str
    garmentImageUrl: str
    category: str = "upper_body"

class MotionRequest(BaseModel):
    imageUrl: str
    prompt: Optional[str] = "Cinematic slow motion fashion shoot, high fashion, 4k, highly detailed"

class MasterpiecePipeline:
    def __init__(self):
        self.api_token = os.environ.get("REPLICATE_API_TOKEN")
        if not self.api_token:
            logger.warning("REPLICATE_API_TOKEN is not set. API calls will fail.")

    async def generate_try_on(self, user_photo: str, garment_image: str, category: str) -> str:
        """
        Step 1: IDM-VTON Generation
        """
        logger.info(f"Starting Try-On for category: {category}")
        try:
            output = replicate.run(
                MODEL_IDM_VTON,
                input={
                    "human_img": user_photo,
                    "garm_img": garment_image,
                    "garment_des": "A clothing item",
                    "is_checked": True,
                    "is_checked_crop": False,
                    "denoise_steps": 30,
                    "seed": 42,
                    "category": category
                }
            )

            # IDM-VTON returns a string URL or list of URLs or stream
            image_url = self._parse_output(output)
            return image_url
        except Exception as e:
            logger.error(f"Try-On Error: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Try-On failed: {str(e)}")

    async def hyper_zoom_upscale(self, image_url: str) -> str:
        """
        Step 2: Hyper-Zoom (Real-ESRGAN Upscaling)
        """
        logger.info("Starting Hyper-Zoom Upscaling")
        try:
            output = replicate.run(
                MODEL_REAL_ESRGAN,
                input={
                    "image": image_url,
                    "scale": 2,
                    "face_enhance": True
                }
            )
            upscaled_url = self._parse_output(output)
            return upscaled_url
        except Exception as e:
            logger.error(f"Upscale Error: {str(e)}")
            # Fallback to original image if upscale fails
            return image_url

    async def generate_cinematic_motion(self, image_url: str, prompt: str) -> str:
        """
        Step 3: Cinematic Motion (Runway Gen-3 Mock)
        Since we don't have direct Runway API access in this env, we mock it or use another Replicate model.
        For now, we will return the static image URL but log the 'Cinematic' intent,
        or use a simple video generation model on Replicate if available (e.g., stability-ai/stable-video-diffusion).
        """
        logger.info("Starting Cinematic Motion Generation")

        # MOCK IMPLEMENTATION for Runway Gen-3
        # In a real scenario, we would call Runway API here.
        # For demonstration, we'll try to use Stable Video Diffusion on Replicate if we can,
        # otherwise return a mock response.

        try:
            # Using Stable Video Diffusion as a proxy for Runway Gen-3
            model = "stability-ai/stable-video-diffusion:3f0457e4619daac51203dedb472816f3afc54a3c53251e34f29a8f9300642921"
            output = replicate.run(
                model,
                input={
                    "input_image": image_url,
                    "video_length": "14_frames_with_svd",
                    "sizing_strategy": "maintain_aspect_ratio",
                    "frames_per_second": 6,
                    "motion_bucket_id": 127
                }
            )
            video_url = self._parse_output(output)
            return video_url
        except Exception as e:
            logger.error(f"Motion Gen Error: {str(e)}")
            # Return original image if video fails, client should handle
            return image_url

    def _parse_output(self, output):
        if isinstance(output, str):
            return output
        if isinstance(output, list) and len(output) > 0:
            return output[0]
        # Handle stream or other types if necessary
        return str(output)

pipeline = MasterpiecePipeline()

@app.get("/")
def read_root():
    return {"status": "Masterpiece Fit Backend Running"}

@app.post("/try-on")
async def try_on(request: TryOnRequest):
    # Pipeline: Try-On -> Upscale
    try:
        raw_result_url = await pipeline.generate_try_on(
            request.userPhotoUrl,
            request.garmentImageUrl,
            request.category
        )

        # Apply Hyper-Zoom
        final_result_url = await pipeline.hyper_zoom_upscale(raw_result_url)

        return {
            "success": True,
            "imageUrl": final_result_url,
            "originalUrl": raw_result_url
        }
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Pipeline Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/cinematic-motion")
async def cinematic_motion(request: MotionRequest):
    try:
        video_url = await pipeline.generate_cinematic_motion(request.imageUrl, request.prompt)
        return {
            "success": True,
            "videoUrl": video_url
        }
    except Exception as e:
        logger.error(f"Motion Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
