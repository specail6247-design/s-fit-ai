from playwright.sync_api import sync_playwright, expect

def verify_trust_features():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to homepage
        try:
            print("Navigating to http://localhost:3000...")
            page.goto("http://localhost:3000")
            # Wait for main content to load
            page.wait_for_selector("text=S_FIT NEO", timeout=30000)

            # 1. Verify Data Safety Badge
            print("Verifying Data Safety Badge...")
            badge = page.get_by_text("Privacy Guaranteed")
            expect(badge).to_be_visible()
            print("Badge found.")

            # 2. Verify Footer Links
            print("Verifying Footer Links...")
            legal_btn = page.get_by_text("Legal & Privacy")
            support_btn = page.get_by_text("Report Issue")
            expect(legal_btn).to_be_visible()
            expect(support_btn).to_be_visible()
            print("Footer links found.")

            # 3. Test Legal Modal
            print("Testing Legal Modal...")
            legal_btn.click()
            page.wait_for_timeout(1000) # Wait for animation

            # Check for header
            modal_header = page.get_by_role("heading", name="Privacy Policy").first
            expect(modal_header).to_be_visible()

            page.screenshot(path="verification/legal_modal.png")
            print("Legal Modal verified and screenshot taken.")

            # Close Legal Modal (find button with text Close)
            page.get_by_role("button", name="Close").click()
            page.wait_for_timeout(500)

            # 4. Test Support Modal
            print("Testing Support Modal...")
            support_btn.click()
            page.wait_for_timeout(1000)

            support_header = page.get_by_role("heading", name="Support Hub")
            expect(support_header).to_be_visible()

            page.screenshot(path="verification/support_modal.png")
            print("Support Modal verified and screenshot taken.")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    verify_trust_features()
