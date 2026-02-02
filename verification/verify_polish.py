from playwright.sync_api import sync_playwright

def verify_polish():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto("http://localhost:3000", timeout=60000)
            page.wait_for_load_state("networkidle")

            # 1. Verify Fonts
            body_font = page.evaluate("window.getComputedStyle(document.body).fontFamily")
            print(f"Body Font: {body_font}")

            # 2. Verify Custom Cursor
            # Use a more specific selector if possible, or just the classes we used
            cursor = page.locator("div.fixed.top-0.left-0.w-8.h-8.pointer-events-none")
            if cursor.count() > 0:
                print("Custom cursor found.")
            else:
                print("Custom cursor NOT found.")

            page.screenshot(path="verification/polish_verification.png")
            print("Screenshot saved to verification/polish_verification.png")
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_polish()
