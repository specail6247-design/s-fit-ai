from playwright.sync_api import sync_playwright
import time

def verify_luxury_fitting():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        print("Navigating to luxury fitting page...")
        try:
            page.goto("http://localhost:3000/luxury/fitting", timeout=60000)
        except Exception as e:
            print(f"Navigation failed: {e}")
            return

        # Wait for key elements to ensure page loaded
        try:
            print("Waiting for 'Live Fitting' text...")
            page.wait_for_selector("text=Live Fitting", timeout=30000)

            print("Waiting for 'Collection' text...")
            page.wait_for_selector("text=Collection", timeout=10000)

            print("Waiting for product items...")
            page.wait_for_selector("text=Aura Blazer", timeout=10000)

            # Hover over the first item to trigger effects
            print("Hovering over 'Aura Blazer'...")
            page.hover("text=Aura Blazer")
            time.sleep(2) # Wait for hover effect

            # Click the second item to test selection
            print("Clicking 'Silk Gown'...")
            page.click("text=Silk Gown")
            time.sleep(2) # Wait for transition

            # Screenshot
            print("Taking screenshot...")
            page.screenshot(path="verification_luxury_fitting.png")
            print("Screenshot saved to verification_luxury_fitting.png")

        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification_error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_luxury_fitting()
