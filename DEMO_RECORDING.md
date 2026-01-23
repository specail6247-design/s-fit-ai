# S_FIT AI Demo Recording System

This directory contains the automated system for generating Product Hunt demo assets.

## Files

- `scripts/demo_config.json`: Configuration for recording steps, viewport, and overlays.
- `scripts/demo_recorder.py`: Playwright script to record the user flow.
- `scripts/gif_generator.py`: Generates GIFs from the recording using FFmpeg.
- `scripts/overlay_generator.py`: Helper for text overlays and thumbnails.

## Usage

1. **Start the App**
   Ensure the Next.js app is running on http://localhost:3000.
   ```bash
   npm run dev
   ```

2. **Record Demo**
   Run the recorder to capture the user flow.
   ```bash
   python scripts/demo_recorder.py
   ```
   This will generate `public/demo/raw_recording.mp4`.

3. **Generate GIFs**
   Convert the recording to optimized GIFs and thumbnail.
   ```bash
   python scripts/gif_generator.py
   ```
   Outputs in `public/demo/`:
   - `demo_full.gif` (HD)
   - `demo_small.gif` (Optimized)
   - `demo_thumbnail.png`

## Requirements

- Python 3.x
- Playwright (`pip install playwright && playwright install chromium`)
- Pillow (`pip install Pillow`)
- FFmpeg (System dependency)
