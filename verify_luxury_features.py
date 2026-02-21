
import asyncio
from playwright.async_api import async_playwright, expect

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={'width': 1280, 'height': 720})
        page = await context.new_page()

        print("Navigating to Luxury Fitting page...")
        try:
            await page.goto("http://localhost:3000/luxury/fitting", timeout=120000)
        except Exception as e:
            print(f"Navigation failed: {e}")
            await browser.close()
            return

        print("Waiting for page to load...")
        try:
            # Look for Masterpiece ON
            await expect(page.get_by_text("Masterpiece ON")).to_be_visible(timeout=60000)
            print("Page loaded.")
        except Exception as e:
            print(f"Timeout waiting for Masterpiece button: {e}")
            await page.screenshot(path="failed_load.png")

        # Check for Ambience button
        if await page.get_by_text("Ambience").count() > 0:
             print("Ambience button found.")
        else:
             print("Ambience button NOT found.")

        # Check for Vault button
        vault_btn = page.get_by_role("button", name="Vault")
        if await vault_btn.count() > 0:
            print("Vault button found.")
            try:
                await vault_btn.click(timeout=5000)
                print("Clicked Vault button.")
                await page.wait_for_timeout(2000) # Wait for animation
            except Exception as e:
                print(f"Failed to click Vault button: {e}")
        else:
            print("Vault button NOT found.")

        # Take screenshot
        screenshot_path = "verification_luxury.png"
        await page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
