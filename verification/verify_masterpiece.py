from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # Check /luxury
            print("Navigating to /luxury")
            page.goto("http://localhost:3000/luxury", timeout=60000)

            # Expect canvas (LuxuryImageDistortion)
            print("Waiting for canvas...")
            page.wait_for_selector("canvas", timeout=30000)

            # Expect 'Authentic Render' text (LuxuryGarmentDetail)
            print("Waiting for text...")
            page.wait_for_selector("text=Authentic Render")

            # Screenshot
            page.screenshot(path="/home/jules/verification/luxury_polish.png")
            print("Screenshot saved to /home/jules/verification/luxury_polish.png")
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
