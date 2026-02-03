import os
import sys
from playwright.sync_api import sync_playwright

def verify_service_essentials():
    print("Starting Service Essentials Verification...")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to home
        try:
            page.goto("http://localhost:3000", timeout=60000)
            print("Page loaded successfully.")
        except Exception as e:
            print(f"Failed to load page: {e}")
            sys.exit(1)

        # 1. Verify Member Access Modal
        print("\nVerifying Member Access Modal...")
        try:
            # Click trigger
            page.click('button[title="Member Access"]')
            page.wait_for_timeout(1000) # Wait for animation

            # Check content
            if page.is_visible("text=MEMBER ACCESS") and page.is_visible("text=Private Fitting Room"):
                print("✅ Member Access Modal opened and content verified.")
                page.screenshot(path="verification/member_access.png")
            else:
                print("❌ Member Access Modal content missing.")
                sys.exit(1)

            # Close modal (click backdrop)
            # Use a more generic selector for the backdrop or click via coordinates
            print("Closing modal...")
            backdrop = page.locator(".bg-black\\/90").first
            # Click near the edge to avoid the modal content in the center
            backdrop.click(position={"x": 10, "y": 10}, force=True)

            # Wait for modal to disappear
            try:
                page.wait_for_selector("text=MEMBER ACCESS", state="hidden", timeout=5000)
                print("✅ Modal closed.")
            except:
                print("⚠️ Modal didn't close with first click, trying again.")
                backdrop.click(position={"x": 10, "y": 10}, force=True)
                page.wait_for_selector("text=MEMBER ACCESS", state="hidden", timeout=5000)

        except Exception as e:
            print(f"❌ Member Access Verification Failed: {e}")
            sys.exit(1)

        # 2. Verify Support Hub
        print("\nVerifying Support Hub...")
        try:
            # Click trigger
            page.click('button[title="Support Hub"]')
            page.wait_for_timeout(1000) # Wait for animation

            # Check content
            visible_checks = [
                "text=Support Hub",
                "text=Assistant & Resources",
                "text=How to Fit",
                "text=Critical Warnings",
                "text=Common Questions"
            ]

            all_passed = True
            for check in visible_checks:
                if page.is_visible(check):
                    print(f"✅ Found: {check.replace('text=', '')}")
                else:
                    print(f"❌ Missing: {check.replace('text=', '')}")
                    all_passed = False

            if all_passed:
                print("✅ Support Hub content verified.")
                page.screenshot(path="verification/support_hub.png")
            else:
                sys.exit(1)

        except Exception as e:
            print(f"❌ Support Hub Verification Failed: {e}")
            sys.exit(1)

        browser.close()

    print("\n🎉 Service Essentials Verification Completed Successfully!")

if __name__ == "__main__":
    verify_service_essentials()
