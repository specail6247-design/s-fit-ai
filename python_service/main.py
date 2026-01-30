import cv2
import numpy as np
import base64
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import logging
import requests
from io import BytesIO

app = FastAPI()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class TextureRequest(BaseModel):
    image_url: str = None
    image_base64: str = None

class TextureResponse(BaseModel):
    success: bool
    image_base64: str = None
    error: str = None

def decode_image(request: TextureRequest):
    try:
        if request.image_base64:
            # Handle base64 input
            # Check if there is a header "data:image/..."
            if ',' in request.image_base64:
                b64_str = request.image_base64.split(',')[1]
            else:
                b64_str = request.image_base64

            img_data = base64.b64decode(b64_str)
            np_arr = np.frombuffer(img_data, np.uint8)
            img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
            return img
        elif request.image_url:
            # Handle URL input
            resp = requests.get(request.image_url, timeout=10)
            resp.raise_for_status()
            np_arr = np.frombuffer(resp.content, np.uint8)
            img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
            return img
        else:
            return None
    except Exception as e:
        logger.error(f"Error decoding image: {str(e)}")
        return None

def enhance_texture_logic(img):
    # Unsharp Masking for Texture Enhancement
    # 1. Gaussian Blur
    gaussian_3 = cv2.GaussianBlur(img, (0, 0), 2.0)
    # 2. Weighted add
    unsharp_image = cv2.addWeighted(img, 1.5, gaussian_3, -0.5, 0, img)
    return unsharp_image

@app.post("/enhance-texture", response_model=TextureResponse)
async def enhance_texture(request: TextureRequest):
    try:
        logger.info("Received enhance-texture request")
        img = decode_image(request)

        if img is None:
            raise HTTPException(status_code=400, detail="Invalid image input")

        # Process image
        enhanced_img = enhance_texture_logic(img)

        # Encode back to base64
        _, buffer = cv2.imencode('.png', enhanced_img)
        img_str = base64.b64encode(buffer).decode('utf-8')

        return TextureResponse(
            success=True,
            image_base64=f"data:image/png;base64,{img_str}"
        )

    except Exception as e:
        logger.error(f"Processing error: {str(e)}")
        return TextureResponse(success=False, error=str(e))

@app.get("/health")
def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
