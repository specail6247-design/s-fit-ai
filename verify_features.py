from playwright.sync_api import sync_playwright, expect
import time
import json

def test_features(page):
    # --- PHASE 1: ZARA (Stylist Note & Vault) ---
    print("Testing ZARA features...")
    # Navigate to ensure origin
    page.goto("http://localhost:3000/test-fitting", timeout=60000)

    # Set ZARA state
    state = {
        "state": {
            "selectedBrand": "ZARA",
            "savedLooks": []
        },
        "version": 0
    }
    page.evaluate(f"localStorage.setItem('s-fit-ai-storage', '{json.dumps(state)}');")
    page.reload()

    # Wait for canvas or UI
    page.wait_for_selector('canvas', timeout=60000)
    time.sleep(5) # Extra wait for meshes

    # 1. Stylist Note
    print("Verifying Stylist Note...")
    # Select ZARA-001 (Blazer) - pick the main card (last one usually, or use specific selector)
    # The item card has a price "$89.99"
    blazer_btn = page.locator("button").filter(has_text="Oversized Structured Blazer").filter(has_text="$89.99").first
    blazer_btn.click()

    # Check for Stylist Tip
    expect(page.get_by_text("Pair with fitted trousers")).to_be_visible(timeout=10000)
    print("Stylist Note verified.")

    # 2. Vault
    print("Verifying Vault...")
    page.get_by_role("button", name="The Vault").click()
    expect(page.get_by_text("Your vault is empty")).to_be_visible()

    # Close vault (click top left corner approx)
    page.mouse.click(10, 10)
    time.sleep(1)

    # Save Look
    # Look for heart button.
    page.locator("button", has_text="🤍").click()
    expect(page.locator("button", has_text="❤️")).to_be_visible()

    # Open Vault
    page.get_by_role("button", name="The Vault").click()
    # Check item in Vault (it's in the bottom sheet)
    vault_sheet = page.locator(".fixed.bottom-0")
    expect(vault_sheet.get_by_text("Oversized Structured Blazer")).to_be_visible()
    print("Vault verified.")

    # --- PHASE 2: GUCCI (Locked Item) ---
    print("Testing GUCCI (Locked Item)...")
    state["state"]["selectedBrand"] = "Gucci"
    page.evaluate(f"localStorage.setItem('s-fit-ai-storage', '{json.dumps(state)}');")
    page.reload()
    page.wait_for_selector('canvas', timeout=60000)
    time.sleep(5)

    # 3. Locked Item
    # Find "Leather Bomber with Patches"
    # It should have a lock icon or text.
    # The item card renders a lock emoji 🔒 if locked.

    # Find the button for the item
    bomber_btn = page.locator("button").filter(has_text="Leather Bomber with Patches").first

    # It should be visible (scrolling might be needed if many items, but Gucci has 5, should fit or be scrollable)
    # Scroll into view if needed
    bomber_btn.scroll_into_view_if_needed()

    # Check if it has lock icon.
    # The lock icon is inside the button.
    expect(bomber_btn).to_contain_text("🔒")
    print("Locked Item verified.")

    # Check disabled (optional, but good)
    expect(bomber_btn).to_be_disabled()
    print("Locked Item is disabled.")

    page.screenshot(path="/home/jules/verification/verification_final.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_features(page)
            print("Verification Successful!")
        except Exception as e:
            print(f"Verification Failed: {e}")
            page.screenshot(path="/home/jules/verification/error.png")
        finally:
            browser.close()
