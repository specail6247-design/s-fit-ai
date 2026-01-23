import os
from PIL import Image, ImageDraw, ImageFont

def create_placeholder(path, width, height, title, subtitle=None, bg_color=(20, 20, 20), text_color=(255, 255, 255)):
    image = Image.new('RGB', (width, height), bg_color)
    draw = ImageDraw.Draw(image)

    # Try to load a nicer font, fallback to default
    try:
        # Attempt to use a standard font often found in linux environments
        font_title = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 40)
        font_sub = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 24)
    except IOError:
        font_title = ImageFont.load_default()
        font_sub = ImageFont.load_default()

    # Draw Title
    # Using simple positioning for robustness
    draw.text((50, 50), title, font=font_title, fill=text_color)

    if subtitle:
        draw.text((50, 120), subtitle, font=font_sub, fill=(200, 200, 200))

    # Draw branding corner
    draw.text((width - 150, height - 50), "S_FIT AI", font=font_sub, fill=(0, 255, 0))

    # Ensure directory exists
    os.makedirs(os.path.dirname(path), exist_ok=True)

    image.save(path)
    print(f"Generated: {path}")

def main():
    # 1. Gallery Images (1270x760px)
    gallery_assets = [
        ("public/product-hunt/ph_gallery_1_hero.png", "Hero Shot", "Landing Page with Tagline: AI Virtual Fitting Room"),
        ("public/product-hunt/ph_gallery_2_mode.png", "Mode Selection", "3 Fitting Modes: Vibe Check, Digital Twin, Easy Fit"),
        ("public/product-hunt/ph_gallery_3_brand.png", "Brand Selection", "Brand Carousel with 8 Supported Brands"),
        ("public/product-hunt/ph_gallery_4_analysis.png", "AI Body Analysis", "MediaPipe Pose Landmarks Overlay"),
        ("public/product-hunt/ph_gallery_5_tryon.png", "Virtual Try-On", "Clothing Overlay on Avatar"),
        ("public/product-hunt/ph_gallery_6_fit.png", "Fit Analysis", "Fit Percentage and Size Recommendation"),
    ]

    for path, title, subtitle in gallery_assets:
        create_placeholder(path, 1270, 760, title, subtitle)

    # 2. Social Media Kit
    social_assets = [
        ("public/product-hunt/social_twitter.png", 1200, 675, "Twitter/X Post", "Launch Announcement"),
        ("public/product-hunt/social_linkedin.png", 1200, 627, "LinkedIn Post", "Professional Launch Post"),
        ("public/product-hunt/social_instagram_story.png", 1080, 1920, "Instagram Story", "Vertical Launch Story"),
    ]

    for path, w, h, title, subtitle in social_assets:
        create_placeholder(path, w, h, title, subtitle)

    # 3. Press Kit
    press_assets = [
        ("public/press/press_logo.png", 500, 500, "S_FIT AI Logo", "Press Kit Asset"),
        ("public/press/founder_photo.png", 400, 400, "Founder Photo", "Jules - Maker"),
    ]

    for path, w, h, title, subtitle in press_assets:
        create_placeholder(path, w, h, title, subtitle)

if __name__ == "__main__":
    main()
