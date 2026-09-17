from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
import os
import httpx
import asyncio

app = FastAPI()

class PipelineRequest(BaseModel):
    userPhotoUrl: str
    garmentImageUrl: str
    category: Optional[str] = "upper_body"
    accessory: Optional[dict] = None

# Replicate API configuration
REPLICATE_API_TOKEN = os.environ.get("REPLICATE_API_TOKEN", "")
IDM_VTON_MODEL = "cuuupid/idm-vton:c871bb9b046607b680449ecbae55fd8c6d945e0a1948644bf2361b3d021d3ff4"
REAL_ESRGAN_MODEL = "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73ab241bbb49991ea7781"
RUNWAY_GEN3_MODEL = "runwayml/gen-3-alpha:latest" # Requested Runway Gen-3/4 API

async def call_replicate(client: httpx.AsyncClient, model: str, input_data: dict):
    if not REPLICATE_API_TOKEN:
        # Mock successful response if no token
        if model == RUNWAY_GEN3_MODEL:
            return {"output": "https://example.com/mock-video.mp4"}
        return {"output": "https://pub-83c5db439b40468498f97946200806f7.r2.dev/mock-result-sfit.png"}

    url = "https://api.replicate.com/v1/predictions"
    headers = {
        "Authorization": f"Token {REPLICATE_API_TOKEN}",
        "Content-Type": "application/json"
    }
    data = {
        "version": model.split(":")[1] if ":" in model else model,
        "input": input_data
    }

    response = await client.post(url, headers=headers, json=data)
    if response.status_code != 201:
        raise HTTPException(status_code=500, detail=f"Replicate API error: {response.text}")

    prediction = response.json()
    prediction_url = prediction["urls"]["get"]

    # Polling
    for _ in range(60):
        await asyncio.sleep(2)
        resp = await client.get(prediction_url, headers=headers)
        result = resp.json()
        if result["status"] == "succeeded":
            return result
        elif result["status"] == "failed":
            raise HTTPException(status_code=500, detail="Replicate prediction failed")

    raise HTTPException(status_code=504, detail="Replicate prediction timeout")

@app.post("/api/m-fit/pipeline")
async def run_pipeline(request: PipelineRequest):
    async with httpx.AsyncClient() as client:
        # Phase 5: Material Interaction logic (mocked logic equivalent to materialInteraction.ts)
        interactionData = None
        if request.accessory:
             interactionData = {
                 "success": True,
                 "physicsAdjustment": "increase_gravity_pull" if request.accessory.get("weight") == "heavy" else "standard",
                 "notes": f"Material interaction calculated for {request.accessory.get('type')} on silk."
             }

        # Step 1: Virtual Try-On
        try_on_input = {
            "human_img": request.userPhotoUrl,
            "garm_img": request.garmentImageUrl,
            "garment_des": "A clothing item",
            "category": request.category
        }

        tryon_result = await call_replicate(client, IDM_VTON_MODEL, try_on_input)

        # Handle replicate streaming output array vs string
        output_url = tryon_result.get("output")
        if isinstance(output_url, list):
            output_url = output_url[0] if len(output_url) > 0 else None

        if not output_url:
            raise HTTPException(status_code=500, detail="Failed to get try-on image")

        # Step 2: Upscale & Video generation in parallel
        upscale_input = {"image": output_url, "scale": 4}
        video_input = {
            "prompt": "Cinematic runway walk, hyper-realistic, 60fps",
            "image": output_url,
            "duration": 5
        } # Runway parameters

        upscale_task = asyncio.create_task(call_replicate(client, REAL_ESRGAN_MODEL, upscale_input))
        video_task = asyncio.create_task(call_replicate(client, RUNWAY_GEN3_MODEL, video_input))

        results = await asyncio.gather(upscale_task, video_task, return_exceptions=True)

        upscale_result = results[0] if not isinstance(results[0], Exception) else None
        video_result = results[1] if not isinstance(results[1], Exception) else None

        upscale_url = upscale_result.get("output") if upscale_result else None
        if isinstance(upscale_url, list): upscale_url = upscale_url[0] if len(upscale_url) > 0 else None

        video_url = video_result.get("output") if video_result else None
        if isinstance(video_url, list): video_url = video_url[0] if len(video_url) > 0 else None

        return {
            "success": True,
            "imageUrl": output_url,
            "upscaledUrl": upscale_url or output_url,
            "videoUrl": video_url,
            "interactionData": interactionData
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
