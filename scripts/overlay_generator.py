import os
from PIL import Image, ImageDraw, ImageFont

def create_thumbnail(source_image_path, output_path, text="S_FIT AI"):
    try:
        img = Image.open(source_image_path).convert("RGBA")
        draw = ImageDraw.Draw(img)

        # Try to load a font, fallback to default
        try:
            # Try some common fonts
            font_names = ["Arial", "DejaVuSans", "FreeSans", "Verdana"]
            font = None
            for name in font_names:
                try:
                    font = ImageFont.truetype(f"{name}.ttf", 32)
                    break
                except:
                    continue
            if font is None:
                font = ImageFont.load_default()
        except:
            font = ImageFont.load_default()

        # Draw watermark
        w, h = img.size

        # Get text size
        try:
            bbox = draw.textbbox((0, 0), text, font=font)
            text_w = bbox[2] - bbox[0]
            text_h = bbox[3] - bbox[1]
        except AttributeError:
             # Older Pillow
             text_w, text_h = draw.textsize(text, font=font)

        margin = 20
        x = w - text_w - margin
        y = h - text_h - margin

        # Shadow
        draw.text((x+2, y+2), text, font=font, fill=(0,0,0,128))
        draw.text((x, y), text, font=font, fill=(255,255,255,200))

        img.save(output_path)
        print(f"Thumbnail saved to {output_path}")
        return True
    except Exception as e:
        print(f"Error creating thumbnail: {e}")
        return False

def generate_ffmpeg_filters(config):
    """
    Generate FFmpeg filter string for watermark and step indicators.
    """
    filters = []

    overlay_config = config.get('overlay', {})
    steps = config.get('steps', [])

    # 1. Watermark (Permanent)
    watermark_text = overlay_config.get('watermark_text', 'S_FIT AI')
    # Escape special characters for ffmpeg
    watermark_text = watermark_text.replace(":", "\\:").replace("'", "")

    # Position: bottom-right
    filters.append(f"drawtext=text='{watermark_text}':fontcolor=white@0.6:fontsize=24:x=w-tw-20:y=h-th-20")

    # 2. Step Indicators
    current_time = 0.0
    for step in steps:
        duration_ms = step.get('duration', 0)
        duration_s = duration_ms / 1000.0
        label = step.get('label', '')

        if label:
            label = label.replace(":", "\\:").replace("'", "")
            end_time = current_time + duration_s

            # Draw text centered at top
            # enable='between(t,start,end)'
            filter_str = (
                f"drawtext=text='{label}':"
                f"fontcolor=white:fontsize=32:"
                f"x=(w-text_w)/2:y=60:"
                f"box=1:boxcolor=black@0.5:boxborderw=10:"
                f"enable='between(t,{current_time},{end_time})'"
            )
            filters.append(filter_str)

        current_time += duration_s

    return ",".join(filters)
