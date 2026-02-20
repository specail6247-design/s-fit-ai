from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(viewport={'width': 1280, 'height': 800})
    page = context.new_page()
    page.set_default_timeout(60000)

    # 1. Verify Luxury Garment Detail
    print("Navigating to /luxury...")
    page.goto("http://localhost:3000/luxury", timeout=60000)

    # Wait for the page to load and animations to start
    # We look for "Metallic Silk" text which is staggered revealed
    try:
        page.wait_for_selector('text=Metallic Silk', timeout=10000)
        print("Luxury page loaded.")
    except Exception as e:
        print(f"Error waiting for Luxury page content: {e}")
        page.screenshot(path="verification/error_luxury.png")

    # Take screenshot of Luxury Page
    page.screenshot(path="verification/luxury_polish.png")
    print("Screenshot saved to verification/luxury_polish.png")

    # 2. Verify Real Life Fitting (Home)
    print("Navigating to / (Home)...")
    page.goto("http://localhost:3000/", timeout=60000)

    try:
        page.wait_for_selector('text=S_FIT', timeout=10000)
        print("Home page loaded.")
    except Exception as e:
        print(f"Error waiting for Home page content: {e}")
        page.screenshot(path="verification/error_home.png")

    # Take screenshot of Home Page
    page.screenshot(path="verification/home_polish.png")
    print("Screenshot saved to verification/home_polish.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
