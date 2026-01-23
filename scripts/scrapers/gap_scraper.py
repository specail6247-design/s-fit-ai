#!/usr/bin/env python3
"""
GAP Product Scraper
"""

import asyncio
import argparse
from datetime import datetime
from typing import List, Dict, Optional, Any
from playwright.async_api import Page
from base_scraper import BaseScraper
from config import BRAND_URLS

class GapScraper(BaseScraper):
    def __init__(self, limit: int = 50, test_mode: bool = False):
        super().__init__("GAP", limit, test_mode)

    def get_category_url(self, category: str) -> Optional[str]:
        return BRAND_URLS["GAP"].get(category)

    async def _extract_products(self, page: Page, category: str):
        product_elements = await page.query_selector_all(".product-card")

        for i, element in enumerate(product_elements[:self.limit]):
            try:
                name_el = await element.query_selector(".product-card__name")
                price_el = await element.query_selector(".product-card__price")
                link_el = await element.query_selector("a.product-card__link")
                img_el = await element.query_selector("img.product-card__image")

                if not name_el: continue

                name = await name_el.inner_text()
                price_text = await price_el.inner_text() if price_el else "0"
                link = await link_el.get_attribute("href") if link_el else ""
                image_url = await img_el.get_attribute("src") if img_el else ""

                self.products.append({
                    "id": f"gap-{category}-{i+1}",
                    "name": name.strip(),
                    "brand": "GAP",
                    "category": self.map_category(category),
                    # Gap US uses USD directly usually, but check currency
                    "price": self.normalize_price(price_text, "USD"),
                    "currency": "USD",
                    "imageUrl": image_url,
                    "productUrl": link if link.startswith("http") else f"https://www.gap.com{link}",
                    "sizes": ["XS", "S", "M", "L", "XL"],
                    "colors": [],
                    "isLuxury": False,
                    "scrapedAt": datetime.now().isoformat(),
                })

                print(f"   ✅ {i+1}. {name[:30]}...")

            except Exception as e:
                print(f"   ❌ Error scraping product {i+1}: {e}")
                continue

    def generate_mock_products(self, category: str, limit: int) -> List[Dict[str, Any]]:
        cat = self.map_category(category)
        mock_names = {
            "tops": ["Modern Crewneck T-Shirt", "Big Shirt", "Vintage Soft Hoodie", "Gap Logo Hoodie", "Ribbed Tank"],
            "dresses": ["Tiered Midi Dress", "Denim Mini Dress", "Sleeveless Midi Dress", "T-Shirt Dress", "Wrap Front Dress"],
            "outerwear": ["Icon Denim Jacket", "Utility Jacket", "Puffer Vest", "Relaxed Blazer", "Trench Coat"],
            "bottoms": ["90s Loose Jeans", "Khaki Pants", "Girlfriend Jeans", "Fleece Joggers", "Denim Shorts"],
        }

        names = mock_names.get(cat, mock_names["tops"])
        products = []

        for i in range(limit):
            idx = i % len(names)
            products.append({
                "id": f"gap-{category}-{i+1}",
                "name": f"{names[idx]}",
                "brand": "GAP",
                "category": cat,
                "price": round(39.95 + (i * 5), 2),
                "currency": "USD",
                "imageUrl": f"https://placehold.co/600x800?text=GAP+{cat}+{i+1}",
                "productUrl": f"https://www.gap.com/mock-{i+1}",
                "sizes": ["XS", "S", "M", "L", "XL"],
                "colors": ["Navy", "White", "Grey"],
                "isLuxury": False,
                "scrapedAt": datetime.now().isoformat(),
            })
        return products

async def main():
    parser = argparse.ArgumentParser(description="GAP Scraper")
    parser.add_argument("--category", default="women-tops")
    parser.add_argument("--limit", type=int, default=50)
    parser.add_argument("--test", action="store_true")
    args = parser.parse_args()

    scraper = GapScraper(limit=args.limit, test_mode=args.test)
    await scraper.scrape(args.category)
    scraper.save_products()

if __name__ == "__main__":
    asyncio.run(main())
