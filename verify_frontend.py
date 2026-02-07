from playwright.sync_api import sync_playwright

def verify(page):
    print("Navigating to /test-fitting...")
    page.goto("http://localhost:3000/test-fitting", timeout=60000)

    print("Waiting for FittingRoom UI...")
    try:
        page.wait_for_selector("canvas", timeout=30000)
    except:
        print("Canvas not found")

    page.screenshot(path="verification_fitting_room_initial.png")
    print("Initial screenshot saved")

    # Check for Vault button
    vault_btn = page.locator("button").filter(has_text="👜").first
    if vault_btn.is_visible():
        print("Vault button found!")
        try:
            vault_btn.click(timeout=10000)
            print("Clicked Vault button")
            page.wait_for_timeout(2000)

            if page.get_by_text("The Vault").first.is_visible():
                print("Vault drawer opened!")
            else:
                print("Vault drawer not visible")
        except Exception as e:
            print(f"Failed to click Vault button: {e}")
    else:
        print("Vault button not found")

    # Check for Locked item (Locked is usually at the end)
    print("Searching for locked item...")

    # Try to scroll the item container
    # The item container is the one with overflow-x-auto
    try:
        item_list = page.locator(".overflow-x-auto").last
        if item_list.count() > 0:
            print("Scrolling item list...")
            item_list.evaluate("element => element.scrollLeft = element.scrollWidth")
            page.wait_for_timeout(2000)
    except Exception as e:
        print(f"Scroll failed: {e}")

    # Check for lock icon or "Dropping Soon"
    if page.locator("text=Dropping Soon").count() > 0:
         print("Locked item text found!")
    if page.locator("text=🔒").count() > 0:
         print("Locked item icon found!")

    page.screenshot(path="verification_fitting_room_final.png")
    print("Final screenshot saved")

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.set_viewport_size({"width": 1280, "height": 720})
    try:
        verify(page)
    except Exception as e:
        print(f"Error: {e}")
        page.screenshot(path="error_fitting_room.png")
    finally:
        browser.close()
