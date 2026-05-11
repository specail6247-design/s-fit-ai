import asyncio
from playwright.async_api import async_playwright
import os

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        await page.goto("http://localhost:3000/")

        await page.wait_for_selector('text="Member Access"', timeout=5000, state="hidden")

        # Test Auth Modal
        print("clicking LOGIN")
        await page.evaluate("document.querySelector('button').click()")
        print("waiting for selector")

        await page.wait_for_timeout(2000)

        os.makedirs("verification/screenshots", exist_ok=True)
        await page.screenshot(path="verification/screenshots/auth_modal.png")
        print("Auth screenshot taken")

        await browser.close()

asyncio.run(run())
