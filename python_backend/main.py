from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import replicate
import os
import asyncio

app = FastAPI()

class TryOnRequest(BaseModel):
    userPhotoUrl: str
    garmentImageUrl: str
    category: str = "upper_body"

class VideoRequest(BaseModel):
    imageUrl: str

@app.post("/api/try-on")
async def generate_try_on(request: TryOnRequest):
    try:
        # Check if REPLICATE_API_TOKEN is set
        if not os.environ.get("REPLICATE_API_TOKEN"):
             # For local testing if the token is not set, just return mock url
             return {"success": True, "imageUrl": "https://pub-83c5db439b40468498f97946200806f7.r2.dev/mock-result-sfit.png"}

        output = replicate.run(
            "cuuupid/idm-vton:c871bb9b046607b680449ecbae55fd8c6d945e0a1948644bf2361b3d021d3ff4",
            input={
                "human_img": request.userPhotoUrl,
                "garm_img": request.garmentImageUrl,
                "garment_des": "A clothing item",
                "is_checked": True,
                "is_checked_crop": False,
                "denoise_steps": 30,
                "seed": 42,
                "category": request.category
            }
        )

        image_url = None
        if isinstance(output, str):
            image_url = output
        elif isinstance(output, list) and len(output) > 0:
            image_url = str(output[0])

        if image_url:
            return {"success": True, "imageUrl": image_url}
        else:
            raise HTTPException(status_code=500, detail="No output URL from Replicate")

    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/generate-video")
async def generate_video(request: VideoRequest):
    try:
        if not os.environ.get("REPLICATE_API_TOKEN"):
             return {"success": True, "videoUrl": "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4"}

        output = replicate.run(
            "stability-ai/stable-video-diffusion:3f0457e4619daac51203dedb472816f3af8d9bc94d61ced4e916cd04605162f1",
            input={
                "input_image": request.imageUrl,
                "video_length": "25_frames_with_svd_xt",
                "sizing_strategy": "maintain_aspect_ratio",
                "motion_bucket_id": 127,
                "frames_per_second": 6,
                "cond_aug": 0.02
            }
        )

        video_url = None
        if isinstance(output, str):
             video_url = output
        elif isinstance(output, list) and len(output) > 0:
             video_url = str(output[0])

        if video_url:
             return {"success": True, "videoUrl": video_url}
        else:
             raise HTTPException(status_code=500, detail="No output URL from Replicate")
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
