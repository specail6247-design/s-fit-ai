import time
from playwright.sync_api import sync_playwright

def run_test():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        print("Navigating to /spa/fitting")
        page.goto("http://localhost:3000/spa/fitting")

        # Wait for content to load
        print("Waiting for page content...")
        try:
            page.wait_for_selector("text=Live Fit AI", timeout=10000)
        except:
            print("ERROR: Page did not load in time.")
            page.screenshot(path="verification_failure.png")
            browser.close()
            return

        print("Page loaded.")

        # Verify Hermes item exists
        hermes_text = "Birkin 30 Togo"
        if page.locator(f"text={hermes_text}").count() > 0:
            print(f"SUCCESS: Hermes item '{hermes_text}' FOUND.")
        else:
            print(f"FAILURE: Hermes item '{hermes_text}' NOT FOUND.")
            page.screenshot(path="verification_hermes_failure.png")

        # Verify Aura Blazer exists
        aura_text = "Aura Blazer"
        if page.locator(f"text={aura_text}").count() > 0:
             print(f"SUCCESS: '{aura_text}' FOUND.")
        else:
             print(f"FAILURE: '{aura_text}' NOT FOUND.")
             browser.close()
             return

        # Click Aura Blazer to select it
        print(f"Clicking '{aura_text}' to select it...")
        # Using force=True because the button might have overlays or gradients
        page.click(f"button:has-text('{aura_text}')", force=True)

        # Wait for state update (React re-render)
        time.sleep(1)

        # Check for shimmer effect on the selected item
        # The button itself or its container should have the class

        # Get the button element again to check updated classes
        aura_button = page.locator(f"button:has-text('{aura_text}')").first
        class_attr = aura_button.get_attribute("class")

        if class_attr and "luxury-shimmer" in class_attr:
             print(f"SUCCESS: Shimmer effect is ACTIVE on selected item ('{aura_text}').")
        else:
             print(f"FAILURE: Shimmer effect MISSING on selected item. Classes: {class_attr}")

        # Take a screenshot for proof
        page.screenshot(path="verification_ar_fitting_final.png")
        print("Screenshot saved to verification_ar_fitting_final.png")

        browser.close()

if __name__ == "__main__":
    run_test()
