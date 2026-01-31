from playwright.sync_api import sync_playwright
import time
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the luxury fitting page directly
        url = "http://localhost:3000/luxury/fitting"
        print(f"Navigating to {url}...")
        page.goto(url)

        # Wait for the page to load
        print("Waiting for page load...")
        page.wait_for_timeout(5000)

        # Click the "AI Fitting" button (AI 피팅)
        # It has text "AI 피팅" inside.
        print("Looking for AI Fitting button...")
        try:
            # Try to find by text
            button = page.get_by_text("AI 피팅", exact=False)
            if button.count() > 0:
                print("Found button by text.")
                button.first.click()
            else:
                # Try finding by class or emoji
                print("Trying fallback selector...")
                page.click('button:has-text("✨")')
        except Exception as e:
            print(f"Error finding button: {e}")
            # Take screenshot for debugging
            os.makedirs("verification", exist_ok=True)
            page.screenshot(path="verification/error_button.png")
            raise e

        # Wait for modal
        print("Waiting for modal...")
        page.wait_for_timeout(2000)

        # Check for checkbox "Auto-Generate Cinematic Video"
        print("Checking for checkbox...")
        try:
            checkbox_label = page.get_by_text("Auto-Generate Cinematic Video", exact=False)
            if checkbox_label.is_visible():
                print("SUCCESS: Checkbox found.")
            else:
                print("FAILURE: Checkbox not visible.")
                exit(1)
        except Exception as e:
            print(f"Error checking checkbox: {e}")
            exit(1)

        # Take verification screenshot
        os.makedirs("verification", exist_ok=True)
        page.screenshot(path="verification/masterpiece_verified.png")
        print("Screenshot saved to verification/masterpiece_verified.png")

        browser.close()

if __name__ == "__main__":
    run()
