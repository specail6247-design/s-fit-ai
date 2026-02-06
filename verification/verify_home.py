from playwright.sync_api import sync_playwright

def verify_home():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        print("Navigating to Home...")
        page.goto("http://localhost:3000")

        # Check for main title
        if page.get_by_text("S_FIT NEO").is_visible():
            print("Title found.")
        else:
            print("Title NOT found.")
            exit(1)

        # Check for User Photo upload section (which we modified to use next/image or fallback)
        # We look for the "Identification" label
        if page.get_by_text("01. Identification").is_visible():
            print("Identification section found.")
        else:
            print("Identification section NOT found.")
            exit(1)

        # Check for Garment upload section
        if page.get_by_text("02. Target Garment").is_visible():
            print("Garment section found.")
        else:
            print("Garment section NOT found.")
            exit(1)

        print("Snapshotting...")
        page.screenshot(path="verification/home.png")
        print("Verification Successful!")
        browser.close()

if __name__ == "__main__":
    verify_home()
