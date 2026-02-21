from playwright.sync_api import sync_playwright

def test_page_load(page):
    # Navigate to the page that was modified
    page.goto("http://localhost:3000/simple-test")
    # Take a screenshot to inspect the structure
    page.screenshot(path="/home/jules/verification/simple_tryon_final_check.png")
    print("Screenshot saved to /home/jules/verification/simple_tryon_final_check.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_page_load(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
