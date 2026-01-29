from playwright.sync_api import sync_playwright

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        page.on("console", lambda msg: print(f"Browser Console: {msg.text}"))
        page.on("pageerror", lambda err: print(f"Browser Error: {err}"))

        print("Checking Luxury Fitting...")
        page.goto("http://localhost:3000/luxury/fitting")

        try:
            page.wait_for_selector("text=Masterpiece", timeout=5000)
            print("Luxury Fitting Loaded.")
        except Exception as e:
            print("Timeout waiting for selector.")
            page.screenshot(path="debug_luxury_fail.png")

        browser.close()

if __name__ == "__main__":
    verify()
