from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
import os
import replicate

app = FastAPI()

class TryOnRequest(BaseModel):
    userPhoto: str
    garmentImage: str
    category: Optional[str] = "upper_body"

class CinematicRequest(BaseModel):
    imageUrl: str

IDM_VTON_MODEL = "cuuupid/idm-vton:c871bb9b046607b680449ecbae55fd8c6d945e0a1948644bf2361b3d021d3ff4"
SVD_MODEL = "stability-ai/stable-video-diffusion:3f0457e4619daac51203dedb472816f3af8d9bc94d61ced4e916cd04605162f1"

def _get_replicate():
    token = os.environ.get("REPLICATE_API_TOKEN")
    if not token:
        raise HTTPException(status_code=500, detail="REPLICATE_API_TOKEN not set")
    return replicate.Client(api_token=token)

def _extract_url(output):
    if isinstance(output, list):
        return str(output[0]) if output else None
    if isinstance(output, str):
        return output
    if hasattr(output, 'url'):
        return str(output.url)
    return None

@app.post("/api/orchestrate/try-on")
async def orchestrate_try_on(req: TryOnRequest):
    try:
        client = _get_replicate()
        output = client.run(
            IDM_VTON_MODEL,
            input={
                "human_img": req.userPhoto,
                "garm_img": req.garmentImage,
                "garment_des": "A clothing item",
                "is_checked": True,
                "category": req.category
            }
        )
        url = _extract_url(output)
        if url:
            return {"success": True, "imageUrl": url}
        return {"success": False, "error": "No output received"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/orchestrate/cinematic")
async def orchestrate_cinematic(req: CinematicRequest):
    try:
        client = _get_replicate()
        output = client.run(
            SVD_MODEL,
            input={
                "input_image": req.imageUrl,
                "video_length": "25_frames_with_svd_xt",
                "sizing_strategy": "maintain_aspect_ratio",
                "motion_bucket_id": 127,
                "frames_per_second": 6
            }
        )
        url = _extract_url(output)
        if url:
            return {"success": True, "videoUrl": url}
        return {"success": False, "error": "No video URL in output"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
