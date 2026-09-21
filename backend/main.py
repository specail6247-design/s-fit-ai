from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import asyncio
import os
import replicate

app = FastAPI()

class TryOnRequest(BaseModel):
    userPhotoUrl: str
    garmentImageUrl: str
    category: str = "tops"

class ImageRequest(BaseModel):
    imageUrl: str

IDM_VTON_MODEL = "cuuupid/idm-vton:c871bb9b046607b680449ecbae55fd8c6d945e0a1948644bf2361b3d021d3ff4"
REAL_ESRGAN_MODEL = "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73ab241bbb49991ea7781"
SVD_MODEL = "stability-ai/stable-video-diffusion:3f0457e4619daac51203dedb472816f3af8d9bc94d61ced4e916cd04605162f1"

# Helper to consume Replicate output which can be a FileOutput object
def extract_url(output):
    if not output:
        return None
    # If it's a list, take the first element
    if isinstance(output, list) and len(output) > 0:
        output = output[0]

    if isinstance(output, str):
        return output
    if hasattr(output, 'url'):
        return output.url
    # Attempt to cast to string as a fallback for FileOutput objects
    return str(output)

@app.post("/api/try-on")
async def try_on(req: TryOnRequest):
    api_token = os.environ.get("REPLICATE_API_TOKEN")
    if not api_token or api_token == "dummy":
        await asyncio.sleep(1)
        return {"success": True, "imageUrl": "https://pub-83c5db439b40468498f97946200806f7.r2.dev/mock-result-sfit.png"}

    try:
        output = replicate.run(
            IDM_VTON_MODEL,
            input={
                "human_img": req.userPhotoUrl,
                "garm_img": req.garmentImageUrl,
                "garment_des": "A clothing item",
                "is_checked": True,
                "is_checked_crop": False,
                "denoise_steps": 30,
                "seed": 42,
                "category": req.category if req.category != "accessories" else "upper_body"
            }
        )
        url = extract_url(output)
        if url:
             return {"success": True, "imageUrl": url}
        return {"success": False, "error": "No URL returned"}
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.post("/api/upscale")
async def upscale(req: ImageRequest):
    api_token = os.environ.get("REPLICATE_API_TOKEN")
    if not api_token or api_token == "dummy":
        await asyncio.sleep(1)
        return {"success": True, "imageUrl": req.imageUrl}
    try:
        output = replicate.run(
            REAL_ESRGAN_MODEL,
            input={
                "image": req.imageUrl,
                "scale": 4,
                "face_enhance": True
            }
        )
        url = extract_url(output)
        if url:
             return {"success": True, "imageUrl": url}
        return {"success": False, "error": "No URL returned"}
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.post("/api/video")
async def generate_video(req: ImageRequest):
    api_token = os.environ.get("REPLICATE_API_TOKEN")
    if not api_token or api_token == "dummy":
        await asyncio.sleep(2)
        return {"success": True, "videoUrl": "https://pub-83c5db439b40468498f97946200806f7.r2.dev/mock-video.mp4"}
    try:
        output = replicate.run(
            SVD_MODEL,
            input={
                "input_image": req.imageUrl,
                "video_length": "25_frames_with_svd_xt",
                "sizing_strategy": "maintain_aspect_ratio",
                "motion_bucket_id": 127,
                "frames_per_second": 6,
                "cond_aug": 0.02
            }
        )
        url = extract_url(output)
        if url:
             return {"success": True, "videoUrl": url}
        return {"success": False, "error": "No URL returned"}
    except Exception as e:
        return {"success": False, "error": str(e)}
