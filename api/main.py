from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import httpx
import os
import asyncio

app = FastAPI(title="M_FIT AI Orchestration")

REPLICATE_API_TOKEN = os.getenv("REPLICATE_API_TOKEN", "")

class TryOnRequest(BaseModel):
    userPhotoUrl: str
    garmentImageUrl: str
    category: str = "upper_body"

class CinematicRequest(BaseModel):
    imageUrl: str

@app.post("/try-on")
async def generate_try_on(req: TryOnRequest):
    if not REPLICATE_API_TOKEN:
        raise HTTPException(status_code=500, detail="REPLICATE_API_TOKEN not configured")

    headers = {
        "Authorization": f"Bearer {REPLICATE_API_TOKEN}",
        "Content-Type": "application/json"
    }

    payload = {
        "version": "c871bb9b046607b680449ecbae55fd8c6d945e0a1948644bf2361b3d021d3ff4",
        "input": {
            "human_img": req.userPhotoUrl,
            "garm_img": req.garmentImageUrl,
            "garment_des": "A clothing item",
            "category": req.category,
            "is_checked": True
        }
    }

    async with httpx.AsyncClient() as client:
        try:
            resp = await client.post("https://api.replicate.com/v1/predictions", json=payload, headers=headers)
            resp.raise_for_status()
            prediction = resp.json()
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

        pred_url = prediction["urls"]["get"]
        for _ in range(60):
            await asyncio.sleep(2)
            try:
                poll_resp = await client.get(pred_url, headers=headers)
                poll_resp.raise_for_status()
                status_data = poll_resp.json()
            except Exception as e:
                raise HTTPException(status_code=500, detail=str(e))

            status = status_data.get("status")
            if status == "succeeded":
                output = status_data.get("output")
                img_url = output if isinstance(output, str) else output[0] if isinstance(output, list) else None
                return {"success": True, "imageUrl": img_url}
            elif status == "failed":
                return {"success": False, "error": status_data.get("error", "Unknown error")}

        return {"success": False, "error": "Prediction timed out"}

@app.post("/cinematic")
async def generate_cinematic(req: CinematicRequest):
    if not REPLICATE_API_TOKEN:
        raise HTTPException(status_code=500, detail="REPLICATE_API_TOKEN not configured")

    headers = {
        "Authorization": f"Bearer {REPLICATE_API_TOKEN}",
        "Content-Type": "application/json"
    }

    payload = {
        "version": "3f0457e4619daac51203dedb472816f3af8d9bc94d61ced4e916cd04605162f1",
        "input": {
            "input_image": req.imageUrl,
            "video_length": "25_frames_with_svd_xt",
            "sizing_strategy": "maintain_aspect_ratio",
            "motion_bucket_id": 127,
            "frames_per_second": 6
        }
    }

    async with httpx.AsyncClient() as client:
        try:
            resp = await client.post("https://api.replicate.com/v1/predictions", json=payload, headers=headers)
            resp.raise_for_status()
            prediction = resp.json()
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

        pred_url = prediction["urls"]["get"]
        for _ in range(60):
            await asyncio.sleep(2)
            try:
                poll_resp = await client.get(pred_url, headers=headers)
                poll_resp.raise_for_status()
                status_data = poll_resp.json()
            except Exception as e:
                raise HTTPException(status_code=500, detail=str(e))

            status = status_data.get("status")
            if status == "succeeded":
                return {"success": True, "videoUrl": status_data.get("output")}
            elif status == "failed":
                return {"success": False, "error": status_data.get("error", "Unknown error")}

        return {"success": False, "error": "Prediction timed out"}
