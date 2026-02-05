
import os
from playwright.sync_api import sync_playwright, expect

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Verify Masterpiece Page
        print("Navigating to masterpiece page...")
        # Note: In a real scenario, we might need to wait for the server to be ready.
        # Assuming server is already running on port 3000.
        page.goto("http://localhost:3000/masterpiece")

        # Wait for "Masterpiece ON" button
        print("Waiting for FittingRoom UI...")
        try:
            # Use a longer timeout as compilation might take time
            masterpiece_btn = page.get_by_role("button", name="Masterpiece ON")
            expect(masterpiece_btn).to_be_visible(timeout=60000) # Increased timeout for initial compile
            print("Verified 'Masterpiece ON' button is visible.")

            # Verify AI Picks presence
            ai_picks = page.get_by_text("AI Picks", exact=False).first
            expect(ai_picks).to_be_visible()
            print("Verified 'AI Picks' section is visible.")

        except Exception as e:
            print(f"Failed verification: {e}")

        # Take screenshot of the masterpiece page
        os.makedirs("/home/jules/verification", exist_ok=True)
        page.screenshot(path="/home/jules/verification/masterpiece_page.png", full_page=True)
        print("Masterpiece page screenshot captured.")

        browser.close()

if __name__ == "__main__":
    run_verification()
