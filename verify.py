from playwright.sync_api import sync_playwright

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Go to home page
        page.goto("http://localhost:3000")

        # Take a screenshot of the main page (should show the ? button and MEMBER ACCESS button)
        page.screenshot(path="verification_main.png")

        # Click the Support Hub button
        page.locator("button:has-text('?')").click()

        # Wait for drawer to open and text to be visible
        page.locator("text=SUPPORT HUB").wait_for(state="visible")

        # Take a screenshot of the Support Hub drawer
        page.screenshot(path="verification_supporthub.png")

        # Open the FAQ accordion to check
        page.locator("summary:has-text('Is my photo safe?')").click()
        page.screenshot(path="verification_faq.png")

        # Check Member Access modal
        page.goto("http://localhost:3000")
        page.locator("button:has-text('MEMBER ACCESS')").click()
        page.locator("text=SIGN IN").wait_for(state="visible")

        # Take a screenshot of the Login modal
        page.screenshot(path="verification_login.png")

        browser.close()

if __name__ == "__main__":
    verify()
