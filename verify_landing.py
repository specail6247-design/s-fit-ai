import time
from playwright.sync_api import sync_playwright, expect

def verify_landing():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to localhost:3000...")
            for i in range(10):
                try:
                    page.goto("http://localhost:3000", timeout=5000)
                    break
                except Exception:
                    print(f"Waiting for server... {i+1}")
                    time.sleep(2)

            page.wait_for_selector("body")

            # Simulate mouse move to make cursor visible
            print("Moving mouse to (100, 100)...")
            page.mouse.move(100, 100)
            time.sleep(1) # Wait for React state update

            # Check for custom cursor elements
            # Look for the div with the border (the ring)
            # The classes might be slightly different depending on compilation, but let's try broadly
            cursor = page.locator("div").filter(has_text="").filter(has_not_text=".").first
            # That's too broad.
            # Let's search by style or class fragments if exact class match fails
            # We used: fixed top-0 left-0 w-8 h-8 rounded-full border border-[#C9B037]

            # Try to find by specific class combo
            cursor_ring = page.locator("div.fixed.w-8.h-8.rounded-full.border")

            count = cursor_ring.count()
            print(f"Found cursor elements: {count}")

            if count > 0:
                print("Custom cursor element found.")
                # Verify visibility
                if cursor_ring.first.is_visible():
                     print("Cursor is visible.")
                else:
                     print("Cursor is NOT visible (hidden).")
            else:
                print("Custom cursor element NOT found. Dumping body classes...")
                print(page.eval_on_selector("body", "el => el.className"))

            # Take screenshot
            page.screenshot(path="verification_landing.png")
            print("Screenshot taken.")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_landing()
