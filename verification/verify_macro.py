from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to luxury fitting page...")
            page.goto("http://localhost:3000/luxury/fitting")

            # Wait for the page to load
            # The page might take a while to compile
            page.wait_for_selector("button:has-text('Macro View')", timeout=120000)

            print("Page loaded. Taking initial screenshot...")
            page.screenshot(path="verification/initial.png")

            # Click Macro View button
            print("Clicking Macro View...")
            page.click("button:has-text('Macro View')")

            # Wait a bit for transition
            time.sleep(2)

            print("Taking macro screenshot...")
            page.screenshot(path="verification/macro_view.png")

            print("Done.")
        except Exception as e:
            print(f"Error: {e}")
            try:
                page.screenshot(path="verification/error.png")
            except:
                pass
        finally:
            browser.close()

if __name__ == "__main__":
    run()
