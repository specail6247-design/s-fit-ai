from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:3000")
    try:
        page.wait_for_selector("text=S_FIT NEO", timeout=5000)
    except:
        print("S_FIT NEO not found")

    page.screenshot(path="verification/debug_home.png")
    print("Screenshot taken")
    browser.close()
