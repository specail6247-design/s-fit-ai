from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        print("Navigating to Luxury Fitting page...")
        try:
            page.goto("http://localhost:3000/luxury/fitting", timeout=30000)
        except Exception as e:
            print(f"Navigation failed: {e}")
            return

        # Wait for title
        print("Waiting for title...")
        try:
            page.wait_for_selector("text=S_FIT LUXE", timeout=15000)
        except Exception as e:
            print(f"Title not found: {e}")
            page.screenshot(path="verification/error_screenshot.png")
            return

        # Wait for loading to finish (2s initial load + some buffer)
        print("Waiting for initial load...")
        time.sleep(4)

        # Take screenshot 1
        print("Taking screenshot 1...")
        page.screenshot(path="verification/luxury_fitting_initial.png")

        # Click the second item
        print("Clicking second item...")
        try:
            # The list items have class 'group relative ...' inside the collection list
            # We can select by text price or name if known, but let's try to grab the second visible item in the list
            # The list container has overflow-y-auto
            items = page.locator(".group.relative.cursor-pointer")
            count = items.count()
            print(f"Found {count} items")
            if count > 1:
                items.nth(1).click()
                print("Clicked second item")
            else:
                print("Not enough items found")
        except Exception as e:
            print(f"Click failed: {e}")

        # Wait for transition (1.2s + buffer)
        print("Waiting for transition...")
        time.sleep(3)

        # Take screenshot 2
        print("Taking screenshot 2...")
        page.screenshot(path="verification/luxury_fitting_selected.png")

        browser.close()

if __name__ == "__main__":
    run()
