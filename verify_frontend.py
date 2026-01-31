import os
import time
from playwright.sync_api import sync_playwright, expect

def verify_masterpiece(page):
    print("Navigating to Landing Page...")
    page.goto("http://localhost:3000", timeout=60000)

    # 1. Verify Fonts & Landing
    page.wait_for_selector("body")
    print("Landing Page Loaded.")
    page.screenshot(path="/home/jules/verification/landing.png")

    # 2. Verify Custom Cursor Element Exists
    # The cursor is a fixed div at top-0 left-0
    cursor = page.locator("div.fixed.top-0.left-0.w-8.h-8.rounded-full.border")
    expect(cursor).to_be_attached()
    print("Custom cursor attached to DOM.")

    # 3. Verify Fitting Room & UI Fade
    print("Navigating to Luxury Fitting...")
    page.goto("http://localhost:3000/luxury/fitting", timeout=60000)

    # Wait for the fitting room controls to appear
    page.wait_for_selector("text=Masterpiece ON", timeout=30000)
    print("Fitting Room UI Loaded.")

    # Wait a bit for 3D canvas to potentially render (though headless mostly won't show WebGL perfectly)
    time.sleep(5)

    page.screenshot(path="/home/jules/verification/fitting_room.png")

if __name__ == "__main__":
    if not os.path.exists("/home/jules/verification"):
        os.makedirs("/home/jules/verification")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_masterpiece(page)
            print("Verification script completed.")
        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="/home/jules/verification/error.png")
        finally:
            browser.close()
