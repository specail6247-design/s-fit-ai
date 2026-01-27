from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
import base64
import cv2
import numpy as np
from processor import TextureUpscaler

app = FastAPI()
upscaler = TextureUpscaler()

class TextureRequest(BaseModel):
    imageUrl: str

class TextureResponse(BaseModel):
    success: bool
    texture: str  # Base64 encoded 4K texture
    normalMap: str # Base64 encoded normal map
    displacementMap: str # Base64 encoded displacement map
    error: str = None

def encode_image(img, ext=".png"):
    success, encoded_img = cv2.imencode(ext, img)
    if not success:
        return None
    return base64.b64encode(encoded_img).decode('utf-8')

@app.post("/process-texture", response_model=TextureResponse)
async def process_texture(request: TextureRequest):
    try:
        # Download image
        print(f"Downloading image from {request.imageUrl}")
        response = requests.get(request.imageUrl, timeout=10)
        response.raise_for_status()
        img_bytes = response.content

        # Process
        high_res, normal, disp = upscaler.process_image(img_bytes)

        # Encode to Base64
        high_res_b64 = encode_image(high_res)
        normal_b64 = encode_image(normal)
        disp_b64 = encode_image(disp)

        if not high_res_b64 or not normal_b64 or not disp_b64:
            raise ValueError("Failed to encode result images")

        return TextureResponse(
            success=True,
            texture=f"data:image/png;base64,{high_res_b64}",
            normalMap=f"data:image/png;base64,{normal_b64}",
            displacementMap=f"data:image/png;base64,{disp_b64}"
        )

    except Exception as e:
        print(f"Error processing texture: {e}")
        return TextureResponse(
            success=False,
            texture="",
            normalMap="",
            displacementMap="",
            error=str(e)
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
