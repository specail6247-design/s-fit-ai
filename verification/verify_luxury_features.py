import time
from playwright.sync_api import sync_playwright

def verify_luxury_features():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        print("Navigating to Luxury Page...")
        try:
            page.goto("http://localhost:3000/luxury", timeout=60000)
            page.wait_for_load_state("networkidle")
            time.sleep(2) # Extra wait for animations
        except Exception as e:
            print(f"Error navigating to luxury page: {e}")
            return

        print("Checking Styling Tip...")
        try:
            styling_tip = page.locator("text=AI Stylist Note")
            if styling_tip.is_visible():
                print("Styling Tip is visible.")
            else:
                print("Styling Tip NOT found.")
        except Exception as e:
            print(f"Error checking styling tip: {e}")

        print("Checking Locked Item...")
        try:
            locked_item = page.locator("text=Exclusive Drop")
            if locked_item.is_visible():
                print("Locked Item section is visible.")
            else:
                print("Locked Item section NOT found.")
        except Exception as e:
             print(f"Error checking locked item: {e}")

        print("Taking Screenshot of Luxury Page...")
        page.screenshot(path="verification/luxury_detail.png")

        print("Testing Vault Interaction...")
        try:
            # Click "Save Look" (Heart icon)
            # The icon is inside a span with text 'favorite_border'
            save_button = page.locator("button:has(span:text('favorite_border'))").first
            if save_button.is_visible():
                save_button.click()
                print("Clicked Save Look.")
                time.sleep(2) # Wait for vault to open

                # Check if Vault is open
                vault_header = page.locator("text=THE VAULT")
                if vault_header.is_visible():
                    print("Vault opened successfully.")
                    # Check for item in vault
                    if page.locator("text=Metallic Silk Evening Blazer").is_visible():
                        print("Item found in Vault.")
                    else:
                        print("Item NOT found in Vault.")
                else:
                    print("Vault did NOT open.")
            else:
                print("Save Look button NOT found.")
        except Exception as e:
            print(f"Error interacting with vault: {e}")

        print("Taking Screenshot of Vault...")
        page.screenshot(path="verification/luxury_vault.png")

        print("Navigating to Photo Fitting...")
        try:
            page.goto("http://localhost:3000/luxury/fitting", timeout=60000)
            page.wait_for_load_state("networkidle")
            time.sleep(2)

            print("Checking Photo Fitting Stylist Note...")
            photo_stylist_note = page.locator("text=AI Stylist")
            if photo_stylist_note.first.is_visible():
                print("Photo Fitting Stylist Note is visible.")
            else:
                print("Photo Fitting Stylist Note NOT found.")

            print("Taking Screenshot of Photo Fitting...")
            page.screenshot(path="verification/photo_fitting.png")
        except Exception as e:
            print(f"Error verifying photo fitting: {e}")

        browser.close()

if __name__ == "__main__":
    verify_luxury_features()
