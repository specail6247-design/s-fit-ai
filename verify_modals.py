import os
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Navigate to home
        print("Navigating to home...")
        page.goto("http://localhost:3000")
        # Wait for potential heavy loading
        page.wait_for_timeout(5000)

        # Create verification directory
        os.makedirs("verification", exist_ok=True)

        # Take initial screenshot
        page.screenshot(path="verification/home.png")
        print("Home screenshot saved.")

        # 1. Verify Member Access Modal
        print("Clicking Member Access button...")
        # The button has title "Member Access"
        page.click("button[title='Member Access']")
        page.wait_for_timeout(1000) # Wait for animation
        page.screenshot(path="verification/member_access_modal.png")
        print("Member Access Modal screenshot saved.")

        # Close modal by clicking backdrop (top left corner safe bet)
        page.mouse.click(10, 10)
        page.wait_for_timeout(1000)

        # 2. Verify Support Hub
        print("Clicking Support Hub button...")
        page.click("button[title='Support Hub']")
        page.wait_for_timeout(1000) # Wait for animation
        page.screenshot(path="verification/support_hub.png")
        print("Support Hub screenshot saved.")

        # Verify tabs in Support Hub
        print("Switching to Caution tab...")
        page.click("button:has-text('caution')")
        page.wait_for_timeout(500)
        page.screenshot(path="verification/support_hub_caution.png")

        print("Switching to FAQ tab...")
        page.click("button:has-text('faq')")
        page.wait_for_timeout(500)
        page.screenshot(path="verification/support_hub_faq.png")
        print("Support Hub tabs screenshots saved.")

    except Exception as e:
        print(f"Error: {e}")
        page.screenshot(path="verification/error.png")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
