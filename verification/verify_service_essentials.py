from playwright.sync_api import sync_playwright, expect

def verify_service_essentials(page):
    print("Navigating to home...")
    page.goto("http://localhost:3000")

    # Wait for the page to load
    page.wait_for_selector("text=S_FIT NEO")

    # 1. Verify Member Access Modal
    print("Clicking Member Access...")
    page.get_by_role("button", name="Member Access").click()
    page.wait_for_selector("text=MEMBER ACCESS")
    page.wait_for_selector("text=S_FIT PRIVATE CLUB")

    # Screenshot Modal
    print("Taking screenshot of Member Modal...")
    page.screenshot(path="verification/member_modal.png")

    # Close Modal
    print("Closing modal...")
    page.get_by_role("button", name="✕").first.click()

    # 2. Verify Support Hub
    print("Clicking Support Hub...")
    # The text is "Need Help? Support Hub", button contains text
    page.get_by_text("Need Help? Support Hub").click()
    page.wait_for_selector("text=SUPPORT HUB")

    # Check tabs
    print("Checking User Guide Tab...")
    page.get_by_role("button", name="User Guide").click()
    page.wait_for_selector("text=Upload User Photo") # First step of carousel

    # Check Caution inside User Guide
    print("Checking Caution...")
    page.wait_for_selector("text=Critical Caution")
    page.wait_for_selector("text=Lighting must be even")

    # Screenshot Guide
    print("Taking screenshot of Support Hub (Guide)...")
    page.screenshot(path="verification/support_hub_guide.png")

    # Check Q&A Tab
    print("Checking Q&A Tab...")
    page.get_by_role("button", name="Q&A").click()
    page.wait_for_selector("text=Is my data private?")

    # Expand an accordion
    print("Expanding FAQ...")
    page.get_by_text("Is my data private?").click()
    page.wait_for_selector("text=Your photos are processed in real-time")

    # Screenshot Q&A
    print("Taking screenshot of Support Hub (Q&A)...")
    page.screenshot(path="verification/support_hub_faq.png")
    print("Verification Complete!")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_service_essentials(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error_state.png")
            raise e
        finally:
            browser.close()
