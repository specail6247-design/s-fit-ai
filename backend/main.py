from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
import os

app = FastAPI()

class PipelineRequest(BaseModel):
    userPhotoUrl: str
    garmentImageUrl: str
    category: str

@app.post("/orchestrate")
async def orchestrate_pipeline(request: PipelineRequest):
    """
    Seamless pipeline:
    [User Photo] -> [IDM-VTON (Dressing)] -> [Runway (Motion Synthesis)] -> [Post-Processing (Texture Sharpness)]
    """
    try:
        # Step 1: IDM-VTON via Next.js API (or direct Replicate call)
        # Using Next.js API for simplicity in this orchestrated flow
        # In a real environment, this might call Replicate directly
        nextjs_url = os.environ.get("NEXTJS_URL", "http://localhost:3000")

        print("1. Initiating Virtual Try-On (IDM-VTON)...")
        vton_res = requests.post(f"{nextjs_url}/api/try-on", json={
            "userPhotoUrl": request.userPhotoUrl,
            "garmentImageUrl": request.garmentImageUrl,
            "category": request.category
        })

        if not vton_res.ok:
            raise HTTPException(status_code=500, detail="IDM-VTON failed")

        vton_data = vton_res.json()
        result_image_url = vton_data.get("imageUrl")

        # Step 2: Texture Sharpness / Hyper-Zoom pre-processing
        # (Could use the existing texture_upscaler.py logic here)
        print("2. Enhancing Texture (Hyper-Zoom Prep)...")
        # For demo, we just pass the URL along, assuming enhancement happens
        enhanced_image_url = result_image_url

        # Step 3: Motion Synthesis (Runway)
        print("3. Synthesizing Motion (Runway)...")
        runway_res = requests.post(f"{nextjs_url}/api/cinematic-share", json={
            "imageUrl": enhanced_image_url,
            "prompt": "Cinematic, hyper-realistic, slow motion, fashion runway shot, 4k, detailed texture"
        })

        if not runway_res.ok:
             # If video fails, still return the image
             return {"success": True, "imageUrl": enhanced_image_url, "videoUrl": None}

        runway_data = runway_res.json()
        video_url = runway_data.get("videoUrl")

        return {
            "success": True,
            "imageUrl": enhanced_image_url,
            "videoUrl": video_url
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
