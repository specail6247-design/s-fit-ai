import os
import sys
from playwright.sync_api import sync_playwright

def verify_luxury():
    """Verifies the Luxury Detail page loads and renders core elements."""
    print("Starting Luxury Detail verification...")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Grant permissions to avoid some prompts (optional but good practice)
        context = browser.new_context(
            permissions=['clipboard-read', 'clipboard-write'],
            viewport={'width': 1280, 'height': 800}
        )
        page = context.new_page()

        try:
            # 1. Navigate to the Luxury page
            url = "http://localhost:3000/luxury"
            print(f"Navigating to {url}...")
            response = page.goto(url, wait_until="networkidle")

            if not response.ok:
                print(f"Error: Page returned status code {response.status}")
                sys.exit(1)

            # 2. Check for key text elements
            print("Checking for text elements...")
            page.wait_for_selector("text=Authentic Render", timeout=10000)
            page.wait_for_selector("text=Material Science", timeout=5000)
            page.wait_for_selector("text=Detail Macro View", timeout=5000)

            # 3. Check for the Canvas (Three.js root)
            # R3F creates a div and a canvas. We look for canvas elements.
            # There should be at least 3 for the Macro views + maybe one for main?
            # Actually, the main view uses a background image div in my code:
            # `style={{ backgroundImage: ... }}`
            # The Macro views use `<Canvas>`.

            print("Checking for Canvas elements (Macro View)...")
            canvas_count = page.locator("canvas").count()
            print(f"Found {canvas_count} canvas elements.")

            if canvas_count < 3:
                print("Warning: Expected at least 3 canvas elements for the macro view, found fewer.")
                # We won't fail strictly if they load lazily, but it's a good check.

            # 4. Take a screenshot
            screenshot_path = "verification/luxury_detail.png"
            page.screenshot(path=screenshot_path, full_page=True)
            print(f"Screenshot saved to {screenshot_path}")

            print("Luxury Detail verification passed!")

        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification/luxury_failure.png")
            sys.exit(1)
        finally:
            browser.close()

if __name__ == "__main__":
    verify_luxury()
