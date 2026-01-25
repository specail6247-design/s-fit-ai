from playwright.sync_api import sync_playwright, expect
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    # Increase viewport to ensure button is visible
    page = browser.new_page(viewport={'width': 1280, 'height': 800})

    try:
        # Go to landing page
        print("Navigating to localhost:3000...")
        page.goto("http://localhost:3000")

        # Wait for page to load potentially slow assets
        page.wait_for_load_state("networkidle")

        # --- Test Member Access ---
        print("--- Testing Member Access ---")
        member_btn = page.get_by_role("button", name="Member Access")
        expect(member_btn).to_be_visible()
        print("Member Access button found. Clicking...")
        member_btn.click()

        # Verify modal
        modal_header = page.get_by_role("heading", name="Member Access")
        expect(modal_header).to_be_visible()
        print("Modal opened.")

        # Test Toggle
        print("Testing Toggle...")
        toggle_btn = page.get_by_role("button", name="Apply for access")
        toggle_btn.click()
        expect(page.get_by_role("heading", name="Join the Club")).to_be_visible()

        # Close Modal
        print("Closing Modal...")
        page.get_by_role("button", name="✕").click()
        expect(modal_header).not_to_be_visible()
        print("Member Access test passed.")


        # --- Test Support Hub ---
        print("\n--- Testing Support Hub ---")
        # Verify the button exists
        print("Looking for Help & Support button...")
        support_btn = page.get_by_label("Help & Support")
        expect(support_btn).to_be_visible(timeout=10000)
        print("Button found. Clicking...")
        support_btn.click()

        # Verify drawer opens
        print("Verifying drawer title...")
        drawer_title = page.get_by_role("heading", name="Support Hub")
        expect(drawer_title).to_be_visible()

        # Click on "Cautions" tab
        print("Testing Cautions tab...")
        page.get_by_role("button", name="Cautions").click()
        expect(page.get_by_text("Avoid baggy clothes")).to_be_visible()

        # Click on "Q&A" tab
        print("Testing Q&A tab...")
        page.get_by_role("button", name="Q&A").click()
        expect(page.get_by_text("Is my photo saved?")).to_be_visible()

        # Expand a Q&A item
        print("Testing Accordion...")
        page.get_by_role("button", name="Is my photo saved?").click()
        expect(page.get_by_text("No. Your photos are processed locally")).to_be_visible()

        # Take screenshot
        print("Taking screenshot...")
        page.screenshot(path="verification/service_essentials.png")
        print("Verification complete.")

    except Exception as e:
        print(f"Verification failed: {e}")
        # Take error screenshot
        page.screenshot(path="verification/error_state.png")
        raise e

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
