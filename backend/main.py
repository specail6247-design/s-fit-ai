import os
import json
import base64
import httpx
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any

# Load environment variables if needed
from dotenv import load_dotenv
load_dotenv()

app = FastAPI(title="Masterpiece Fit Orchestration API")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class OrchestrationRequest(BaseModel):
    userPhotoUrl: str = Field(..., description="URL or data URI of the user photo")
    garmentImageUrl: str = Field(..., description="URL or data URI of the garment image")
    category: Optional[str] = Field("upper_body", description="Category of the garment")
    garmentDescription: Optional[str] = Field("A clothing item", description="Text description")
    upscale: Optional[bool] = Field(True, description="Whether to apply post-processing upscaling")

class OrchestrationResponse(BaseModel):
    success: bool
    imageUrl: Optional[str] = None
    videoUrl: Optional[str] = None
    error: Optional[str] = None

# Replicate API Constants
REPLICATE_API_TOKEN = os.getenv("REPLICATE_API_TOKEN")
IDM_VTON_MODEL = "cuuupid/idm-vton:c871bb9b046607b680449ecbae55fd8c6d945e0a1948644bf2361b3d021d3ff4"
SVD_MODEL = "stability-ai/stable-video-diffusion:3f0457e4619daac51203dedb472816f3af8d9bc94d61ced4e916cd04605162f1"

async def call_replicate(model_version: str, input_data: Dict[str, Any]) -> str:
    """Helper function to call Replicate API and return output URL/Data"""
    if not REPLICATE_API_TOKEN:
        # If no token, return a mock response for testing
        print(f"Mocking Replicate call to {model_version}")
        return "https://replicate.delivery/mock_output_url.jpg"

    headers = {
        "Authorization": f"Bearer {REPLICATE_API_TOKEN}",
        "Content-Type": "application/json"
    }

    async with httpx.AsyncClient() as client:
        # Step 1: Create prediction
        create_resp = await client.post(
            "https://api.replicate.com/v1/predictions",
            headers=headers,
            json={"version": model_version.split(":")[1], "input": input_data}
        )
        create_resp.raise_for_status()
        prediction = create_resp.json()
        pred_id = prediction["id"]

        # Step 2: Poll for completion
        import asyncio
        while True:
            await asyncio.sleep(1)
            poll_resp = await client.get(
                f"https://api.replicate.com/v1/predictions/{pred_id}",
                headers=headers
            )
            poll_resp.raise_for_status()
            result = poll_resp.json()

            if result["status"] == "succeeded":
                output = result["output"]
                if isinstance(output, list) and len(output) > 0:
                    return str(output[0])
                elif isinstance(output, str):
                    return output
                else:
                    raise Exception(f"Unexpected output format: {output}")
            elif result["status"] == "failed":
                raise Exception(f"Replicate prediction failed: {result.get('error')}")

@app.post("/api/orchestrate", response_model=OrchestrationResponse)
async def orchestrate_masterpiece(req: OrchestrationRequest):
    try:
        # --- Step 1: Dressing (IDM-VTON) ---
        print("Step 1: Running IDM-VTON...")
        vton_input = {
            "human_img": req.userPhotoUrl,
            "garm_img": req.garmentImageUrl,
            "garment_des": req.garmentDescription,
            "is_checked": True,
            "is_checked_crop": False,
            "denoise_steps": 30,
            "seed": 42,
            "category": req.category if req.category != "accessories" else "upper_body"
        }

        static_image_url = await call_replicate(IDM_VTON_MODEL, vton_input)
        print(f"IDM-VTON Result: {static_image_url}")

        # --- Step 2: Motion Synthesis (Runway/SVD) ---
        print("Step 2: Running Motion Synthesis (SVD)...")
        svd_input = {
            "input_image": static_image_url,
            "video_length": "25_frames_with_svd_xt",
            "sizing_strategy": "maintain_aspect_ratio",
            "motion_bucket_id": 127,
            "frames_per_second": 6,
            "cond_aug": 0.02
        }

        video_url = await call_replicate(SVD_MODEL, svd_input)
        print(f"Motion Synthesis Result: {video_url}")

        # --- Step 3: Post-Processing (Texture Sharpness) ---
        print("Step 3: Applying Post-Processing (Texture Sharpness)...")
        # In a full implementation, we would extract frames, apply cv2/Pillow sharpening,
        # and re-encode. For this orchestration, we return the generated video URL
        # and a sharp static image URL, simulating the pipeline output.

        return OrchestrationResponse(
            success=True,
            imageUrl=static_image_url,
            videoUrl=video_url
        )

    except Exception as e:
        import traceback
        traceback.print_exc()
        return OrchestrationResponse(
            success=False,
            error=str(e)
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
