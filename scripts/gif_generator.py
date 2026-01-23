import os
import json
import subprocess
import sys

# Ensure we can import overlay_generator
sys.path.append(os.path.dirname(__file__))
import overlay_generator

def run():
    # Load config
    config_path = os.path.join(os.path.dirname(__file__), 'demo_config.json')
    with open(config_path, 'r') as f:
        config = json.load(f)

    output_dir = config['output_dir']
    input_filename = config['recording']['filename'] # raw_recording.mp4
    input_path = os.path.join(output_dir, input_filename)

    if not os.path.exists(input_path):
        print(f"Input file not found: {input_path}")
        return

    print(f"Processing {input_path}...")

    # 1. Generate Filters
    base_filters = overlay_generator.generate_ffmpeg_filters(config)
    print(f"Applying filters: {base_filters}")

    # 2. Extract Thumbnail (first frame)
    thumb_raw = os.path.join(output_dir, "thumb_raw.png")
    thumb_final = os.path.join(output_dir, "demo_thumbnail.png")

    try:
        subprocess.run([
            'ffmpeg', '-i', input_path, '-vframes', '1', '-y', thumb_raw
        ], check=True, stderr=subprocess.DEVNULL)

        # Apply overlay to thumbnail
        overlay_generator.create_thumbnail(thumb_raw, thumb_final, text="S_FIT AI Demo")
        if os.path.exists(thumb_raw):
            os.remove(thumb_raw)
    except Exception as e:
        print(f"Error generating thumbnail: {e}")

    # 3. Generate GIFs
    # We target 15 fps for balance between smoothness and size
    fps = 15

    targets = [
        {"name": "demo_full.gif", "width": 1280},
        {"name": "demo_small.gif", "width": 640}
    ]

    palette = os.path.join(output_dir, "palette.png")

    for target in targets:
        output_gif = os.path.join(output_dir, target["name"])
        width = target["width"]
        print(f"Generating {output_gif} ({width}px width)...")

        # Scale and FPS filters
        # flags=lanczos for better scaling
        # split [a][b]; [a] palettegen [p]; [b][p] paletteuse
        # We can do it in one command using filter_complex, but separate passes are sometimes more reliable for palette

        filter_str = f"{base_filters},fps={fps},scale={width}:-1:flags=lanczos"

        try:
            # Pass 1: Palette
            subprocess.run([
                'ffmpeg', '-i', input_path, '-vf', f"{filter_str},palettegen", '-y', palette
            ], check=True, stderr=subprocess.DEVNULL)

            # Pass 2: GIF
            subprocess.run([
                'ffmpeg', '-i', input_path, '-i', palette,
                '-lavfi', f"{filter_str} [x]; [x][1:v] paletteuse=dither=bayer:bayer_scale=5",
                '-y', output_gif
            ], check=True, stderr=subprocess.DEVNULL)

            # Optimization check
            size_mb = os.path.getsize(output_gif) / (1024 * 1024)
            print(f"Generated {target['name']}: {size_mb:.2f} MB")

            if size_mb > 5 and width < 1000:
                print("Optimizing with ImageMagick...")
                try:
                    subprocess.run(['convert', output_gif, '-layers', 'Optimize', output_gif], check=True)
                    new_size_mb = os.path.getsize(output_gif) / (1024 * 1024)
                    print(f"Optimized to: {new_size_mb:.2f} MB")
                except FileNotFoundError:
                    print("ImageMagick 'convert' not found, skipping optimization.")
                except Exception as e:
                    print(f"Optimization failed: {e}")

        except Exception as e:
            print(f"Error generating {output_gif}: {e}")

    if os.path.exists(palette):
        os.remove(palette)

    print("GIF generation complete.")

if __name__ == "__main__":
    run()
