from playwright.sync_api import sync_playwright, expect
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        try:
            print("Navigating to home page...")
            page.goto("http://localhost:3000")

            # Wait for content to load
            print("Waiting for page load...")
            # Wait a bit for animations
            time.sleep(5)

            # Take screenshot of Home Page
            print("Taking home screenshot...")
            page.screenshot(path="verification/home_masterpiece.png")

            # Check for Custom Cursor element existence
            # The class might be slightly different depending on compilation but we check based on what we wrote
            # border-border-[#ecab13] might be compiled to a tailwind class

            # We can check for the text "S_FIT AI"
            heading = page.get_by_text("S_FIT AI").first
            if heading.is_visible():
                print("Heading visible")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
