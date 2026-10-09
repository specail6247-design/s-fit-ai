from playwright.sync_api import Page, expect, sync_playwright
import time

def test_trust_features(page: Page):
    page.goto("http://localhost:3000/")

    # Wait for the main elements to load
    page.wait_for_selector("text=Photos are processed securely and not shared.")

    # 1. Take a screenshot showing the Data safety badge and footer links
    page.screenshot(path="/home/jules/verification/screenshots/1_badge_and_links.png", full_page=True)

    # 2. Click Privacy Policy and verify modal
    privacy_btn = page.locator("button:has-text('Privacy Policy')")
    privacy_btn.click()
    expect(page.locator("text=Your privacy is important to us")).to_be_visible()
    time.sleep(1) # wait for animation
    page.screenshot(path="/home/jules/verification/screenshots/2_privacy_modal.png")

    # Close privacy modal
    page.locator("button:has-text('Acknowledge')").click()
    time.sleep(1)

    # 3. Click Terms of Service and verify modal
    terms_btn = page.locator("button:has-text('Terms of Service')")
    terms_btn.click()
    expect(page.locator("text=By using S_FIT AI, you agree to our Terms of Service")).to_be_visible()
    time.sleep(1)
    page.screenshot(path="/home/jules/verification/screenshots/3_terms_modal.png")

    # Close terms modal
    page.locator("button:has-text('Acknowledge')").click()
    time.sleep(1)

    # 4. Click Report Issue and verify modal
    report_btn = page.locator("button:has-text('Report Issue')")
    report_btn.click()
    expect(page.locator("text=Describe the problem")).to_be_visible()
    time.sleep(1)
    page.screenshot(path="/home/jules/verification/screenshots/4_report_modal.png")

    print("Successfully verified Trust & Growth UI features.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Setup context for video recording
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos/",
            record_video_size={"width": 1280, "height": 720}
        )
        page = context.new_page()
        try:
            test_trust_features(page)
        finally:
            context.close()
            browser.close()
