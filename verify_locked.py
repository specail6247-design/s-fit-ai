import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 375, 'height': 812})
        page = await context.new_page()

        await page.goto("http://localhost:3000/luxury")
        await page.wait_for_timeout(2000)

        # Click the right chevron for the brand selector to go to Gucci
        # The selector is usually a swiper or an arrow. Let's find "Gucci"
        # Since I can't click easily without seeing it, I'll evaluate JS to switch to item-2 if it's stored in state, or just click text "Gucci"

        await page.evaluate("() => { const btns = Array.from(document.querySelectorAll('button')); const gucciBtn = btns.find(b => b.textContent.includes('Gucci')); if (gucciBtn) gucciBtn.click(); }")

        await page.wait_for_timeout(2000)

        await page.screenshot(path="/home/jules/verification/luxury_gucci.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
