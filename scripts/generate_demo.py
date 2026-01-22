#!/usr/bin/env python3
"""
S_FIT AI Cinematic Demo Generator
Captures a hyper-realistic 360-degree video of the fitting room.

Usage:
    python scripts/generate_demo.py
"""

import asyncio
import os
from pathlib import Path

try:
    from playwright.async_api import async_playwright
except ImportError:
    print("Please install playwright: pip install playwright && playwright install")
    exit(1)

OUTPUT_DIR = Path("public/demo")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

async def generate_demo():
    print("🎬 Starting Cinematic Demo Capture...")

    async with async_playwright() as p:
        # Launch browser with high-quality settings
        browser = await p.chromium.launch(
            headless=True, # Set to False to watch it live
            args=['--use-gl=egl'] # Ensure GPU acceleration if available
        )

        # 4K-ish resolution for high quality
        context = await browser.new_context(
            viewport={"width": 1920, "height": 1080},
            record_video_dir=str(OUTPUT_DIR),
            record_video_size={"width": 1920, "height": 1080}
        )

        page = await context.new_page()

        # Navigate to the app (assuming it's running)
        # In a CI/CD pipeline, we'd start the server here.
        # For this script, we assume localhost:3000 is active.
        url = "http://localhost:3000"
        print(f"   🌐 Navigating to {url}...")

        try:
            await page.goto(url, timeout=60000, wait_until="networkidle")

            # Click "Enter Fitting Room" or navigate directly if possible
            # Assuming main page has a button or we go to /fitting-room if it exists
            # Based on file structure, it seems to be on the main page (app/page.tsx)

            # Wait for canvas to be ready
            print("   ⏳ Waiting for 3D Scene to load...")
            await page.wait_for_selector("canvas", timeout=30000)

            # Allow time for the auto-rotate to spin the model
            # The OrbitControls in FittingRoom.tsx have autoRotate={true}
            print("   🎥 Recording 360° rotation (20 seconds)...")
            await page.wait_for_timeout(20000)

            # Take a high-res screenshot as cover
            await page.screenshot(path=str(OUTPUT_DIR / "cover_shot.png"), full_page=False)
            print("   📸 Cover shot saved.")

        except Exception as e:
            print(f"   ❌ Error capturing demo: {e}")
            print("      (Make sure 'npm run dev' is running on localhost:3000)")

        finally:
            await context.close()
            await browser.close()

    # Rename video file
    # Playwright saves with random name, we'll rename the latest one
    files = list(OUTPUT_DIR.glob("*.webm"))
    if files:
        latest_video = max(files, key=os.path.getctime)
        new_name = OUTPUT_DIR / "s_fit_cinematic_launch.webm"
        latest_video.rename(new_name)
        print(f"\n✨ Demo Video Ready: {new_name}")
    else:
        print("\n⚠️ No video generated (did the browser crash or fail to record?)")

if __name__ == "__main__":
    asyncio.run(generate_demo())
