#!/usr/bin/env python3
"""
Massimo Dutti Product Scraper
"""

import asyncio
import argparse
from datetime import datetime
from typing import List, Dict, Optional, Any
from playwright.async_api import Page
from base_scraper import BaseScraper
from config import BRAND_URLS

class MassimoDuttiScraper(BaseScraper):
    def __init__(self, limit: int = 50, test_mode: bool = False):
        super().__init__("Massimo_Dutti", limit, test_mode)

    def get_category_url(self, category: str) -> Optional[str]:
        return BRAND_URLS["MASSIMO_DUTTI"].get(category)

    async def _extract_products(self, page: Page, category: str):
        product_elements = await page.query_selector_all("product-card") # Simplified selector assumption
        # If web components are used, might need different selection strategy
        if not product_elements:
            product_elements = await page.query_selector_all(".product-item")

        for i, element in enumerate(product_elements[:self.limit]):
            try:
                # Selectors depend on actual site structure which can be complex for Inditex brands
                name_el = await element.query_selector(".product-name") or await element.query_selector("h3")
                price_el = await element.query_selector(".product-price") or await element.query_selector(".price")
                link_el = await element.query_selector("a")
                img_el = await element.query_selector("img")

                if not name_el: continue

                name = await name_el.inner_text()
                price_text = await price_el.inner_text() if price_el else "0"
                link = await link_el.get_attribute("href") if link_el else ""
                image_url = await img_el.get_attribute("src") if img_el else ""

                self.products.append({
                    "id": f"md-{category}-{i+1}",
                    "name": name.strip(),
                    "brand": "Massimo Dutti",
                    "category": self.map_category(category),
                    "price": self.normalize_price(price_text, "KRW"),
                    "currency": "USD",
                    "imageUrl": image_url,
                    "productUrl": link if link.startswith("http") else f"https://www.massimodutti.com{link}",
                    "sizes": ["XS", "S", "M", "L"],
                    "colors": [],
                    "isLuxury": True,
                    "scrapedAt": datetime.now().isoformat(),
                })

                print(f"   ✅ {i+1}. {name[:30]}...")

            except Exception as e:
                print(f"   ❌ Error scraping product {i+1}: {e}")
                continue

    def generate_mock_products(self, category: str, limit: int) -> List[Dict[str, Any]]:
        cat = self.map_category(category)
        mock_names = {
            "tops": ["100% Linen Shirt", "Silk Shirt", "Cotton Poplin Shirt", "Knit Polo", "Cashmere Sweater"],
            "dresses": ["Linen Midi Dress", "Silk Slip Dress", "Pleated Dress", "Halter Neck Dress", "Knit Dress"],
            "outerwear": ["Nappa Leather Jacket", "Wool Coat", "Trench Coat", "Structured Blazer", "Down Jacket"],
            "bottoms": ["Linen Trousers", "Wool Trousers", "Straight Fit Jeans", "Pleated Skirt", "Bermuda Shorts"],
        }

        names = mock_names.get(cat, mock_names["tops"])
        products = []

        for i in range(limit):
            idx = i % len(names)
            products.append({
                "id": f"md-{category}-{i+1}",
                "name": f"{names[idx]}",
                "brand": "Massimo Dutti",
                "category": cat,
                "price": round(89.90 + (i * 20), 2),
                "currency": "USD",
                "imageUrl": f"https://placehold.co/600x800?text=MD+{cat}+{i+1}",
                "productUrl": f"https://www.massimodutti.com/mock-{i+1}",
                "sizes": ["XS", "S", "M", "L"],
                "colors": ["Beige", "White", "Navy"],
                "isLuxury": True,
                "scrapedAt": datetime.now().isoformat(),
            })
        return products

async def main():
    parser = argparse.ArgumentParser(description="Massimo Dutti Scraper")
    parser.add_argument("--category", default="women-tops")
    parser.add_argument("--limit", type=int, default=50)
    parser.add_argument("--test", action="store_true")
    args = parser.parse_args()

    scraper = MassimoDuttiScraper(limit=args.limit, test_mode=args.test)
    await scraper.scrape(args.category)
    scraper.save_products()

if __name__ == "__main__":
    asyncio.run(main())
