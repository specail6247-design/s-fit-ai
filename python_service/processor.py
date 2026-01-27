import cv2
import numpy as np

class TextureUpscaler:
    def __init__(self):
        # In this environment, we always use fallback
        self.use_realesrgan = False

    def process_image(self, img_bytes: bytes, scale=4):
        # Decode image from bytes
        nparr = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_UNCHANGED)

        if img is None:
            raise ValueError("Failed to decode image")

        # Upscale
        high_res = self._upscale_fallback(img, scale)

        # Generate Maps
        normal_map = self.generate_normal_map(high_res)
        disp_map = self.generate_displacement_map(high_res)

        return high_res, normal_map, disp_map

    def _upscale_fallback(self, img, scale):
        h, w = img.shape[:2]
        # High quality bicubic resize
        upscaled = cv2.resize(img, (w * scale, h * scale), interpolation=cv2.INTER_CUBIC)

        # Sharpen
        kernel = np.array([[-1,-1,-1], [-1,9,-1], [-1,-1,-1]])
        sharpened = cv2.filter2D(upscaled, -1, kernel)

        # Denoise
        if len(sharpened.shape) == 3:
            sharpened = cv2.fastNlMeansDenoisingColored(sharpened, None, 10, 10, 7, 21)

        return sharpened

    def generate_normal_map(self, img):
        if img is None: return None

        if len(img.shape) == 3:
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        else:
            gray = img

        scale = 1
        delta = 0
        ddepth = cv2.CV_32F

        gx = cv2.Sobel(gray, ddepth, 1, 0, ksize=3, scale=scale, delta=delta, borderType=cv2.BORDER_DEFAULT)
        gy = cv2.Sobel(gray, ddepth, 0, 1, ksize=3, scale=scale, delta=delta, borderType=cv2.BORDER_DEFAULT)

        strength = 5.0
        z = np.ones_like(gx) * strength
        normal = np.dstack((-gx, -gy, z))
        norm = np.linalg.norm(normal, axis=2, keepdims=True)
        normal = normal / (norm + 1e-5)
        normal_rgb = ((normal + 1) * 0.5 * 255).astype(np.uint8)
        normal_bgr = cv2.cvtColor(normal_rgb, cv2.COLOR_RGB2BGR)

        return normal_bgr

    def generate_displacement_map(self, img):
        if img is None: return None
        if len(img.shape) == 3:
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        else:
            gray = img

        clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8,8))
        disp = clahe.apply(gray)
        return disp
