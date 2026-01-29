from playwright.sync_api import sync_playwright, expect
import time

def verify_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to home
        try:
            page.goto("http://localhost:3000", timeout=60000)
        except Exception as e:
            print(f"Failed to load page: {e}")
            return

        # Wait for hydration and animations
        time.sleep(5)

        # Take screenshot of initial state
        page.screenshot(path="verification_initial.png")
        print("Initial screenshot taken.")

        # Check Auth Button
        try:
            auth_btn = page.get_by_text("Member Access")
            expect(auth_btn).to_be_visible()

            # Click Auth Button to open modal
            auth_btn.click()
            time.sleep(1)
            page.screenshot(path="verification_auth_modal.png")
            print("Auth modal screenshot taken.")

            # Close modal
            page.get_by_text("✕").click()
            time.sleep(0.5)
        except Exception as e:
            print(f"Auth check failed: {e}")

        # Check Support Button
        try:
            support_btn = page.get_by_label("Help & Support")
            expect(support_btn).to_be_visible()

            # Click Support Button to open drawer
            support_btn.click()
            time.sleep(1)

            # Check Drawer Content
            expect(page.get_by_text("How to Fit")).to_be_visible()
            expect(page.get_by_text("Best Results")).to_be_visible()
            expect(page.get_by_text("FAQ")).to_be_visible()

            page.screenshot(path="verification_support_drawer.png")
            print("Support drawer screenshot taken.")
        except Exception as e:
            print(f"Support check failed: {e}")
            page.screenshot(path="verification_failed.png")

        browser.close()

if __name__ == "__main__":
    verify_ui()
