#!/usr/bin/env python3
"""
COS Product Scraper
"""

import asyncio
import argparse
from datetime import datetime
from typing import List, Dict, Optional, Any
from playwright.async_api import Page
from base_scraper import BaseScraper
from config import BRAND_URLS

class CosScraper(BaseScraper):
    def __init__(self, limit: int = 50, test_mode: bool = False):
        super().__init__("COS", limit, test_mode)

    def get_category_url(self, category: str) -> Optional[str]:
        return BRAND_URLS["COS"].get(category)

    async def _extract_products(self, page: Page, category: str):
        product_elements = await page.query_selector_all(".product-tile")

        for i, element in enumerate(product_elements[:self.limit]):
            try:
                name_el = await element.query_selector(".product-title") or await element.query_selector(".pdp-link")
                price_el = await element.query_selector(".product-price") or await element.query_selector(".price")
                link_el = await element.query_selector("a")
                img_el = await element.query_selector("img")

                if not name_el: continue

                name = await name_el.inner_text()
                price_text = await price_el.inner_text() if price_el else "0"
                link = await link_el.get_attribute("href") if link_el else ""
                image_url = await img_el.get_attribute("src") if img_el else ""

                self.products.append({
                    "id": f"cos-{category}-{i+1}",
                    "name": name.strip(),
                    "brand": "COS",
                    "category": self.map_category(category),
                    "price": self.normalize_price(price_text, "KRW"), # Assuming KR site
                    "currency": "USD",
                    "imageUrl": image_url,
                    "productUrl": link if link.startswith("http") else f"https://www.cos.com{link}",
                    "sizes": ["XS", "S", "M", "L"],
                    "colors": [],
                    "isLuxury": False, # Premium high street
                    "scrapedAt": datetime.now().isoformat(),
                })

                print(f"   ✅ {i+1}. {name[:30]}...")

            except Exception as e:
                print(f"   ❌ Error scraping product {i+1}: {e}")
                continue

    def generate_mock_products(self, category: str, limit: int) -> List[Dict[str, Any]]:
        cat = self.map_category(category)
        mock_names = {
            "tops": ["Oversized T-Shirt", "Silk Shirt", "Knitted Vest", "Asymmetric Top", "Cotton Poplin Shirt"],
            "dresses": ["Volume Midi Dress", "T-Shirt Dress", "Knitted Maxi Dress", "Shirt Dress", "Pleated Dress"],
            "outerwear": ["Wool Coat", "Trench Coat", "Quilted Jacket", "Blazer", "Leather Jacket"],
            "bottoms": ["Wide-Leg Trousers", "Tapered Trousers", "Barrel Leg Jeans", "Midi Skirt", "Culottes"],
        }

        names = mock_names.get(cat, mock_names["tops"])
        products = []

        for i in range(limit):
            idx = i % len(names)
            products.append({
                "id": f"cos-{category}-{i+1}",
                "name": f"{names[idx]}",
                "brand": "COS",
                "category": cat,
                "price": round(69.00 + (i * 10), 2),
                "currency": "USD",
                "imageUrl": f"https://placehold.co/600x800?text=COS+{cat}+{i+1}",
                "productUrl": f"https://www.cos.com/mock-{i+1}",
                "sizes": ["XS", "S", "M", "L"],
                "colors": ["Black", "White", "Navy"],
                "isLuxury": False,
                "scrapedAt": datetime.now().isoformat(),
            })
        return products

async def main():
    parser = argparse.ArgumentParser(description="COS Scraper")
    parser.add_argument("--category", default="women-tops")
    parser.add_argument("--limit", type=int, default=50)
    parser.add_argument("--test", action="store_true")
    args = parser.parse_args()

    scraper = CosScraper(limit=args.limit, test_mode=args.test)
    await scraper.scrape(args.category)
    scraper.save_products()

if __name__ == "__main__":
    asyncio.run(main())
