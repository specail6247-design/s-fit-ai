from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import asyncio
from pydantic import BaseModel
import uvicorn
import math
import httpx
import os
import json

app = FastAPI()

class TryOnRequest(BaseModel):
    userPhotoUrl: str
    garmentImageUrl: str
    category: str

class CinematicRequest(BaseModel):
    imageUrl: str

@app.post("/api/v1/orchestrate-try-on")
async def orchestrate_try_on(req: TryOnRequest):
    replicate_api_token = os.environ.get("REPLICATE_API_TOKEN")
    if not replicate_api_token:
        # Fallback for local testing without token
        await asyncio.sleep(2)
        return {"success": True, "imageUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"}

    async with httpx.AsyncClient() as client:
        try:
            # We call the Replicate API directly from FastAPI
            # This implements the requested AI Orchestration
            headers = {
                "Authorization": f"Bearer {replicate_api_token}",
                "Content-Type": "application/json",
            }
            payload = {
                "version": "c871bb9b046607b680449ecbae55fd8c6d945e0a1948644bf2361b3d021d3ff4",
                "input": {
                    "crop": False,
                    "seed": 42,
                    "steps": 30,
                    "category": req.category,
                    "force_dc": False,
                    "human_image": req.userPhotoUrl,
                    "garm_img": req.garmentImageUrl,
                    "garment_des": f"A {req.category} for virtual try-on"
                }
            }

            response = await client.post("https://api.replicate.com/v1/predictions", headers=headers, json=payload)
            response.raise_for_status()
            data = response.json()

            prediction_url = data["urls"]["get"]

            # Poll for completion
            while True:
                await asyncio.sleep(1)
                poll_response = await client.get(prediction_url, headers=headers)
                poll_data = poll_response.json()

                if poll_data["status"] == "succeeded":
                    return {"success": True, "imageUrl": poll_data["output"]}
                elif poll_data["status"] == "failed":
                    return {"success": False, "error": "Replicate API failed"}
        except Exception as e:
            print(f"Error orchestrating try-on: {e}")
            return {"success": False, "error": str(e)}

@app.post("/api/v1/cinematic-motion")
async def cinematic_motion(req: CinematicRequest):
    runway_api_token = os.environ.get("RUNWAY_API_TOKEN")
    if not runway_api_token:
        # Simulate Runway Gen-3/4 API call fallback
        await asyncio.sleep(3)
        return {"success": True, "videoUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"}

    async with httpx.AsyncClient() as client:
        try:
            headers = {
                "Authorization": f"Bearer {runway_api_token}",
                "Content-Type": "application/json",
                "X-Runway-Version": "2024-11-06"
            }
            # Runway Gen-3 API
            payload = {
                "promptImage": req.imageUrl,
                "seed": 42,
                "model": "gen3a_turbo",
                "promptText": "Cinematic high fidelity fashion rendering, flowing fabric, slow motion, studio lighting"
            }

            response = await client.post("https://api.dev.runwayml.com/v1/image_to_video", headers=headers, json=payload)
            response.raise_for_status()
            data = response.json()

            task_id = data["id"]

            # Poll for completion
            while True:
                await asyncio.sleep(1)
                poll_response = await client.get(f"https://api.dev.runwayml.com/v1/tasks/{task_id}", headers=headers)
                poll_data = poll_response.json()

                if poll_data["status"] == "SUCCEEDED":
                    return {"success": True, "videoUrl": poll_data["output"][0]}
                elif poll_data["status"] == "FAILED":
                    return {"success": False, "error": "Runway API failed"}
        except Exception as e:
            print(f"Error orchestrating cinematic motion: {e}")
            return {"success": False, "error": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
