import time
from playwright.sync_api import sync_playwright

def verify_phase7_features():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        try:
            # 1. Navigate to the Luxury Garment Detail page
            print("Navigating to Luxury Garment Detail page...")
            page.goto("http://localhost:3000/luxury/garment/gucci-005") # Assuming route or similar
            # Since the routing structure is a bit unclear, let's try the page where we edited:
            # app/luxury/page.tsx renders LuxuryGarmentDetail
            page.goto("http://localhost:3000/luxury")
            time.sleep(5) # Wait for hydration

            print("Taking screenshot of Luxury Page with features...")
            page.screenshot(path="verification-luxury-page.png", full_page=True)

            # 2. Verify AI Stylist Note
            print("Verifying AI Stylist Note...")
            stylist_note = page.locator("text=AI Stylist Note")
            if stylist_note.is_visible():
                print("✅ AI Stylist Note is visible.")
            else:
                print("❌ AI Stylist Note is NOT visible.")

            # 3. Verify Locked Item Logic (if applicable on this page)
            # The page hardcodes a check for 'lockedItem'. If the item displayed is locked, we should see it.
            # In LuxuryGarmentDetail, we look for "Exclusive Access" or lock icon.
            lock_indicator = page.locator("text=Exclusive Access")
            if lock_indicator.is_visible():
                 print("✅ Locked Item overlay is visible.")
            else:
                 print("ℹ️ Locked Item overlay not visible (might not be displaying a locked item).")

            # 4. Verify Ambient Audio Toggle
            print("Verifying Ambient Audio Toggle...")
            # Toggle is fixed at top right
            audio_btn = page.locator("button[aria-label='Mute Ambient Audio']")
            if not audio_btn.is_visible():
                 audio_btn = page.locator("button[aria-label='Unmute Ambient Audio']")

            if audio_btn.is_visible():
                print("✅ Ambient Audio Toggle is visible.")
                audio_btn.click()
                time.sleep(1)
                page.screenshot(path="verification-audio-toggled.png")
            else:
                print("❌ Ambient Audio Toggle is NOT visible.")

            # 5. Verify The Vault
            print("Verifying The Vault...")
            vault_btn = page.locator("button:has-text('checkroom')") # Using icon name as text if visible or use specific selector
            # The button has material symbol 'checkroom'
            vault_btn = page.locator("button span:text('checkroom')").first

            if vault_btn.is_visible():
                print("✅ Vault trigger button is visible.")
                vault_btn.click()
                time.sleep(2)

                # Check for Drawer
                drawer_header = page.locator("text=The Vault")
                if drawer_header.is_visible():
                     print("✅ Vault Drawer opened.")
                     page.screenshot(path="verification-vault-open.png")
                else:
                     print("❌ Vault Drawer did NOT open.")
            else:
                print("❌ Vault trigger button is NOT visible.")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification-error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_phase7_features()
