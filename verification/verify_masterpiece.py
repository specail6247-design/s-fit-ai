from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to Luxury Detail Page
        print("Navigating to /luxury...")
        # Increased timeout to 60s
        page.goto("http://localhost:3000/luxury", timeout=60000)

        # Wait for hydration and potential 3D loading
        time.sleep(5)

        # Check for Canvas (LuxuryImageDistortion)
        canvas = page.locator("canvas").first
        try:
            canvas.wait_for(state="visible", timeout=10000)
            print("Canvas found (LuxuryImageDistortion is active)")
        except:
            print("Canvas NOT found or not visible!")

        # Hover over canvas to trigger ripple
        if canvas.is_visible():
            canvas.hover()
            time.sleep(1)

        # Take screenshot of Detail Page
        page.screenshot(path="verification/luxury_detail.png")
        print("Screenshot saved to verification/luxury_detail.png")

        # Check Font Usage
        header = page.locator("h1").first
        if header.is_visible():
             font_family = header.evaluate("element => getComputedStyle(element).fontFamily")
             print(f"Header Font Family: {font_family}")
             if "Cinzel" in font_family or "cinzel" in font_family:
                 print("Cinzel font confirmed.")
             else:
                 print(f"Cinzel font NOT found. Got: {font_family}")

        browser.close()

if __name__ == "__main__":
    run()
