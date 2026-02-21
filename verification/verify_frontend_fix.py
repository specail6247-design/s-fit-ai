from playwright.sync_api import sync_playwright

def test_luxury_mode(page):
    page.goto("http://localhost:3000/luxury")
    page.wait_for_selector("text=S_FIT AI")
    page.screenshot(path="/home/jules/verification/luxury_mode.png")
    print("Screenshot saved to /home/jules/verification/luxury_mode.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_luxury_mode(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
