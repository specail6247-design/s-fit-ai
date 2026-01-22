import json
import time
import random
import os
from playwright.sync_api import sync_playwright, Page
from fake_useragent import UserAgent

# Configuration
OUTPUT_FILE = "data/scraped_products.json"
HEADLESS = True  # Set to False for debugging

def get_stealth_context(browser):
    """
    Creates a browser context with stealth properties to avoid bot detection.
    """
    ua = UserAgent()
    user_agent = ua.random

    # Randomize viewport slightly
    width = 1920 + random.randint(-100, 100)
    height = 1080 + random.randint(-100, 100)

    context = browser.new_context(
        user_agent=user_agent,
        viewport={"width": width, "height": height},
        locale="en-US",
        timezone_id="America/Los_Angeles",
        has_touch=True
    )

    # Inject scripts to mask automation
    context.add_init_script("""
        Object.defineProperty(navigator, 'webdriver', {
            get: () => undefined
        });
        Object.defineProperty(navigator, 'languages', {
            get: () => ['en-US', 'en']
        });
        Object.defineProperty(navigator, 'plugins', {
            get: () => [1, 2, 3, 4, 5]
        });
    """)

    return context

def human_scroll(page: Page, max_scrolls=50):
    """
    Simulates human-like scrolling to trigger lazy loading.
    Scrolls until the page height stops increasing or max_scrolls reached.
    """
    print("  Adding human-like scrolling...")
    try:
        last_height = page.evaluate("document.body.scrollHeight")
        consecutive_no_change = 0

        for i in range(max_scrolls):
            # Scroll down by random amounts
            scroll_amount = random.randint(300, 800)
            page.mouse.wheel(0, scroll_amount)
            time.sleep(random.uniform(0.5, 1.5))

            # Occasionally scroll up a bit to simulate reading/pausing
            if random.random() < 0.2:
                page.mouse.wheel(0, -200)
                time.sleep(random.uniform(0.5, 1.0))

            new_height = page.evaluate("document.body.scrollHeight")

            if new_height == last_height:
                consecutive_no_change += 1
                if consecutive_no_change >= 3: # Stop if height hasn't changed for 3 iterations
                    print("  Reached bottom of page (height constant).")
                    break
            else:
                consecutive_no_change = 0
                last_height = new_height

            if i % 10 == 0:
                print(f"  Scrolled {i} times...")

    except Exception as e:
        print(f"  Scroll warning: {e}")

def scrape_zara(context):
    print("Starting ZARA Scraper...")
    page = context.new_page()
    results = []

    try:
        url = "https://www.zara.com/us/en/woman-new-in-l1180.html"
        page.goto(url, timeout=60000, wait_until="domcontentloaded")
        time.sleep(3)
        human_scroll(page)

        products = page.locator("li.product-grid-product")
        count = products.count()
        print(f"  Found {count} potential products")

        for i in range(count):
            try:
                p = products.nth(i)
                name = p.locator(".product-grid-product-info__name").first.inner_text()
                price = p.locator(".money-amount__main").first.inner_text()
                image_url = p.locator("img").first.get_attribute("src")

                if name and price and image_url:
                    results.append({
                        "brand": "ZARA",
                        "name": name,
                        "price": price,
                        "imageUrl": image_url,
                        "url": page.url
                    })
            except Exception:
                continue
    except Exception as e:
        print(f"  ZARA scraping failed: {e}")
    finally:
        page.close()
    return results

def scrape_uniqlo(context):
    print("Starting Uniqlo Scraper...")
    page = context.new_page()
    results = []

    try:
        url = "https://www.uniqlo.com/us/en/feature/new/women"
        page.goto(url, timeout=60000, wait_until="domcontentloaded")
        time.sleep(3)
        human_scroll(page)

        products = page.locator("article.fr-product-card")
        if products.count() == 0: products = page.locator(".product-tile")

        count = products.count()
        print(f"  Found {count} potential products")

        for i in range(count):
            try:
                p = products.nth(i)
                name = p.locator("h3").first.inner_text()
                price_elem = p.locator(".fr-price-currency").first
                price_val = p.locator(".fr-price-value").first
                price = ""
                if price_elem.count() > 0 and price_val.count() > 0:
                     price = price_elem.inner_text() + price_val.inner_text()

                image_url = p.locator("img").first.get_attribute("src")

                if name and image_url:
                    results.append({
                        "brand": "Uniqlo",
                        "name": name,
                        "price": price if price else "N/A",
                        "imageUrl": image_url,
                        "url": page.url
                    })
            except Exception:
                continue
    except Exception as e:
        print(f"  Uniqlo scraping failed: {e}")
    finally:
        page.close()
    return results

