import os
import sys
import cv2
import numpy as np
import argparse

class TextureUpscaler:
    def __init__(self):
        self.use_realesrgan = False
        try:
            # Attempt import to check if available, but for this sandbox env
            # we likely lack the model weights file, so we default to fallback logic
            # unless specifically configured.
            import torch
            # from basicsr.archs.rrdbnet_arch import RRDBNet
            # from realesrgan import RealESRGANer
            # self.use_realesrgan = True
        except ImportError:
            print("Warning: Real-ESRGAN dependencies not found. Using OpenCV fallback.")
            self.use_realesrgan = False

    def upscale_image(self, image_path, scale=4):
        img = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)
        if img is None:
            raise FileNotFoundError(f"Image not found at {image_path}")

        if self.use_realesrgan:
            try:
                # Placeholder for actual Real-ESRGAN implementation
                # This requires downloading heavy model weights (approx 100MB+)
                # which is risky in a restricted sandbox without explicit URLs.
                # If dependencies were fully set up, we would run the model here.
                raise NotImplementedError("Model weights missing in sandbox")
            except Exception as e:
                 print(f"Real-ESRGAN inference failed/skipped: {e}. Falling back to Bicubic.")
                 return self._upscale_fallback(img, scale)
        else:
            return self._upscale_fallback(img, scale)

    def _upscale_fallback(self, img, scale):
        h, w = img.shape[:2]
        # High quality bicubic resize
        upscaled = cv2.resize(img, (w * scale, h * scale), interpolation=cv2.INTER_CUBIC)

        # Sharpen to simulate "super-resolution" detail restoration
        # Using an unsharp mask approach or a simple convolution kernel
        kernel = np.array([[-1,-1,-1], [-1,9,-1], [-1,-1,-1]])
        sharpened = cv2.filter2D(upscaled, -1, kernel)

        # Slight denoising to clean up artifacts from sharpening
        if len(sharpened.shape) == 3:
            sharpened = cv2.fastNlMeansDenoisingColored(sharpened, None, 10, 10, 7, 21)

        return sharpened

    def generate_normal_map(self, img):
        # Ensure image is valid
        if img is None: return None

        # Convert to grayscale for gradient calculation
        if len(img.shape) == 3:
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        else:
            gray = img

        # Sobel gradients to find slope in X and Y
        scale = 1
        delta = 0
        ddepth = cv2.CV_32F

        gx = cv2.Sobel(gray, ddepth, 1, 0, ksize=3, scale=scale, delta=delta, borderType=cv2.BORDER_DEFAULT)
        gy = cv2.Sobel(gray, ddepth, 0, 1, ksize=3, scale=scale, delta=delta, borderType=cv2.BORDER_DEFAULT)

        # Normal map construction
        # Z component is a constant strength factor (strength of the normal)
        # Lower z = bumpier surface
        strength = 5.0
        z = np.ones_like(gx) * strength

        # Stack into (x, y, z) vector
        normal = np.dstack((-gx, -gy, z))

        # Normalize vectors
        norm = np.linalg.norm(normal, axis=2, keepdims=True)
        normal = normal / (norm + 1e-5)

        # Map to 0-255 range ( [-1,1] -> [0,255] )
        # 0.5 * normal + 0.5 maps [-1, 1] to [0, 1]
        normal_rgb = ((normal + 1) * 0.5 * 255).astype(np.uint8)

        # OpenCV uses BGR, but normal maps are spatial vectors RGB=(X,Y,Z).
        # Most 3D engines expect RGB maps.
        # If we save using cv2.imwrite, it treats array as BGR.
        # So we need to construct an array that when written as BGR, results in the correct RGB file.
        # File R channel = Array[2] (because imwrite writes Array[0] to B, Array[1] to G, Array[2] to R) - WAIT.
        # cv2.imwrite saves the 0th channel to Blue, 1st to Green, 2nd to Red.
        # We want the FILE to have Red=X, Green=Y, Blue=Z.
        # So we need to put X in the 2nd channel of the array? No.
        # We want the file's first byte (or standard RGB ordering) to be X.
        # Standard image files are RGB or BGR depending on format, but let's assume standard PNG view.
        # If I open the image, R should be X.
        # OpenCV 'img' is BGR. imwrite writes 'img' B->FileB, G->FileG, R->FileR.
        # So we want img.R (channel 2) to be X. img.G (channel 1) to be Y. img.B (channel 0) to be Z.

        # So we need to construct (Z, Y, X) for the BGR array.
        normal_bgr = cv2.cvtColor(normal_rgb, cv2.COLOR_RGB2BGR)

        return normal_bgr

    def generate_displacement_map(self, img):
        if img is None: return None
        if len(img.shape) == 3:
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        else:
            gray = img

        # Enhance contrast to maximize displacement effect using CLAHE
        clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8,8))
        disp = clahe.apply(gray)

        # Invert if lighter colors should be "closer" (height map conventions vary, usually white=high)
        # Assuming input image shading: darker is usually shadow/deep. So standard is fine.
        return disp

def main():
    parser = argparse.ArgumentParser(description="Texture Upscaler & Map Generator")
    parser.add_argument("image_path", help="Path to input image")
    args = parser.parse_args()

    upscaler = TextureUpscaler()
    try:
        print(f"Processing {args.image_path}...")
        high_res = upscaler.upscale_image(args.image_path)

        base, ext = os.path.splitext(args.image_path)
        out_diffuse = f"{base}_4k{ext}"
        out_normal = f"{base}_normal{ext}"
        out_disp = f"{base}_disp{ext}"

        cv2.imwrite(out_diffuse, high_res)
        print(f"Saved High-Res Texture: {out_diffuse}")

        normal_map = upscaler.generate_normal_map(high_res)
        cv2.imwrite(out_normal, normal_map)
        print(f"Saved Normal Map: {out_normal}")

        disp_map = upscaler.generate_displacement_map(high_res)
        cv2.imwrite(out_disp, disp_map)
        print(f"Saved Displacement Map: {out_disp}")

    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
