import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        # Use mobile device emulation (iPhone 12)
        device = p.devices['iPhone 12']
        browser = await p.chromium.launch()
        context = await browser.new_context(**device)
        page = await context.new_page()

        try:
            # Navigate to Home
            await page.goto("http://localhost:3000")
            print("Navigated to Home Page")

            # Check for visibility
            await page.wait_for_selector("text='VIBE CHECK'", timeout=5000)
            print("VIBE CHECK visible")

            await page.wait_for_selector("text='DIGITAL TWIN'", timeout=5000)
            print("DIGITAL TWIN visible")

            await page.wait_for_selector("text='EASY FIT'", timeout=5000)
            print("EASY FIT visible")

            # Take a screenshot
            await page.screenshot(path="verification/home_mobile.png", full_page=True)
            print("Screenshot saved to verification/home_mobile.png")

        except Exception as e:
            print(f"Error: {e}")
            await page.screenshot(path="verification/home_mobile_error.png", full_page=True)

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
