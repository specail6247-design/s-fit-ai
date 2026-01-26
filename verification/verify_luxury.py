import os
import time
from playwright.sync_api import sync_playwright

def verify_luxury_fitting():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Go to the temporary verification page
        print("Navigating to /verify-fitting...")
        try:
            page.goto("http://localhost:3000/verify-fitting", timeout=60000)
        except Exception as e:
            print(f"Navigation failed: {e}")
            return

        # Wait for the Fitting Room to load
        print("Waiting for page content...")
        try:
            page.wait_for_selector("text=Hermes", timeout=30000)
            print("Hermes brand text found.")
        except Exception as e:
            print(f"Could not find Hermes text: {e}")
            page.screenshot(path="verification/error_screenshot.png")
            return

        # Find an item card
        # The item cards have text like "$550" or "Hermes Silk Scarf"
        try:
            # Click the first Hermes item
            page.click("text=Hermes Silk Scarf")
            print("Clicked Hermes Silk Scarf.")

            # Wait a bit for selection state and shimmer to appear
            time.sleep(2)

            # Take screenshot
            if not os.path.exists("verification"):
                os.makedirs("verification")

            screenshot_path = "verification/luxury_verification.png"
            page.screenshot(path=screenshot_path)
            print(f"Screenshot saved to {screenshot_path}")

        except Exception as e:
            print(f"Interaction failed: {e}")
            page.screenshot(path="verification/error_interaction.png")

        browser.close()

if __name__ == "__main__":
    verify_luxury_fitting()
