from playwright.sync_api import sync_playwright
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # 1. Navigate to the page
    print("Navigating to home page...")
    try:
        page.goto("http://localhost:3000", timeout=60000)
    except Exception as e:
        print(f"Navigation failed: {e}")
        browser.close()
        return

    page.wait_for_load_state("networkidle")

    # 2. Open Member Access Modal
    print("Opening Member Access Modal...")
    page.get_by_title("Member Access").click()
    time.sleep(1) # Wait for animation
    page.screenshot(path="verification_member_access.png")
    print("Member Access screenshot saved.")

    # Close Member Access Modal
    # Assuming the close button has 'close' icon or we can click backdrop
    # Using the close button based on my implementation: <span ...>close</span> inside a button
    page.get_by_text("close").first.click()
    time.sleep(1)

    # 3. Open Support Hub
    print("Opening Support Hub...")
    page.get_by_title("Support Hub").click()
    time.sleep(1) # Wait for animation
    page.screenshot(path="verification_support_hub.png")
    print("Support Hub (Guide) screenshot saved.")

    # 4. Click through tabs in Support Hub
    print("Clicking Caution tab...")
    page.get_by_text("Caution").click()
    time.sleep(0.5)
    page.screenshot(path="verification_support_caution.png")

    print("Clicking Q&A tab...")
    page.get_by_text("Q&A").click()
    time.sleep(0.5)
    page.screenshot(path="verification_support_qa.png")

    print("Clicking Report tab...")
    page.get_by_text("Report").click()
    time.sleep(0.5)
    page.screenshot(path="verification_support_report.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
