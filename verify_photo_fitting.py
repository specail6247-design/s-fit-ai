import asyncio
from playwright.async_api import async_playwright
import os
import sys

async def main():
    print("Starting photo fitting visual verification...")
    # Use standard Next.js port or fallback to 3000
    url = "http://localhost:3000/luxury/fitting"

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()

        try:
            print(f"Navigating to {url}...")
            await page.goto(url, wait_until="networkidle", timeout=60000)

            # Wait for any component to render to ensure page load
            await page.wait_for_selector('button', timeout=10000)
            print("Page loaded.")

            # Since audio requires user interaction to start context, the button might initially show unmute or mute
            # We just want to capture the header UI showing the audio control

            await page.screenshot(path="photo_fitting_initial.png", full_page=True)
            print("Saved photo_fitting_initial.png")

            # Find the mute/unmute button (assuming it has standard title/aria-label or we can find it by icon text)
            # The button renders "volume_off" initially.
            audio_btn = page.locator("button", has_text="volume_off")

            if await audio_btn.count() > 0:
                print("Found audio mute button. Clicking it to enable audio...")
                await audio_btn.first.click()
                await page.wait_for_timeout(1000)
                await page.screenshot(path="photo_fitting_audio_on.png", full_page=True)
                print("Saved photo_fitting_audio_on.png")
            else:
                print("Could not find volume_off button. Checking for volume_up...")
                audio_btn = page.locator("button", has_text="volume_up")
                if await audio_btn.count() > 0:
                    print("Found volume_up button. Audio already enabled?")

        except Exception as e:
            print(f"Error during verification: {e}")
            sys.exit(1)

        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
