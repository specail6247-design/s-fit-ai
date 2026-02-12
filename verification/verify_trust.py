from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        # Launch browser with devtools enabled to catch console errors if needed
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Capture console messages
        page.on("console", lambda msg: print(f"BROWSER CONSOLE: {msg.text}"))
        page.on("pageerror", lambda err: print(f"BROWSER ERROR: {err}"))

        try:
            print("Navigating to http://localhost:3000...")
            page.goto("http://localhost:3000")

            # Wait for hydration
            page.wait_for_timeout(5000)

            print("Taking initial screenshot...")
            page.screenshot(path="verification/initial_screen.png")

            # 1. Check Data Safety Badge
            badge = page.get_by_text("Secure Processing")
            if badge.is_visible():
                print("SUCCESS: Data Safety Badge is visible.")
            else:
                print("FAILURE: Data Safety Badge NOT found.")
                # Print the body text to debug
                print("DEBUG: Body text excerpt:", page.inner_text("body")[:500])

            # 2. Check Legal Modal
            print("Clicking 'Legal' button...")
            legal_btn = page.get_by_role("button", name="Legal")
            if not legal_btn.is_visible():
                print("FAILURE: 'Legal' button not visible!")
            else:
                legal_btn.click()
                print("Clicked 'Legal'. Waiting for modal...")
                page.wait_for_timeout(2000) # Wait for animation
                page.screenshot(path="verification/legal_modal.png")

                modal_title = page.get_by_text("LEGAL & COMPLIANCE")
                if modal_title.is_visible():
                    print("SUCCESS: Legal Modal opened.")
                    # Close Modal
                    close_btn = page.locator("button:has-text('✕')")
                    if close_btn.is_visible():
                        close_btn.click()
                        print("Closed Legal Modal.")
                        page.wait_for_timeout(1000)
                    else:
                        print("WARNING: Close button not found.")
                else:
                    print("FAILURE: Legal Modal title not visible.")
                    # Check if modal exists in DOM but hidden
                    modal_el = page.locator("text=LEGAL & COMPLIANCE")
                    if modal_el.count() > 0:
                        print("DEBUG: Modal exists in DOM but is not visible.")
                        box = modal_el.bounding_box()
                        print(f"DEBUG: Bounding box: {box}")
                    else:
                        print("DEBUG: Modal does not exist in DOM.")

            # 3. Check Support Hub
            print("Clicking 'Support' button...")
            support_btn = page.get_by_role("button", name="Support")
            if support_btn.is_visible():
                support_btn.click()
                print("Clicked 'Support'. Waiting for modal...")
                page.wait_for_timeout(2000)
                page.screenshot(path="verification/support_hub.png")

                hub_title = page.get_by_text("SUPPORT HUB")
                if hub_title.is_visible():
                    print("SUCCESS: Support Hub opened.")
                    # Close Support Hub (usually click outside or close button)
                    close_hub = page.locator("button:has-text('✕')").first
                    if close_hub.is_visible():
                        close_hub.click()
                        print("Closed Support Hub.")
                else:
                    print("FAILURE: Support Hub title not visible.")
            else:
                print("FAILURE: 'Support' button not visible.")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
