from playwright.sync_api import Page, expect, sync_playwright
import time
import os

def test_squad_feature(page: Page):
    print("Navigating to /squad...")
    page.goto("http://localhost:3000/squad")

    print("Waiting for loading to finish...")
    # Wait for the spinner to go away.
    expect(page.get_by_text("Loading Fitting Room...")).not_to_be_visible(timeout=60000)

    print("Waiting for Squad Shop button...")
    squad_btn = page.get_by_text("Squad Shop")
    expect(squad_btn).to_be_visible(timeout=10000)

    print("Clicking Squad Shop button...")
    squad_btn.click(force=True)

    print("Waiting for Squad Live indicator...")
    expect(page.get_by_text("Squad Live")).to_be_visible(timeout=10000)

    print("Verifying UI elements...")
    expect(page.get_by_text("🔗")).to_be_visible()
    expect(page.get_by_text("❤️")).to_be_visible()

    print("Taking screenshot...")
    time.sleep(2)
    page.screenshot(path="verification/squad_verification.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_squad_feature(page)
            print("Verification script finished successfully.")
        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification/squad_failure.png")
        finally:
            browser.close()
