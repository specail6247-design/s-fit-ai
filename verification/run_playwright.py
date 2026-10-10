from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(record_video_dir="verification/videos")

        # Navigate to the luxury fitting page
        page.goto("http://localhost:3000/luxury/fitting")
        # Wait for the loading animation to finish (it has a 2s timeout)
        page.wait_for_timeout(2500)
        page.wait_for_selector("text=Luxury Mode")

        # Take a screenshot of the initial state
        page.screenshot(path="verification/screenshots/luxury-fitting-initial.png")

        # Click on the Chanel brand
        page.click("text=Chanel")
        page.wait_for_timeout(1000)

        # Take a screenshot of the Chanel brand selection
        page.screenshot(path="verification/screenshots/luxury-fitting-chanel.png")

        # Click on the first product's Virtual Try-On button
        page.click("button:has-text('Virtual Try-On')")
        page.wait_for_timeout(1000)

        # Take a screenshot of the digital mirror state
        page.screenshot(path="verification/screenshots/luxury-fitting-mirror.png")

        # Click the exit mirror button
        page.click("button:has-text('Exit Mirror')")
        page.wait_for_timeout(1000)

        # Close the browser
        browser.close()

if __name__ == "__main__":
    run()
