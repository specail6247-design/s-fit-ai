from playwright.sync_api import sync_playwright

def verify_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to home page...")
            page.goto("http://localhost:3000")

            # Wait for content
            page.wait_for_selector("text=S_FIT NEO", timeout=60000)

            # Check for Footer Links
            print("Checking for Privacy link...")
            page.wait_for_selector("text=Privacy")
            print("Checking for Terms link...")
            page.wait_for_selector("text=Terms")
            print("Checking for Report Issue link...")
            page.wait_for_selector("text=Report Issue")

            # Check for Data Safety Badge
            print("Checking for Data Safety Badge...")
            page.wait_for_selector("text=Photos are processed securely")

            # Take screenshot of main UI
            page.screenshot(path="verification/home_ui.png")
            print("Screenshot saved to verification/home_ui.png")

            # Open Privacy Modal
            print("Opening Privacy Modal...")
            page.click("text=Privacy")
            page.wait_for_selector("text=Privacy Policy")
            page.wait_for_timeout(500) # Wait for animation
            page.screenshot(path="verification/privacy_modal.png")
            print("Screenshot saved to verification/privacy_modal.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_ui()
