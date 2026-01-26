from playwright.sync_api import sync_playwright, expect
import time
import os
import re

def verify_features():
    # Ensure directory exists
    os.makedirs("verification", exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 800})
        page = context.new_page()

        print("Navigating to test page...")
        page.goto("http://localhost:3000/test-fitting")

        print("Waiting for page load...")
        page.wait_for_selector("text=Masterpiece ON", timeout=60000)

        # 3. Select Item (Zara is default)
        print("Selecting ZARA item...")
        footer = page.locator("div.flex.gap-3.overflow-x-auto.pb-2")
        blazer_btn = footer.locator("button").filter(has_text="Oversized Structured Blazer").first

        expect(blazer_btn).to_be_visible()
        print("Clicking blazer...")
        blazer_btn.click(force=True)
        time.sleep(2)

        # Verify selection
        try:
             expect(blazer_btn).to_have_class(re.compile(r"border-cyber-lime"))
             print("Item selection verified.")
        except:
             print("Item selection failed?")
             page.screenshot(path="verification/debug_selection_fail.png")

        # 4. Stylist Note
        print("Checking for Stylist Note...")
        try:
            note = page.locator("div").filter(has_text="Stylist Note").first
            expect(note).to_be_visible()
            print("Taking Stylist Note screenshot...")
            page.screenshot(path="verification/stylist_note.png")
        except Exception as e:
             print("Stylist note assertion failed. Taking debug screenshot...")
             page.screenshot(path="verification/debug_stylist_fail.png")

        # 5. Save to Vault
        print("Saving to Vault...")
        save_btn = page.locator("button[title='Save to Vault']")
        if save_btn.count() == 0:
             save_btn = page.locator("button[title='Remove from Vault']")
             if save_btn.count() > 0:
                 print("Item was already saved, toggling...")
                 save_btn.click()
                 time.sleep(1)
                 save_btn = page.locator("button[title='Save to Vault']")

        if save_btn.count() > 0:
            save_btn.click()
            expect(page.locator("button[title='Remove from Vault']")).to_be_visible()
        else:
            print("Error: Save button not found")

        # 6. Open Vault
        print("Opening Vault...")
        vault_btn = page.locator("button[title='Open Vault']")
        vault_btn.click()
        expect(page.locator("text=The Vault")).to_be_visible()
        expect(page.locator("text=Try On")).to_be_visible()

        print("Taking Vault screenshot...")
        page.screenshot(path="verification/vault_verification.png")

        # Close Vault
        print("Closing Vault...")
        # Use more specific selector for close button in drawer
        page.locator(".fixed.top-0.right-0 button").filter(has_text="✕").click()
        time.sleep(1)

        # 7. Verify Locked Item (Gucci)
        print("Switching to Gucci...")
        page.get_by_text("Gucci", exact=True).click()
        time.sleep(2)

        print("Checking Locked Item...")
        footer = page.locator("div.flex.gap-3.overflow-x-auto.pb-2")
        locked_item_btn = footer.locator("button").filter(has_text="GG Jacquard Wool Blazer").first

        if locked_item_btn.count():
             expect(page.locator("text=🔒")).to_be_visible()
             expect(locked_item_btn).to_be_disabled()
             print("Locked item verification passed.")
             page.screenshot(path="verification/locked_item.png")
        else:
             print("Warning: Could not find Locked Gucci item")

        browser.close()

if __name__ == "__main__":
    verify_features()
