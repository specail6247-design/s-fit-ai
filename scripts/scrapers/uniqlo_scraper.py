#!/usr/bin/env python3
"""
Uniqlo Product Scraper for S_FIT AI
Scrapes product data from Uniqlo website

Usage:
    python uniqlo_scraper.py --limit 50 --category women-tops
    python uniqlo_scraper.py --test --limit 5
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


UNIQLO_CATEGORIES = {
    "women-tops": "https://www.uniqlo.com/kr/ko/women/tops",
    "women-dresses": "https://www.uniqlo.com/kr/ko/women/dresses-jumpsuits",
    "women-outerwear": "https://www.uniqlo.com/kr/ko/women/outerwear",
    "women-bottoms": "https://www.uniqlo.com/kr/ko/women/bottoms",
    "men-tops": "https://www.uniqlo.com/kr/ko/men/tops", 
    "men-outerwear": "https://www.uniqlo.com/kr/ko/men/outerwear",
    "men-bottoms": "https://www.uniqlo.com/kr/ko/men/bottoms",
}

OUTPUT_DIR = Path(__file__).parent.parent.parent / "data" / "brands"


async def scrape_uniqlo_products(
    category: str = "women-tops",
    limit: int = 50,
    test_mode: bool = False
) -> list[dict]:
    """Scrape products from Uniqlo website"""
    
    products = []
    url = UNIQLO_CATEGORIES.get(category, UNIQLO_CATEGORIES["women-tops"])
    
    print(f"🛍️ Scraping Uniqlo: {category}")
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
            await page.wait_for_timeout(3000)
            
            # Scroll to load more
            for _ in range(5):
                await page.keyboard.press("End")
                await page.wait_for_timeout(1500)
            
            # Get product elements
            product_elements = await page.query_selector_all("[data-test='product-tile']")
            
            for i, element in enumerate(product_elements[:limit]):
                try:
                    name_el = await element.query_selector("[data-test='product-tile-name']")
                    price_el = await element.query_selector("[data-test='product-tile-price']")
                    link_el = await element.query_selector("a")
                    img_el = await element.query_selector("img")
                    
                    name = await name_el.inner_text() if name_el else f"Uniqlo Product {i+1}"
                    price_text = await price_el.inner_text() if price_el else "0"
                    link = await link_el.get_attribute("href") if link_el else ""
                    image_url = await img_el.get_attribute("src") if img_el else ""
                    
                    price = parse_price(price_text)
                    
                    products.append({
                        "id": f"uniqlo-{category}-{i+1}",
                        "name": name.strip(),
                        "brand": "Uniqlo",
                        "category": map_category(category),
                        "price": price,
                        "currency": "USD",
                        "imageUrl": image_url,
                        "productUrl": link if link.startswith("http") else f"https://www.uniqlo.com{link}",
                        "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
                        "colors": [],
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
    if "tops" in category:
        return "tops"
    elif "dresses" in category:
        return "dresses"
    elif "outerwear" in category:
        return "outerwear"
    elif "bottoms" in category or "pants" in category:
        return "bottoms"
    return "tops"


def generate_mock_products(category: str, limit: int) -> list[dict]:
    """Generate mock Uniqlo products"""
    cat = map_category(category)
    mock_names = {
        "tops": ["에어리즘 코튼 티셔츠", "수피마 코튼 셔츠", "U 크루넥 티", "리넨 블렌드 셔츠", "히트텍 크루넥"],
        "dresses": ["머서라이즈 코튼 원피스", "저지 맥시 드레스", "레이온 프린트 원피스", "니트 원피스", "U 슬리브리스 드레스"],
        "outerwear": ["울트라라이트다운", "시어링 플리스 자켓", "울 블렌드 코트", "하이브리드다운", "스웨트 집업"],
        "bottoms": ["이지 앵클 팬츠", "스마트 앵클 팬츠", "스트레치 슬림핏 진", "와이드핏 치노", "에어리즘 숏팬츠"],
    }
    
    names = mock_names.get(cat, mock_names["tops"])
    products = []
    
    for i in range(min(limit, len(names) * 3)):
        idx = i % len(names)
        products.append({
            "id": f"uniqlo-{category}-{i+1}",
            "name": f"{names[idx]} {['블랙', '화이트', '그레이'][i % 3]}",
            "brand": "Uniqlo",
            "category": cat,
            "price": round(19.9 + (i * 5), 2),
            "currency": "USD",
            "imageUrl": f"https://image.uniqlo.com/placeholder-{cat}-{i+1}.jpg",
            "productUrl": f"https://www.uniqlo.com/kr/ko/products/mock-{i+1}",
            "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
            "colors": [["Black", "White", "Gray"][i % 3]],
            "scrapedAt": datetime.now().isoformat(),
        })
    
    return products


def save_products(products: list[dict], filename: str = "uniqlo.json"):
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    output_path = OUTPUT_DIR / filename
    
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump({
            "brand": "Uniqlo",
            "scrapedAt": datetime.now().isoformat(),
            "count": len(products),
            "products": products
        }, f, ensure_ascii=False, indent=2)
    
    print(f"\n💾 Saved {len(products)} products to {output_path}")


async def main():
    parser = argparse.ArgumentParser(description="Uniqlo Product Scraper")
    parser.add_argument("--category", default="women-tops", choices=list(UNIQLO_CATEGORIES.keys()))
    parser.add_argument("--limit", type=int, default=50)
    parser.add_argument("--test", action="store_true")
    args = parser.parse_args()
    
    products = await scrape_uniqlo_products(
        category=args.category,
        limit=args.limit,
        test_mode=args.test
    )
    
    save_products(products)
    print(f"\n✨ Done! Scraped {len(products)} Uniqlo products")


if __name__ == "__main__":
    asyncio.run(main())
