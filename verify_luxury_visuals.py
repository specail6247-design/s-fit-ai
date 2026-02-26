
import asyncio
from playwright.async_api import async_playwright

async def verify_luxury_visuals():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Navigate to the luxury fitting page
        try:
            await page.goto("http://localhost:3000/luxury/fitting")
        except Exception as e:
            print(f"Error navigating: {e}")
            await browser.close()
            return

        # Wait for the page to load
        try:
            await page.wait_for_selector("text=THE LIQUID SILK BLAZER", timeout=10000)
            print("Found heading: THE LIQUID SILK BLAZER")
        except Exception as e:
            print(f"Error finding heading: {e}")
            await page.screenshot(path="error_heading.png")
            await browser.close()
            return

        # Take initial screenshot
        await page.screenshot(path="luxury_fitting_initial.png")
        print("Saved luxury_fitting_initial.png")

        # Click "Start Fitting"
        try:
            # Using text selector for the button
            await page.click("text=Start Fitting")
            print("Clicked 'Start Fitting'")

            # Wait a moment for the state to change and animation to start
            # The component sets isAnalyzing=true immediately.
            # The UI has exit animation duration 0.8s.
            await asyncio.sleep(1.5)

            # Take immersive screenshot
            await page.screenshot(path="luxury_fitting_immersive.png")
            print("Saved luxury_fitting_immersive.png")

        except Exception as e:
            print(f"Error clicking button or waiting: {e}")
            await page.screenshot(path="error_interaction.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_luxury_visuals())
