import asyncio
from playwright.async_api import async_playwright
import os

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        await page.goto("http://localhost:3000/")

        await page.wait_for_selector('button[aria-label="Support"]', timeout=5000)

        os.makedirs("verification/screenshots", exist_ok=True)
        await page.screenshot(path="verification/screenshots/home2.png")
        print("Home screenshot taken before click")

        # Evaluate click since we are struggling to click it
        await page.evaluate("document.querySelector('button[aria-label=\"Support\"]').click()")
        print("waiting for selector")

        await page.wait_for_timeout(2000)

        await page.screenshot(path="verification/screenshots/support_hub.png")
        print("Support Hub screenshot taken")

        await browser.close()

asyncio.run(run())
