from playwright.sync_api import Page, expect, sync_playwright
import time

def verify_trust_features(page: Page):
    # 1. Navigate to home
    page.goto("http://localhost:3000")
    # Wait for page load
    page.wait_for_load_state("networkidle")

    # 2. Check Footer Links
    privacy_btn = page.get_by_role("button", name="Privacy")
    terms_btn = page.get_by_role("button", name="Terms")
    report_btn = page.get_by_role("button", name="Report Issue")

    expect(privacy_btn).to_be_visible()
    expect(terms_btn).to_be_visible()
    expect(report_btn).to_be_visible()

    print("Footer links visible.")

    # 3. Verify Privacy Modal
    privacy_btn.click()
    time.sleep(1) # Animation

    # Check Header
    expect(page.get_by_text("Legal & Compliance")).to_be_visible()
    # Check Content
    expect(page.get_by_text("Information We Collect")).to_be_visible()

    # Screenshot Privacy
    page.screenshot(path="verification/privacy_modal.png")
    print("Privacy modal verified.")

    # Close modal
    page.get_by_role("button", name="✕").click()
    time.sleep(0.5)

    # 4. Verify Terms Modal
    terms_btn.click()
    time.sleep(1)

    # Check Header
    expect(page.get_by_text("Legal & Compliance")).to_be_visible()
    # Check Content
    expect(page.get_by_text("Acceptance of Terms")).to_be_visible()

    # Screenshot Terms
    page.screenshot(path="verification/terms_modal.png")
    print("Terms modal verified.")

    # Close modal
    page.get_by_role("button", name="✕").click()
    time.sleep(0.5)

    # 5. Verify Support Modal
    report_btn.click()
    time.sleep(1)

    # Check Header
    expect(page.get_by_text("Support Hub")).to_be_visible()

    # Fill Form
    page.get_by_placeholder("Describe what happened...").fill("Testing feedback form.")

    # Screenshot Support
    page.screenshot(path="verification/support_modal.png")
    print("Support modal verified.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_trust_features(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
            raise e
        finally:
            browser.close()
