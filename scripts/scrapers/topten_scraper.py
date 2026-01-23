#!/usr/bin/env python3
"""
TOPTEN Product Scraper
"""

import asyncio
import argparse
from datetime import datetime
from typing import List, Dict, Optional, Any
from playwright.async_api import Page
from base_scraper import BaseScraper
from config import BRAND_URLS

class ToptenScraper(BaseScraper):
    def __init__(self, limit: int = 50, test_mode: bool = False):
        super().__init__("TOPTEN", limit, test_mode)

    def get_category_url(self, category: str) -> Optional[str]:
        return BRAND_URLS["TOPTEN"].get(category)

    async def _extract_products(self, page: Page, category: str):
        product_elements = await page.query_selector_all(".item_box")

        for i, element in enumerate(product_elements[:self.limit]):
            try:
                name_el = await element.query_selector(".name")
                price_el = await element.query_selector(".price")
                link_el = await element.query_selector("a")
                img_el = await element.query_selector(".thumb img")

                if not name_el: continue

                name = await name_el.inner_text()
                price_text = await price_el.inner_text() if price_el else "0"
                link = await link_el.get_attribute("href") if link_el else ""
                image_url = await img_el.get_attribute("src") if img_el else ""

                self.products.append({
                    "id": f"topten-{category}-{i+1}",
                    "name": name.strip(),
                    "brand": "TOPTEN",
                    "category": self.map_category(category),
                    "price": self.normalize_price(price_text, "KRW"),
                    "currency": "USD",
                    "imageUrl": image_url,
                    "productUrl": link if link.startswith("http") else f"https://topten.topten10mall.com{link}",
                    "sizes": ["85", "90", "95", "100", "105"],
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
            "tops": ["Cool Air T-Shirt", "Oxford Shirt", "Fleece Zip-Up", "Cotton Tee", "Hoodie"],
            "dresses": ["Pique Dress", "Linen Dress", "Shirt Dress", "Sweat Dress", "Maxi Dress"],
            "outerwear": ["Light Down Vest", "Fleece Jacket", "Windbreaker", "Puffer Coat", "Wool Coat"],
            "bottoms": ["Slacks", "Chino Pants", "Denim Jeans", "Jogger Pants", "Shorts"],
        }

        names = mock_names.get(cat, mock_names["tops"])
        products = []

        for i in range(limit):
            idx = i % len(names)
            products.append({
                "id": f"topten-{category}-{i+1}",
                "name": f"{names[idx]}",
                "brand": "TOPTEN",
                "category": cat,
                "price": round(19.90 + (i * 5), 2),
                "currency": "USD",
                "imageUrl": f"https://placehold.co/600x800?text=TOPTEN+{cat}+{i+1}",
                "productUrl": f"https://topten.topten10mall.com/mock-{i+1}",
                "sizes": ["90", "95", "100", "105"],
                "colors": ["Black", "White", "Grey"],
                "isLuxury": False,
                "scrapedAt": datetime.now().isoformat(),
            })
        return products

async def main():
    parser = argparse.ArgumentParser(description="TOPTEN Scraper")
    parser.add_argument("--category", default="women-tops")
    parser.add_argument("--limit", type=int, default=50)
    parser.add_argument("--test", action="store_true")
    args = parser.parse_args()

    scraper = ToptenScraper(limit=args.limit, test_mode=args.test)
    await scraper.scrape(args.category)
    scraper.save_products()

if __name__ == "__main__":
    asyncio.run(main())
