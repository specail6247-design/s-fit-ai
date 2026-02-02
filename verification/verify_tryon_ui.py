
from playwright.sync_api import sync_playwright, Page, expect
import os

def verify_tryon_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Mock the Try-On API
        page.route("**/api/try-on", lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body='{"success": true, "imageUrl": "https://placehold.co/400x600.png"}'
        ))

        # Navigate to Fitting Room
        page.goto("http://localhost:3000/fitting-room")

        # Wait for page load
        page.wait_for_timeout(5000)

        # Find AI button
        ai_btns = page.locator("button").all()
        target_btn = None
        for btn in ai_btns:
            txt = btn.text_content()
            if "AI" in txt:
                target_btn = btn
                break

        if not target_btn:
             target_btn = page.locator("button").filter(has_text="AI").first

        target_btn.click()

        # Check Modal
        expect(page.get_by_text("Masterpiece Try-On")).to_be_visible()

        # Upload a dummy file
        with open("dummy.jpg", "wb") as f:
            f.write(b"dummy content")

        page.set_input_files("input[type='file']", "dummy.jpg")

        # Wait for preview
        page.wait_for_timeout(1000)

        # Click Generate
        generate_btn = page.get_by_text("Generate AI Masterpiece Fit")

        # Ensure item selected
        if not generate_btn.is_enabled():
            print("Generate disabled. Selecting item...")

            # Close modal (use specific selector)
            # The one with text-2xl is the modal close button
            page.locator("button.text-2xl").filter(has_text="✕").click()

            # Select an item
            print("Selecting item from footer...")

            # Look for item cards
            item_cards = page.locator("button").filter(has_text="$").all()
            if not item_cards:
                print("No item cards found!")
            else:
                item_cards[0].click()
                print("Item selected.")

            # Re-open modal
            target_btn.click()
            page.set_input_files("input[type='file']", "dummy.jpg")
            page.wait_for_timeout(1000)

        generate_btn.click()

        # Wait for result
        expect(page.get_by_text("Analysis Result")).to_be_visible(timeout=10000)

        # Check for new buttons
        expect(page.get_by_text("Cinematic Motion")).to_be_visible()
        expect(page.get_by_text("Hyper-Zoom")).to_be_visible()

        # Take screenshot
        page.screenshot(path="verification/verify_tryon.png")
        print("Screenshot saved to verification/verify_tryon.png")

        browser.close()

if __name__ == "__main__":
    verify_tryon_ui()
