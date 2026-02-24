import os
import replicate
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import shutil
import base64

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
IDM_VTON_MODEL = "cuuupid/idm-vton:c871bb9b046607b680449ecbae55fd8c6d945e0a1948644bf2361b3d021d3ff4"
REAL_ESRGAN_MODEL = "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73ab241bbb49991ea7781"
SVD_MODEL = "stability-ai/stable-video-diffusion:3f0457e4619daac51203dedb472816f3af8d9bc94d61ced4e916cd04605162f1"

class CinematicRequest(BaseModel):
    image_url: str

@app.post("/api/orchestrate/try-on")
async def try_on(
    user_photo: UploadFile = File(...),
    garment_image_url: str = Form(...)
):
    try:
        # Save uploaded file temporarily
        temp_filename = f"temp_{user_photo.filename}"
        with open(temp_filename, "wb") as buffer:
            shutil.copyfileobj(user_photo.file, buffer)

        print(f"Starting IDM-VTON for {temp_filename} with {garment_image_url}")

        # 1. Run IDM-VTON
        output = replicate.run(
            IDM_VTON_MODEL,
            input={
                "human_img": open(temp_filename, "rb"),
                "garm_img": garment_image_url,
                "garment_des": "A luxury fashion item",
                "is_checked": True,
                "is_checked_crop": False,
                "denoise_steps": 30,
                "seed": 42
            }
        )

        # IDM-VTON output is usually a URL or list of URLs
        try_on_url = output if isinstance(output, str) else output[0]
        print(f"IDM-VTON Output: {try_on_url}")

        # 2. Upscale (Hyper-Zoom Ready)
        print("Starting Upscaling...")
        upscaled_output = replicate.run(
            REAL_ESRGAN_MODEL,
            input={
                "image": try_on_url,
                "scale": 4,
                "face_enhance": True
            }
        )
        upscaled_url = upscaled_output if isinstance(upscaled_output, str) else upscaled_output[0]
        print(f"Upscaled Output: {upscaled_url}")

        # Clean up
        os.remove(temp_filename)

        return {
            "success": True,
            "original_url": try_on_url,
            "upscaled_url": upscaled_url
        }

    except Exception as e:
        print(f"Error: {str(e)}")
        if os.path.exists(temp_filename):
            os.remove(temp_filename)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/orchestrate/cinematic")
async def cinematic(request: CinematicRequest):
    try:
        print(f"Starting Cinematic Video Generation for {request.image_url}")

        # 3. Generate Video (Cinematic Share)
        output = replicate.run(
            SVD_MODEL,
            input={
                "input_image": request.image_url,
                "video_length": "25_frames_with_svd_xt",
                "sizing_strategy": "maintain_aspect_ratio",
                "motion_bucket_id": 127,
                "frames_per_second": 6,
                "cond_aug": 0.02
            }
        )

        video_url = output if isinstance(output, str) else output[0]
        print(f"Video Output: {video_url}")

        return {
            "success": True,
            "video_url": video_url
        }

    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
