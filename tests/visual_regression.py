import os
import time
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Ensure screenshots directory exists
        os.makedirs("tests/screenshots", exist_ok=True)

        page.on("console", lambda msg: print(f"Browser Console: {msg.text}"))
        page.on("pageerror", lambda exc: print(f"Browser Error: {exc}"))

        print("Navigating to http://localhost:3000...")
        try:
            page.goto("http://localhost:3000", timeout=60000)

            # Wait for any text that signifies load
            page.wait_for_selector("text=S_FIT", timeout=10000)
            print("Landing page loaded (found S_FIT).")
            page.screenshot(path="tests/screenshots/1_landing.png")

            # 1. Select Easy Fit Mode
            print("Selecting Easy Fit mode...")
            # Use a more generic selector if text varies
            # Looking for "EASY FIT" text in the card
            page.click("text=EASY FIT")
            time.sleep(1)

            # Click Continue button
            # Button text: "Continue →" (if selected)
            page.click("text=Continue →")

            # 2. Easy Fit Input
            print("Entering stats...")
            page.wait_for_selector("text=Easy Fit", timeout=5000) # Header in EasyFitMode
            page.screenshot(path="tests/screenshots/2_easy_fit_input.png")
            page.click("text=Continue to Fitting Room →")

            # 3. Brand Selection
            print("Selecting brand...")
            page.wait_for_selector("text=Select Brand", timeout=5000)
            page.screenshot(path="tests/screenshots/3_brand_select.png")

            print("Entering Fitting Room...")
            page.click("text=Enter Fitting Room →")

            # 4. Fitting Room
            print("Waiting for Fitting Room...")
            page.wait_for_selector("text=Collection", timeout=30000)
            print("Fitting Room loaded.")
            time.sleep(2) # Wait for canvas to render

            page.screenshot(path="tests/screenshots/4_fitting_room_initial.png")
            print("Saved 4_fitting_room_initial.png")

            # 5. Select another item
            item_buttons = page.query_selector_all("button:has-text('Fit')")
            if len(item_buttons) > 1:
                print("Clicking a clothing item...")
                item_buttons[1].click()
                time.sleep(2)
                page.screenshot(path="tests/screenshots/5_fitting_room_item_selected.png")
                print("Saved 5_fitting_room_item_selected.png")
            else:
                print("Could not find item buttons to click.")

        except Exception as e:
            print(f"Error during test: {e}")
            page.screenshot(path="tests/screenshots/error_state.png")

        browser.close()

if __name__ == "__main__":
    run()
