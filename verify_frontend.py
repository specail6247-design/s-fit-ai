from playwright.sync_api import sync_playwright

def verify_frontend(page):
    print("Navigating to home page...")
    page.goto("http://localhost:3000")

    print("Taking screenshot of initial state...")
    page.screenshot(path="/home/jules/verification/initial.png")

    # Check if Gold Ring Cursor is present
    cursor = page.locator(".gold-ring-cursor")
    if cursor.count() > 0:
        print("Gold Ring Cursor found.")
    else:
        print("Gold Ring Cursor NOT found.")

    # Check Typography
    # We can check computed styles or just visually inspect via screenshot.
    # The header "S_FIT NEO" should have font-family Cinzel.
    header = page.locator("h1")
    font_family = header.evaluate("element => getComputedStyle(element).fontFamily")
    print(f"Header font family: {font_family}")

    print("Uploading user photo...")
    # Find the input by ID
    user_upload = page.locator("#user-upload")
    user_upload.set_input_files("public/next.svg")

    print("Uploading garment photo...")
    garment_upload = page.locator("#garment-upload")
    garment_upload.set_input_files("public/next.svg")

    # Wait for images to be loaded (previews shown)
    page.wait_for_timeout(1000)

    print("Clicking TRY IT ON...")
    # Find the button containing "TRY IT ON"
    try_button = page.get_by_role("button", name="TRY IT ON")
    try_button.click()

    # Wait for processing state to appear
    print("Waiting for processing state...")
    page.wait_for_selector("text=ANALYZING BIOMETRICS", timeout=5000)

    print("Taking screenshot of processing state (Immersive Mode)...")
    page.screenshot(path="/home/jules/verification/processing.png")

    # Check opacity of left panel
    # The left panel is likely the first child of the main container or identified by classes.
    # We added motion.div to the left panel.
    # Let's check if there is an element with opacity 0 (or close to 0 during transition).
    # Since we wait for "ANALYZING BIOMETRICS", the transition should have started.
    # We can just rely on the screenshot.

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 720})
        page = context.new_page()
        try:
            verify_frontend(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="/home/jules/verification/error.png")
        finally:
            browser.close()