def scrape_chanel(context):
    print("Starting Chanel Scraper...")
    page = context.new_page()
    results = []
    try:
        url = "https://www.chanel.com/us/fashion/ready-to-wear/c/1x1x1/"
        page.goto(url, timeout=60000, wait_until="domcontentloaded")
        time.sleep(4)
        human_scroll(page)

        products = page.locator(".product-item")
        if products.count() == 0: products = page.locator("[data-test='product-card']")

        count = products.count()
        print(f"  Found {count} potential products")

        for i in range(count):
            try:
                p = products.nth(i)
                name = p.locator(".product-details__title, [data-test='product-title']").first.inner_text()
                price = "Price on request"
                if p.locator(".product-details__price, [data-test='product-price']").count() > 0:
                    price = p.locator(".product-details__price, [data-test='product-price']").first.inner_text()

                image_url = ""
                img = p.locator("img").first
                if img.count() > 0:
                    image_url = img.get_attribute("src") or img.get_attribute("data-src")

                if name and image_url:
                    results.append({
                        "brand": "Chanel",
                        "name": name,
                        "price": price,
                        "imageUrl": image_url,
                        "url": page.url
                    })
            except Exception:
                continue
    except Exception as e:
        print(f"  Chanel scraping failed: {e}")
    finally:
        page.close()
    return results

def scrape_gucci(context):
    print("Starting Gucci Scraper...")
    page = context.new_page()
    results = []
    try:
        url = "https://www.gucci.com/us/en/ca/women/new-in-c-women-new"
        page.goto(url, timeout=60000, wait_until="domcontentloaded")
        time.sleep(4)
        human_scroll(page)

        products = page.locator(".product-tile, [data-test='product-tile']")
        count = products.count()
        print(f"  Found {count} potential products")

        for i in range(count):
            try:
                p = products.nth(i)
                name = p.locator(".product-detail-text, [data-test='product-name']").first.inner_text()
                price = p.locator(".price, [data-test='product-price']").first.inner_text()

                image_url = ""
                img = p.locator("img").first
                if img.count() > 0:
                    image_url = img.get_attribute("src") or img.get_attribute("data-src") or img.get_attribute("srcset")
                    if image_url and " " in image_url:
                         image_url = image_url.split(" ")[0]

                if name and image_url:
                    results.append({
                        "brand": "Gucci",
                        "name": name,
                        "price": price,
                        "imageUrl": image_url,
                        "url": page.url
                    })
            except Exception:
                continue
    except Exception as e:
        print(f"  Gucci scraping failed: {e}")
    finally:
        page.close()
    return results

def scrape_musinsa(context):
    print("Starting Musinsa Scraper...")
    page = context.new_page()
    results = []
    try:
        url = "https://global.musinsa.com/us/ranking"
        page.goto(url, timeout=60000, wait_until="domcontentloaded")
        time.sleep(3)
        human_scroll(page)

        products = page.locator("a[href*='/goods/'], .product-item")
        if products.count() == 0:
             products = page.locator("li.goods-item")

        count = products.count()
        print(f"  Found {count} potential products")

        for i in range(count):
            try:
                p = products.nth(i)
                name = p.locator(".goods-name, .item_title").first.inner_text()
                price = p.locator(".goods-price, .item_price").first.inner_text()

                image_url = ""
                img = p.locator("img").first
                if img.count() > 0:
                    image_url = img.get_attribute("src")

                if name and image_url:
                    results.append({
                        "brand": "Musinsa",
                        "name": name,
                        "price": price,
                        "imageUrl": image_url,
                        "url": page.url
                    })
            except Exception:
                continue
    except Exception as e:
        print(f"  Musinsa scraping failed: {e}")
    finally:
        page.close()
    return results

def main():
    if not os.path.exists("data"):
        os.makedirs("data")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=HEADLESS)
        context = get_stealth_context(browser)

        all_products = []

        # Run scrapers
        all_products.extend(scrape_zara(context))
        all_products.extend(scrape_uniqlo(context))
        all_products.extend(scrape_chanel(context))
        all_products.extend(scrape_gucci(context))
        all_products.extend(scrape_musinsa(context))

        browser.close()

        print(f"Total products scraped: {len(all_products)}")

        with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
            json.dump(all_products, f, indent=2, ensure_ascii=False)
        print(f"Saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
