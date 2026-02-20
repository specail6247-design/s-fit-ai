import os
import replicate
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title="S_FIT AI Masterpiece Backend")

# CORS configuration
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "*", # Allow all for dev simplicity
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenerateRequest(BaseModel):
    user_photo: str # Data URI or URL
    garment_image: str # Data URI or URL
    accessory_image: Optional[str] = None # Data URI or URL
    category: str = "upper_body"
    garment_description: str = "A luxury garment"

class GenerateResponse(BaseModel):
    success: bool
    image_url: Optional[str] = None
    error: Optional[str] = None

class UpscaleRequest(BaseModel):
    image_url: str

class UpscaleResponse(BaseModel):
    success: bool
    image_url: Optional[str] = None
    error: Optional[str] = None

class CinematicRequest(BaseModel):
    image_url: str

class CinematicResponse(BaseModel):
    success: bool
    video_url: Optional[str] = None
    error: Optional[str] = None

# Models
IDM_VTON_MODEL = "cuuupid/idm-vton:c871bb9b046607b680449ecbae55fd8c6d945e0a1948644bf2361b3d021d3ff4"
REAL_ESRGAN_MODEL = "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73ab241bbb49991ea7781"
SVD_MODEL = "stability-ai/stable-video-diffusion:3f0457e4619daac51203dedb472816f3af8d9bc94d61ced4e916cd04605162f1"

@app.get("/")
async def root():
    return {"message": "S_FIT AI Masterpiece Backend Operational"}

@app.post("/generate", response_model=GenerateResponse)
async def generate_try_on(request: GenerateRequest):
    try:
        # Step 1: Base Garment Try-On
        print(f"Processing Try-On: {request.category}")

        output = replicate.run(
            IDM_VTON_MODEL,
            input={
                "human_img": request.user_photo,
                "garm_img": request.garment_image,
                "garment_des": request.garment_description,
                "category": request.category,
                "denoise_steps": 30,
                "seed": 42
            }
        )

        # Handle output (could be string or list)
        if isinstance(output, list) and len(output) > 0:
            result_url = output[0]
        else:
            result_url = str(output)

        # Step 2: Accessory Layering (Sequential)
        if request.accessory_image and result_url:
            print("Processing Accessory Layer...")
            # Use the result of the first try-on as the 'human' for the second
            # We map accessory try-on usually to 'upper_body' or 'dresses' depending on item,
            # but usually for IDM-VTON, 'upper_body' works for overlaying things on torso.
            # Ideally we'd use inpainting or specific accessory models, but this is the requested pipeline.

            output_acc = replicate.run(
                IDM_VTON_MODEL,
                input={
                    "human_img": result_url,
                    "garm_img": request.accessory_image,
                    "garment_des": "Luxury Accessory",
                    "category": "upper_body", # Forcing upper body for necklaces/bags usually
                    "denoise_steps": 30,
                    "seed": 43
                }
            )

            if isinstance(output_acc, list) and len(output_acc) > 0:
                result_url = output_acc[0]
            else:
                result_url = str(output_acc)

        return GenerateResponse(success=True, image_url=result_url)

    except Exception as e:
        print(f"Error in generate: {str(e)}")
        return GenerateResponse(success=False, error=str(e))

@app.post("/upscale", response_model=UpscaleResponse)
async def upscale_texture(request: UpscaleRequest):
    try:
        print(f"Upscaling texture for: {request.image_url}")

        output = replicate.run(
            REAL_ESRGAN_MODEL,
            input={
                "image": request.image_url,
                "scale": 4,
                "face_enhance": True
            }
        )

        result_url = str(output)
        return UpscaleResponse(success=True, image_url=result_url)

    except Exception as e:
        print(f"Error in upscale: {str(e)}")
        return UpscaleResponse(success=False, error=str(e))

@app.post("/cinematic", response_model=CinematicResponse)
async def generate_cinematic(request: CinematicRequest):
    try:
        print(f"Generating Cinematic Video (SVD) for: {request.image_url}")

        output = replicate.run(
            SVD_MODEL,
            input={
                "input_image": request.image_url,
                "video_length": "25_frames_with_svd_xt",
                "sizing_strategy": "maintain_aspect_ratio",
                "frames_per_second": 6,
                "motion_bucket_id": 127
            }
        )

        # SVD output is usually a URL to mp4
        result_url = str(output)
        return CinematicResponse(success=True, video_url=result_url)

    except Exception as e:
        print(f"Error in cinematic: {str(e)}")
        return CinematicResponse(success=False, error=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
