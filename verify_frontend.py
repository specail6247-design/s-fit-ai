from playwright.sync_api import sync_playwright

def verify_fitting_room():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print("Navigating to home...")
        try:
            page.goto("http://localhost:3000", timeout=60000)

            print("Waiting for Masterpiece button...")
            # Default is true, so "Masterpiece ON"
            # Text might be "✨ Masterpiece ON"
            page.wait_for_selector('button:has-text("Masterpiece ON")', timeout=30000)

            print("Fitting room loaded. Taking screenshot.")
            page.screenshot(path="verification.png")
            print("Screenshot saved to verification.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_fitting_room()
