#!/usr/bin/env python3
"""
Gucci Product Scraper for S_FIT AI
Scrapes luxury product data from Gucci website

Usage:
    python gucci_scraper.py --limit 20 --category women-ready-to-wear
    python gucci_scraper.py --test --limit 5
"""

import asyncio
import json
import argparse
from pathlib import Path
from datetime import datetime

try:
    from playwright.async_api import async_playwright
except ImportError:
    print("Playwright not installed. Run: pip install playwright && playwright install")
    exit(1)


GUCCI_CATEGORIES = {
    "women-ready-to-wear": "https://www.gucci.com/kr/ko/ca/women/ready-to-wear-c-women-readytowear",
    "women-dresses": "https://www.gucci.com/kr/ko/ca/women/ready-to-wear/dresses-c-women-dresses",
    "women-outerwear": "https://www.gucci.com/kr/ko/ca/women/ready-to-wear/coats-jackets-c-women-coats-jackets",
    "men-ready-to-wear": "https://www.gucci.com/kr/ko/ca/men/ready-to-wear-c-men-readytowear",
    "men-outerwear": "https://www.gucci.com/kr/ko/ca/men/ready-to-wear/coats-jackets-c-men-coats-jackets",
}

OUTPUT_DIR = Path(__file__).parent.parent.parent / "data" / "brands"


async def scrape_gucci_products(
    category: str = "women-ready-to-wear",
    limit: int = 20,
    test_mode: bool = False
) -> list[dict]:
    """Scrape products from Gucci website"""
    
    products = []
    url = GUCCI_CATEGORIES.get(category, GUCCI_CATEGORIES["women-ready-to-wear"])
    
    print(f"👜 Scraping Gucci: {category}")
    print(f"   URL: {url}")
    print(f"   Limit: {limit} products")
    
    if test_mode:
        print("   ⚠️ TEST MODE - Using mock data")
        return generate_mock_products(category, limit)
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={"width": 1920, "height": 1080},
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
        )
        page = await context.new_page()
        
        try:
            await page.goto(url, wait_until="networkidle", timeout=60000)
            await page.wait_for_timeout(5000)  # Gucci has heavy JS
            
            # Handle cookie consent if present
            try:
                accept_btn = await page.query_selector("[data-testid='accept-all-cookies']")
                if accept_btn:
                    await accept_btn.click()
                    await page.wait_for_timeout(1000)
            except:
                pass
            
            # Scroll to load more
            for _ in range(3):
                await page.keyboard.press("End")
                await page.wait_for_timeout(2000)
            
            # Get product elements
            product_elements = await page.query_selector_all(".product-tiles-grid-item")
            
            for i, element in enumerate(product_elements[:limit]):
                try:
                    name_el = await element.query_selector(".product-tiles-grid-item-title")
                    price_el = await element.query_selector(".product-tiles-grid-item-price")
                    link_el = await element.query_selector("a")
                    img_el = await element.query_selector("img")
                    
                    name = await name_el.inner_text() if name_el else f"Gucci Product {i+1}"
                    price_text = await price_el.inner_text() if price_el else "0"
                    link = await link_el.get_attribute("href") if link_el else ""
                    image_url = await img_el.get_attribute("src") if img_el else ""
                    
                    price = parse_price(price_text)
                    
                    products.append({
                        "id": f"gucci-{category}-{i+1}",
                        "name": name.strip(),
                        "brand": "Gucci",
                        "category": map_category(category),
                        "price": price,
                        "currency": "USD",
                        "imageUrl": image_url,
                        "productUrl": link if link.startswith("http") else f"https://www.gucci.com{link}",
                        "sizes": ["IT 36", "IT 38", "IT 40", "IT 42", "IT 44", "IT 46"],
                        "colors": [],
                        "isLuxury": True,
                        "scrapedAt": datetime.now().isoformat(),
                    })
                    
                    print(f"   ✅ {i+1}. {name[:30]}...")
                    
                except Exception as e:
                    print(f"   ❌ Error scraping product {i+1}: {e}")
                    continue
                    
        except Exception as e:
            print(f"❌ Scraping failed: {e}")
            print("   Falling back to mock data...")
            return generate_mock_products(category, limit)
            
        finally:
            await browser.close()
    
    return products


def parse_price(price_text: str) -> float:
    import re
    numbers = re.findall(r'[\d,]+', price_text)
    if numbers:
        price_krw = int(numbers[0].replace(",", ""))
        return round(price_krw / 1300, 2)
    return 0.0


def map_category(category: str) -> str:
    if "dresses" in category:
        return "dresses"
    elif "outerwear" in category or "coats" in category or "jackets" in category:
        return "outerwear"
    return "tops"


def generate_mock_products(category: str, limit: int) -> list[dict]:
    """Generate mock Gucci luxury products"""
    cat = map_category(category)
    mock_names = {
        "tops": ["GG 자카드 실크 블라우스", "플로라 프린트 크레이프 탑", "인터로킹 G 니트 탑", "레이스 트림 실크 셔츠", "GG 모노그램 캐시미어 스웨터"],
        "dresses": ["플로라 프린트 실크 드레스", "GG 캔버스 미디 드레스", "레이스 칵테일 드레스", "호스빗 디테일 저지 드레스", "크리스탈 엠브로이더리 가운"],
        "outerwear": ["GG 자카드 블레이저", "울 캐시미어 코트", "다운 퀼티드 자켓", "더블 G 트위드 재킷", "레더 라이더 자켓"],
    }
    
    names = mock_names.get(cat, mock_names["tops"])
    products = []
    
    for i in range(min(limit, len(names) * 2)):
        idx = i % len(names)
        products.append({
            "id": f"gucci-{category}-{i+1}",
            "name": f"{names[idx]}",
            "brand": "Gucci",
            "category": cat,
            "price": round(1500 + (i * 300), 2),
            "currency": "USD",
            "imageUrl": f"https://media.gucci.com/placeholder-{cat}-{i+1}.jpg",
            "productUrl": f"https://www.gucci.com/kr/ko/mock-product-{i+1}",
            "sizes": ["IT 36", "IT 38", "IT 40", "IT 42", "IT 44", "IT 46"],
            "colors": [["Black", "Ivory", "Multi"][i % 3]],
            "isLuxury": True,
            "scrapedAt": datetime.now().isoformat(),
        })
    
    return products


def save_products(products: list[dict], filename: str = "gucci.json"):
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    output_path = OUTPUT_DIR / filename
    
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump({
            "brand": "Gucci",
            "scrapedAt": datetime.now().isoformat(),
            "count": len(products),
            "products": products
        }, f, ensure_ascii=False, indent=2)
    
    print(f"\n💾 Saved {len(products)} products to {output_path}")


async def main():
    parser = argparse.ArgumentParser(description="Gucci Product Scraper")
    parser.add_argument("--category", default="women-ready-to-wear", choices=list(GUCCI_CATEGORIES.keys()))
    parser.add_argument("--limit", type=int, default=20)
    parser.add_argument("--test", action="store_true")
    args = parser.parse_args()
    
    products = await scrape_gucci_products(
        category=args.category,
        limit=args.limit,
        test_mode=args.test
    )
    
    save_products(products)
    print(f"\n✨ Done! Scraped {len(products)} Gucci products")


if __name__ == "__main__":
    asyncio.run(main())
