from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to luxury page...")
            page.goto("http://localhost:3000/luxury", timeout=30000)

            # Wait for content to load
            print("Waiting for heading...")
            page.wait_for_selector("h1", timeout=10000)

            # Check the font class
            h1 = page.locator("h1")
            class_attr = h1.get_attribute("class")
            print(f"H1 class: {class_attr}")

            if "font-display" in class_attr:
                print("SUCCESS: 'font-display' class found on H1.")
            else:
                print("FAILURE: 'font-display' class NOT found on H1.")

            # Take a screenshot
            screenshot_path = "verification/luxury_font_fix.png"
            page.screenshot(path=screenshot_path)
            print(f"Screenshot saved to {screenshot_path}")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
