from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 450, 'height': 800})

    try:
        page.goto("http://localhost:3000")
        page.wait_for_timeout(5000)
        page.screenshot(path="verification/landing_debug.png")
        print("Landing page screenshot saved.")

        # Print content to see what's there
        print(page.content())

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
