from playwright.sync_api import sync_playwright, expect
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1920, 'height': 1080})
        page = context.new_page()

        print("Navigating to http://localhost:3000/luxury/fitting")
        page.goto("http://localhost:3000/luxury/fitting")

        print("Waiting for loading...")
        page.wait_for_timeout(3000)

        # Verify header text "S_FIT LUXURY"
        header = page.get_by_text("S_FIT LUXURY")
        expect(header).to_be_visible()
        print("Header 'S_FIT LUXURY' is visible.")

        # Verify brands list - Look for GUCCI (Luxury)
        gucci_btn = page.get_by_role("button", name="GUCCI")
        expect(gucci_btn).to_be_visible()
        print("Brand button 'GUCCI' is visible.")

        # Click on GUCCI
        gucci_btn.click()
        page.wait_for_timeout(1000)

        # Verify products appear - Gucci products
        product = page.get_by_text("GG Jacquard Wool Blazer")
        expect(product).to_be_visible()
        print("Product 'GG Jacquard Wool Blazer' is visible.")

        # Click on the product to open detail view
        product.click()
        page.wait_for_timeout(1000)

        # Verify Detail View - Use specific heading level
        detail_header = page.get_by_role("heading", name="GG Jacquard Wool Blazer", level=2)
        expect(detail_header).to_be_visible()
        print("Detail View opened.")

        # Take screenshot
        screenshot_path = "luxury_mode.png"
        page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    run()
