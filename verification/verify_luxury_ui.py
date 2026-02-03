from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, args=['--use-gl=egl']) # Try to force GPU support if possible, though headless is tricky
        context = browser.new_context(viewport={'width': 1920, 'height': 1080})
        page = context.new_page()

        # Log console messages
        page.on("console", lambda msg: print(f"CONSOLE: {msg.text}"))
        page.on("pageerror", lambda exc: print(f"PAGE ERROR: {exc}"))

        print("Navigating to luxury fitting page...")
        page.goto("http://localhost:3001/luxury/fitting")

        # Wait for the main container to fade in
        print("Waiting for content...")
        try:
            # Wait for "S_FIT LUXE" to be visible (opacity > 0)
            page.wait_for_selector("text=S_FIT LUXE", state="visible", timeout=10000)
            print("Found Header.")

            # Wait for price to appear (it has a delayed animation)
            page.wait_for_selector("text=$2,400", state="visible", timeout=10000)
            print("Found Price.")

            # Additional sleep to let transitions finish (1s fade + 1.1s delay etc)
            print("Waiting for transitions to complete...")
            time.sleep(3)

        except Exception as e:
            print(f"Error waiting for elements: {e}")
            page.screenshot(path="verification/luxury_ui_error.png")
            browser.close()
            return

        print("Taking screenshot...")
        page.screenshot(path="verification/luxury_ui.png", full_page=True)
        print("Screenshot saved to verification/luxury_ui.png")

        browser.close()

if __name__ == "__main__":
    run()
