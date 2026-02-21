from playwright.sync_api import sync_playwright

def test_shimmer_effect(page):
    # Go to the verification page
    page.goto("http://localhost:3000/verify-shimmer")

    # Wait for content to load
    page.wait_for_selector("text=Hermes Verify")

    # Wait a bit for shimmer animation to be captured (though static screenshot might not show motion well, it will show the overlay)
    page.wait_for_timeout(1000)

    # Take screenshot
    page.screenshot(path="/home/jules/verification/shimmer_verification.png")
    print("Screenshot saved to /home/jules/verification/shimmer_verification.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_shimmer_effect(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
