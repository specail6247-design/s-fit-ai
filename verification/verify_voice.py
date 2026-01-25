from playwright.sync_api import sync_playwright, expect
import time

def test_voice_ui(page):
    print("Navigating to /verify-voice...")
    page.goto("http://localhost:3000/verify-voice")

    print("Waiting for page load...")
    # Wait for the canvas or some element from FittingRoom
    page.wait_for_selector("canvas", timeout=30000)

    print("Checking for Voice Concierge UI...")
    # The mute button should be visible
    # It might take a moment to mount
    mute_btn = page.locator("button:has-text('🎙️')")
    mute_btn.wait_for(state="visible", timeout=10000)

    print("Found mute button. Taking screenshot...")
    page.screenshot(path="verification/voice_ui.png")
    print("Screenshot saved.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_voice_ui(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()
