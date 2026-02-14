from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    # Use a wider viewport to see more items if needed
    context = browser.new_context(viewport={'width': 1280, 'height': 800})
    page = context.new_page()

    try:
        # 1. Start
        page.goto("http://localhost:3000")
        page.wait_for_timeout(5000) # Wait for canvas and mock data to load

        # 2. Look for Hermes item
        # BrandSelector is NOT in FittingRoom by default?
        # FittingRoom uses selectedBrand from store.
        # If selectedBrand is null, it might show nothing or empty list.
        # Wait, FittingRoom uses:
        # const brandItems = useMemo(() => selectedBrand ? getItemsByBrand(selectedBrand) : [], [selectedBrand]);
        # So if I don't select a brand, I see nothing.

        # I need to set the store state or modify FittingRoom to default to Hermes for verification.
        # Or better, I can inject a script to set the store.

        # Let's try to set the store using console execution if exposed, or just rely on the UI.
        # Does FittingRoom have a brand selector? No, it has "Item Selector Footer" that shows brandItems.
        # But it doesn't seem to have a way to CHANGE brand inside FittingRoom.

        # In the normal flow, BrandSelector sets the brand.
        # Since I bypassed BrandSelector, selectedBrand might be null (or persisted from previous session).

        # I will check if "Hermes" items are visible. If not, I might need to simulate a brand selection.
        # But wait, FittingRoom doesn't have a brand selector visible in the code I read.

        # I can try to find an item.
        print("Checking for items...")
        items = page.locator("button").all()
        found_item = False
        for item in items:
            txt = item.inner_text()
            if "Birkin" in txt or "Hermes" in txt:
                print(f"Found Hermes item: {txt}")
                found_item = True
                item.click() # Select it
                break

        if not found_item:
            print("No Hermes item found visible. Store might be empty or wrong brand.")

        page.screenshot(path="verification/fitting_room_direct.png")
        print("Screenshot saved.")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
