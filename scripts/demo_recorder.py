import asyncio
import json
import os
from playwright.async_api import async_playwright

async def run():
    # Load config
    config_path = os.path.join(os.path.dirname(__file__), 'demo_config.json')
    with open(config_path, 'r') as f:
        config = json.load(f)

    output_dir = config['output_dir']
    os.makedirs(output_dir, exist_ok=True)

    async with async_playwright() as p:
        print("Launching browser...")
        browser = await p.chromium.launch(headless=True, args=['--use-gl=egl'])
        context = await browser.new_context(
            viewport=config['viewport'],
            record_video_dir=output_dir,
            record_video_size=config['recording'],
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1"
        )

        page = await context.new_page()

        # 1. Landing
        print("Step 1: Landing")
        try:
            await page.goto(config['url'], timeout=60000)
        except Exception as e:
            print(f"Error navigating to {config['url']}: {e}")
            await context.close()
            await browser.close()
            return

        await page.wait_for_timeout(config['steps'][0]['duration'])

        # 1.5. Select Wear Tab (if not already)
        print("Step 1.5: Select Wear Tab")
        try:
            # Codebase uses "Try-On", Requirements said "Wear" (likely translation)
            await page.click('text="Try-On"', timeout=3000)
            await page.wait_for_timeout(1000)
        except Exception as e:
            print(f"Wear tab selection info: {e} (might be already active or different text)")

        # 2. Mode Selection
        print("Step 2: Mode Selection")
        try:
            # Click "EASY FIT"
            await page.click('text="EASY FIT"', timeout=5000)
            await page.wait_for_timeout(500)
            # Click Continue
            await page.click('button:has-text("Continue →")', timeout=5000)
            await page.wait_for_timeout(config['steps'][1]['duration'])
        except Exception as e:
            print(f"Error in Mode Selection: {e}")

        # 3. Measurements
        print("Step 3: Measurements")
        try:
            # Set Height to 175
            await page.locator('input[type="range"]').first.fill("175")
            # Set Weight to 70 (second slider)
            await page.locator('input[type="range"]').nth(1).fill("70")

            await page.wait_for_timeout(1000)

            # Click Continue to Fitting Room
            await page.click('button:has-text("Continue to Fitting Room →")', timeout=5000)
            await page.wait_for_timeout(config['steps'][2]['duration'])
        except Exception as e:
            print(f"Error in Measurements: {e}")

        # 4. Brand Selection
        print("Step 4: Brand Selection")
        try:
            # Select ZARA.
            await page.click('text="ZARA"', timeout=5000)
            await page.wait_for_timeout(500)
            # Click Enter Fitting Room
            await page.click('button:has-text("Enter Fitting Room →")', timeout=5000)
            await page.wait_for_timeout(config['steps'][3]['duration'])
        except Exception as e:
            print(f"Error in Brand Selection: {e}")

        # 5. Fitting Room
        print("Step 5: Fitting Room")
        try:
            # Wait for canvas or 2D fallback
            await page.wait_for_selector('canvas, .absolute.inset-0', timeout=30000)
            await page.wait_for_timeout(config['steps'][4]['duration'])
        except Exception as e:
            print(f"Error waiting for Fitting Room: {e}")

        # 6. AR Result (Click Item)
        print("Step 6: Select Item")
        try:
            # Wait for items to load
            await page.wait_for_selector('button:has-text("$")', timeout=10000)

            # Click the 2nd item available if possible, else first
            items = page.locator('button:has-text("$")')
            count = await items.count()
            if count > 1:
                await items.nth(1).click()
            elif count > 0:
                await items.first.click()
            else:
                print("No items found to click")

            await page.wait_for_timeout(config['steps'][5]['duration'])
        except Exception as e:
            print(f"Error selecting item: {e}")

        # 7. Fit Analysis
        print("Step 7: Fit Analysis")
        try:
            # Click "Compare" button
            # Look for button with text "Compare"
            # Since it might be hidden in mini bar or separate, try generic search
            compare_btn = page.get_by_text("Compare", exact=True)
            if await compare_btn.count() > 0 and await compare_btn.is_visible():
                await compare_btn.click()
            else:
                 # Try finding via button selector
                 await page.click('button:has-text("Compare")', timeout=3000)
        except Exception as e:
            print(f"Could not click Compare button: {e}")

        await page.wait_for_timeout(config['steps'][6]['duration'])

        await context.close()
        await browser.close()

        # Rename video and convert to MP4
        files = [f for f in os.listdir(output_dir) if f.endswith('.webm')]
        if files:
            # Sort by time
            files.sort(key=lambda x: os.path.getmtime(os.path.join(output_dir, x)))
            latest = files[-1]
            temp_webm = os.path.join(output_dir, 'temp_recording.webm')

            if os.path.exists(temp_webm):
                os.remove(temp_webm)

            os.rename(os.path.join(output_dir, latest), temp_webm)

            target_name = config['recording']['filename']
            target_path = os.path.join(output_dir, target_name)

            if os.path.exists(target_path):
                os.remove(target_path)

            print(f"Converting {temp_webm} to {target_path}...")
            import subprocess
            try:
                subprocess.run([
                    'ffmpeg', '-i', temp_webm,
                    '-c:v', 'libx264', '-crf', '23', '-preset', 'fast',
                    '-y', target_path
                ], check=True)
                os.remove(temp_webm)
                print(f"Recording saved to {target_path}")
            except subprocess.CalledProcessError as e:
                print(f"Error converting video: {e}")
        else:
            print("No recording found.")

if __name__ == "__main__":
    asyncio.run(run())
