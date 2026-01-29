import time
from playwright.sync_api import sync_playwright

def verify_fitting_room():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print("Navigating to Fitting Room...")
        try:
            page.goto("http://localhost:3000/luxury/fitting", timeout=60000)
        except Exception as e:
            print(f"Navigation failed: {e}")
            browser.close()
            return

        # Wait for loading to finish
        print("Waiting for loading to finish...")
        try:
            # Wait for the spinner to disappear or the controls to appear
            page.wait_for_selector("text=Loading Fitting Room...", state="detached", timeout=30000)
        except Exception as e:
            print("Loading spinner did not disappear or timed out.")
            page.screenshot(path="verification_loading_timeout.png")
            # Continue anyway to see what's there

        print("Checking for UI elements...")

        # Check for Masterpiece button
        masterpiece_btn = page.query_selector("text=Masterpiece")
        if masterpiece_btn:
            print("SUCCESS: Masterpiece button found.")
        else:
            print("FAILURE: Masterpiece button NOT found.")

        # Check for Macro View button
        macro_btn = page.query_selector("text=Macro View")
        if macro_btn:
            print("SUCCESS: Macro View button found.")
        else:
            print("FAILURE: Macro View button NOT found.")

        # Check for Heatmap button
        heatmap_btn = page.query_selector("text=Fit Heatmap")
        if heatmap_btn:
            print("SUCCESS: Fit Heatmap button found.")
        else:
            print("FAILURE: Fit Heatmap button NOT found.")

        # Take screenshot
        page.screenshot(path="verification_fitting_room_fixed.png")
        print("Screenshot saved to verification_fitting_room_fixed.png")

        browser.close()

if __name__ == "__main__":
    verify_fitting_room()
