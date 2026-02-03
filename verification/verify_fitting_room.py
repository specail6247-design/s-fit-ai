from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000/verify-fitting-room")

        # Wait for "Hermes Collection" to appear
        try:
            page.wait_for_selector("text=Hermes Collection", timeout=10000)
            print("Found 'Hermes Collection'")
        except Exception as e:
            print("Failed to find 'Hermes Collection'")
            page.screenshot(path="verification/failed_load.png")
            raise e

        # Check for a Hermes item (e.g. Birkin 30 Bag)
        try:
            page.wait_for_selector("text=Birkin 30 Bag", timeout=5000)
            print("Found 'Birkin 30 Bag'")
        except Exception as e:
            print("Failed to find 'Birkin 30 Bag'")
            page.screenshot(path="verification/failed_item.png")
            raise e

        # Take screenshot
        page.screenshot(path="verification/fitting_room_hermes.png")
        print("Screenshot saved to verification/fitting_room_hermes.png")

if __name__ == "__main__":
    run()
