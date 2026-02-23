import os
import time
import base64
from playwright.sync_api import sync_playwright

def verify_luxury_fitting():
    print("Starting verification of Luxury Fitting...")

    # Minimal valid JPEG 1x1 pixel
    valid_jpeg_b64 = "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA="
    valid_jpeg_bytes = base64.b64decode(valid_jpeg_b64)

    with open("valid_user.jpg", "wb") as f:
        f.write(valid_jpeg_bytes)

    print("Created valid_user.jpg")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Capture console logs to debug React errors
        page.on("console", lambda msg: print(f"Browser Console: {msg.text}"))

        try:
            print("Navigating to /luxury/fitting...")
            page.goto("http://localhost:3000/luxury/fitting")

            # Wait for page to load
            page.wait_for_selector("text=Masterpiece Fit", timeout=10000)
            print("Page loaded.")

            # Upload User Photo
            print("Uploading user photo...")
            file_input = page.locator("input[type='file']")
            file_input.set_input_files("valid_user.jpg")

            # Wait for user image to be displayed (src attribute should be set)
            page.wait_for_selector("img[alt='User']", timeout=5000)
            print("User photo uploaded and rendered.")

            # Select Garment
            print("Selecting garment...")
            # Wait for grid items
            # Use specific grid class to avoid matching the main layout grid
            grid_item = page.locator(".grid.grid-cols-2 > div").first
            grid_item.wait_for()

            # Click the garment
            grid_item.click()

            # Verify selection by checking border color class
            # The class changes to include 'border-[#D4AF37]'
            # We can check if the element has this class
            print("Waiting for garment selection state...")

            # Playwright class matcher is strict, so we check using evaluate or simple wait
            # Let's wait for the class to appear
            try:
                grid_item.wait_for(state="visible")
                # Check if class contains the selected border color
                # The unselected has 'border-[#D4AF37]/10', selected has 'border-[#D4AF37]' (without opacity)
                # OR 'bg-[#D4AF37]/10'
                # Let's wait for the background color class which is unique to selected
                page.wait_for_selector(".grid.grid-cols-2 > div.bg-\\[\\#D4AF37\\]\\/10", timeout=5000)
                print("Garment selected (visual confirmation).")
            except Exception as e:
                print(f"Garment selection visual check failed: {e}")
                # Print class list
                classes = grid_item.get_attribute("class")
                print(f"Classes on first item: {classes}")

            # Check if button is enabled
            print("Checking Initiate button...")
            button = page.locator("button", has_text="Initiate Masterpiece Fit")

            # Wait for button to be enabled
            try:
                # wait_for(state="enabled") doesn't work directly on locator in all versions,
                # but we can verify it's not disabled.
                # Actually, standard wait_for_selector doesn't check enabled.
                # We can use expect(locator).to_be_enabled()
                # But here we are using sync_api without expect imported usually?
                # We can just poll.
                for i in range(10):
                    if not button.is_disabled():
                        print("Button is enabled!")
                        break
                    print("Button still disabled, waiting...")
                    time.sleep(0.5)

                if button.is_disabled():
                    raise Exception("Button remained disabled after selection.")

            except Exception as e:
                print(f"Error checking button: {e}")
                page.screenshot(path="verification/luxury_fitting_retry_error.png")
                raise

            # Click Initiate
            print("Initiating Masterpiece Fit...")
            # We mock the API to avoid actual processing time and errors
            page.route("**/api/try-on", lambda route: route.fulfill(
                status=200,
                content_type="application/json",
                body='{"imageUrl": "https://via.placeholder.com/500"}'
            ))
            page.route("**/api/runway-motion", lambda route: route.fulfill(
                status=200,
                content_type="application/json",
                body='{"videoUrl": "https://example.com/video.mp4"}'
            ))

            button.click()
            print("Clicked Initiate.")

            # Wait for processing
            page.wait_for_selector("text=Crafting Masterpiece", timeout=5000)
            print("Processing overlay appeared.")

            # Wait for result
            page.wait_for_selector("text=Cinematic Share", timeout=10000)
            print("Result generated and Share button visible.")

            print("Verification SUCCESS.")

        except Exception as e:
            print(f"Verification FAILED: {e}")
            page.screenshot(path="verification/luxury_fitting_final_error.png")
            raise
        finally:
            browser.close()
            # Cleanup
            if os.path.exists("valid_user.jpg"):
                os.remove("valid_user.jpg")

if __name__ == "__main__":
    verify_luxury_fitting()
