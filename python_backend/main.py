from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import asyncio
import os
import replicate
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

class OrchestrationRequest(BaseModel):
    user_photo_url: str
    garment_image_url: str
    category: str = "upper_body"

class OrchestrationResponse(BaseModel):
    success: bool
    pipeline_status: str
    final_video_url: str | None = None
    tryon_image_url: str | None = None
    texture_sharpened: bool = False
    error: str | None = None

@app.post("/api/orchestrate", response_model=OrchestrationResponse)
async def orchestrate_pipeline(request: OrchestrationRequest):
    try:
        api_token = os.environ.get("REPLICATE_API_TOKEN")
        if not api_token:
             # Simulation mode if no key
             print(f"Simulation mode: Starting pipeline for {request.user_photo_url[:30]}...")
             await asyncio.sleep(0.5)
             tryon_image_url = f"{request.user_photo_url}_tryon.jpg"
             await asyncio.sleep(0.5)
             runway_video_url = f"{tryon_image_url}_motion.mp4"
             return OrchestrationResponse(
                 success=True,
                 pipeline_status="Simulated: [IDM-VTON] -> [Runway] -> [Texture Sharpness]",
                 tryon_image_url=tryon_image_url,
                 final_video_url=runway_video_url,
                 texture_sharpened=True
             )

        client = replicate.Client(api_token=api_token)

        # Step 1: IDM-VTON (Dressing)
        print("Starting IDM-VTON...")
        tryon_output = client.run(
            "cuuupid/idm-vton:c871bb9b046607b680449ecbae55fd8c6d945e0a1948644bf2361b3d021d3ff4",
            input={
                "human_img": request.user_photo_url,
                "garm_img": request.garment_image_url,
                "garment_des": "A clothing item",
                "is_checked": True,
                "is_checked_crop": False,
                "denoise_steps": 30,
                "seed": 42,
                "category": request.category
            }
        )
        # Replicate output could be an iterator or a string url
        tryon_image_url = str(tryon_output[0]) if isinstance(tryon_output, list) else str(tryon_output)
        print(f"IDM-VTON Complete: {tryon_image_url}")

        # Step 2: Post-Processing (Texture Sharpness via Real-ESRGAN)
        print("Starting Texture Sharpness...")
        upscale_output = client.run(
            "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73ab241bbb49991ea7781",
            input={
                "image": tryon_image_url,
                "scale": 4,
                "face_enhance": True
            }
        )
        sharpened_image_url = str(upscale_output)
        print(f"Texture Sharpness Complete: {sharpened_image_url}")

        # Step 3: Runway (Motion Synthesis via SVD)
        print("Starting Runway Motion Synthesis (SVD)...")
        video_output = client.run(
            "stability-ai/stable-video-diffusion:3f0457e4619daac51203dedb472816f3af8d9bc94d61ced4e916cd04605162f1",
            input={
                "input_image": sharpened_image_url,
                "video_length": "25_frames_with_svd_xt",
                "sizing_strategy": "maintain_aspect_ratio",
                "motion_bucket_id": 127,
                "frames_per_second": 6,
                "cond_aug": 0.02
            }
        )
        runway_video_url = str(video_output)
        print(f"Runway Motion Complete: {runway_video_url}")

        return OrchestrationResponse(
            success=True,
            pipeline_status="Completed: [IDM-VTON] -> [Texture Sharpness] -> [Runway]",
            tryon_image_url=sharpened_image_url,
            final_video_url=runway_video_url,
            texture_sharpened=True
        )

    except Exception as e:
        print(f"Pipeline failed: {str(e)}")
        return OrchestrationResponse(
            success=False,
            pipeline_status="Failed",
            error=str(e)
        )

@app.get("/health")
async def health_check():
    return {"status": "ok"}
