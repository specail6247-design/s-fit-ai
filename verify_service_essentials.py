import time
from playwright.sync_api import sync_playwright, expect

def verify_essentials():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        # Wait for server
        try:
            page.goto("http://localhost:3000", timeout=30000)
        except:
            print("Server not ready, waiting...")
            time.sleep(5)
            page.goto("http://localhost:3000", timeout=30000)

        # 1. Verify Member Access Button
        print("Checking Member Access...")
        # Note: The button text contains "Member Access" and "→"
        # Using aria-label is best
        member_btn = page.get_by_label("Open Member Access")
        expect(member_btn).to_be_visible()

        # Open Modal
        member_btn.click()
        time.sleep(2) # Wait for animation
        page.screenshot(path="verification_member_modal.png")
        print("Captured Member Modal screenshot.")

        # Close Modal
        page.get_by_label("Close Modal").click()
        time.sleep(1)

        # 2. Verify Support Hub
        print("Checking Support Hub...")
        support_btn = page.get_by_label("Open Support Hub")
        expect(support_btn).to_be_visible()

        # Open Drawer
        support_btn.click()
        time.sleep(2) # Wait for animation
        page.screenshot(path="verification_support_drawer.png")
        print("Captured Support Drawer screenshot.")

        browser.close()

if __name__ == "__main__":
    verify_essentials()
