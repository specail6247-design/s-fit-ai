from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(viewport={'width': 450, 'height': 800}) # Mobile view
    page = context.new_page()

    try:
        # 1. Start Flow
        page.goto("http://localhost:3000")
        page.wait_for_timeout(2000) # Wait for animations

        # 2. Select Mode
        print("Selecting Easy Fit mode...")
        # Use a more generic selector if text is tricky due to styling
        page.get_by_text("EASY FIT").click(force=True)
        page.get_by_role("button", name="Continue").click()

        # 3. User Stats
        print("Passing User Stats...")
        page.wait_for_timeout(1000)
        page.get_by_role("button", name="Continue to Fitting Room").click()

        # 4. Brand Selection
        print("Selecting Hermes...")
        page.wait_for_timeout(1000)
        # Verify Hermes exists
        hermes_btn = page.get_by_role("button", name="Hermes")
        if hermes_btn.count() > 0:
            print("Found Hermes button!")
            hermes_btn.click()
        else:
            print("Hermes button NOT found!")
            # Try to print all buttons to debug
            for btn in page.get_by_role("button").all():
                print(f"Button: {btn.inner_text()}")

        # 5. Enter Fitting Room
        page.get_by_role("button", name="Enter Fitting Room").click()

        # 6. Verify Fitting Room
        print("In Fitting Room...")
        page.wait_for_timeout(3000) # Wait for canvas and items to load

        # 7. Select Item
        # Look for Hermes item in the list.
        # ItemCard doesn't have a role, it's a button.
        # Let's try to click the first item in the list at the bottom.
        # We can look for "Birkin" text if I added it.
        birkin_text = page.get_by_text("Birkin")
        if birkin_text.count() > 0:
            print("Found Birkin item!")
            birkin_text.click()
        else:
            print("Birkin item NOT found!")

        page.wait_for_timeout(1000)

        # 8. Screenshot
        print("Taking screenshot...")
        page.screenshot(path="verification/hermes_verification.png")
        print("Screenshot saved.")

    except Exception as e:
        print(f"Error: {e}")
        page.screenshot(path="verification/error.png")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
