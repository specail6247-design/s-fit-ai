
import time
from playwright.sync_api import sync_playwright, expect

def verify_fitting_room():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print("Navigating to /jules-test...")
        page.goto("http://localhost:3000/jules-test", timeout=60000)

        print("Waiting for Fitting Room UI...")
        masterpiece_btn = page.get_by_role("button", name="Masterpiece ON")
        expect(masterpiece_btn).to_be_visible(timeout=60000)
        print("Found Masterpiece toggle.")

        macro_btn = page.get_by_role("button", name="Macro View")
        expect(macro_btn).to_be_visible()
        print("Found Macro View toggle.")

        ai_fitting_btn = page.get_by_role("button", name="AI 피팅")
        expect(ai_fitting_btn).to_be_visible()
        print("Found AI Fitting button.")

        # Wait for stability
        time.sleep(2)

        # Take main view screenshot
        page.screenshot(path="/home/jules/verification/fitting_room_main.png")
        print("Screenshot taken: fitting_room_main.png")

        # Click AI Fitting
        print("Clicking AI Fitting button...")
        ai_fitting_btn.click() # Default check logic, if it fails I'll try force=True next time

        modal_title = page.get_by_text("Masterpiece Try-On")
        expect(modal_title).to_be_visible()
        print("Found AITryOnModal.")

        page.screenshot(path="/home/jules/verification/fitting_room_modal.png")
        print("Screenshot taken: fitting_room_modal.png")

        close_btn = page.get_by_text("✕")
        close_btn.click()

        # Verify Macro View
        macro_btn.click()
        print("Clicked Macro View.")
        time.sleep(1)

        page.screenshot(path="/home/jules/verification/fitting_room_macro.png")
        print("Screenshot taken: fitting_room_macro.png")

        browser.close()

if __name__ == "__main__":
    verify_fitting_room()
