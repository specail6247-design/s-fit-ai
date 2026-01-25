#!/usr/bin/env python3
"""
ZARA Product Scraper
"""

import asyncio
import argparse
from datetime import datetime
from typing import List, Dict, Optional, Any
from playwright.async_api import Page
from base_scraper import BaseScraper
from config import BRAND_URLS
from material_mapper import MaterialMapper

class ZaraScraper(BaseScraper):
    def __init__(self, limit: int = 50, test_mode: bool = False):
        super().__init__("ZARA", limit, test_mode)

    def get_category_url(self, category: str) -> Optional[str]:
        return BRAND_URLS["ZARA"].get(category)

    async def _extract_products(self, page: Page, category: str):
        # Specific ZARA selectors
        # Wait for grid to load
        await page.wait_for_selector(".product-grid-product", timeout=10000)
        product_elements = await page.query_selector_all(".product-grid-product")
        
        print(f"   Found {len(product_elements)} items in grid.")

        for i, element in enumerate(product_elements[:self.limit]):
            try:
                name_el = await element.query_selector(".product-grid-product-info__name")
                price_el = await element.query_selector(".money-amount__main")
                link_el = await element.query_selector("a.product-link")
                img_el = await element.query_selector("img.media-image__image")

                if not name_el: continue

                name = await name_el.inner_text()
                price_text = await price_el.inner_text() if price_el else "0"
                link = await link_el.get_attribute("href") if link_el else ""
                image_url = await img_el.get_attribute("src") if img_el else ""

                if not image_url or "data:image" in image_url:
                    pass

                # Deep scrape for materials
                composition_data = {}
                physics_data = {}

                if link:
                    full_link = link if link.startswith("http") else f"https://www.zara.com{link}"
                    try:
                        # Open in new page to keep grid intact
                        new_page = await page.context.new_page()
                        await new_page.goto(full_link, timeout=45000, wait_until="domcontentloaded")

                        mat_text = await self.get_material_text(new_page)
                        analysis = MaterialMapper.analyze_composition(mat_text)

                        composition_data = analysis["composition"]
                        physics_data = analysis["physics"]
                        print(f"     Material: {analysis['texture_type']} ({len(composition_data)} comps)")

                        await new_page.close()
                    except Exception as e:
                        print(f"     ⚠️ Material scrape warning: {e}")
                        # Keep going with defaults

                self.products.append({
                    "id": f"zara-{category}-{i+1}",
                    "name": name.strip(),
                    "brand": "ZARA",
                    "category": self.map_category(category),
                    "price": self.normalize_price(price_text, "KRW"),
                    "currency": "USD",
                    "imageUrl": image_url,
                    "productUrl": full_link,
                    "sizes": ["XS", "S", "M", "L", "XL"],
                    "colors": [],
                    "composition": composition_data,
                    "physics": physics_data,
                    "isLuxury": False,
                    "scrapedAt": datetime.now().isoformat(),
                })

                print(f"   ✅ {i+1}. {name[:30]}...")

                # Small delay to be polite
                await asyncio.sleep(1)

            except Exception as e:
                print(f"   ❌ Error scraping product {i+1}: {e}")
                continue

    def generate_mock_products(self, category: str, limit: int) -> List[Dict[str, Any]]:
        cat = self.map_category(category)
        mock_names = {
            "tops": ["Oversized Shirt", "Cropped Blouse", "Knit Top", "Linen Shirt", "Satin Blouse"],
            "dresses": ["Pleated Midi Dress", "Knit Dress", "Satin Maxi Dress", "Denim Shirt Dress", "Floral Mini Dress"],
            "outerwear": ["Oversized Blazer", "Leather Jacket", "Trench Coat", "Puffer Jacket", "Double Breasted Coat"],
            "bottoms": ["Wide Leg Pants", "Straight Jeans", "Pleated Skirt", "Cargo Pants", "Slim Slacks"],
        }

        names = mock_names.get(cat, mock_names["tops"])
        products = []

        for i in range(limit):
            idx = i % len(names)
            mat_text = "100% Cotton"
            analysis = MaterialMapper.analyze_composition(mat_text)

            products.append({
                "id": f"zara-{category}-{i+1}",
                "name": f"{names[idx]}",
                "brand": "ZARA",
                "category": cat,
                "price": round(29.9 + (i * 10), 2),
                "currency": "USD",
                "imageUrl": f"https://placehold.co/600x800?text=ZARA+{cat}+{i+1}",
                "productUrl": f"https://www.zara.com/mock-{i+1}",
                "sizes": ["XS", "S", "M", "L", "XL"],
                "colors": ["Black", "White", "Navy"],
                "composition": analysis["composition"],
                "physics": analysis["physics"],
                "isLuxury": False,
                "scrapedAt": datetime.now().isoformat(),
            })
        return products

async def main():
    parser = argparse.ArgumentParser(description="ZARA Scraper")
    parser.add_argument("--category", default="women-tops")
    parser.add_argument("--limit", type=int, default=5)
    parser.add_argument("--test", action="store_true")
    args = parser.parse_args()
    
    scraper = ZaraScraper(limit=args.limit, test_mode=args.test)
    await scraper.scrape(args.category)
    scraper.save_products()

if __name__ == "__main__":
    asyncio.run(main())
