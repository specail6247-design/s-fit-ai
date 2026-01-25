#!/usr/bin/env python3
"""
H&M Product Scraper
"""

import asyncio
import argparse
from datetime import datetime
from typing import List, Dict, Optional, Any
from playwright.async_api import Page
from base_scraper import BaseScraper
from config import BRAND_URLS
from material_mapper import MaterialMapper

class HMScraper(BaseScraper):
    def __init__(self, limit: int = 50, test_mode: bool = False):
        super().__init__("HM", limit, test_mode)

    def get_category_url(self, category: str) -> Optional[str]:
        return BRAND_URLS["HM"].get(category)

    async def _extract_products(self, page: Page, category: str):
        # Wait for products
        try:
            await page.wait_for_selector(".product-item", timeout=10000)
        except:
            print("   ⚠️ Timed out waiting for .product-item")

        product_elements = await page.query_selector_all(".product-item")
        print(f"   Found {len(product_elements)} items in grid.")

        for i, element in enumerate(product_elements[:self.limit]):
            try:
                name_el = await element.query_selector(".item-heading")
                price_el = await element.query_selector(".item-price")
                link_el = await element.query_selector("a.link")
                img_el = await element.query_selector(".item-image")

                if not name_el: continue

                name = await name_el.inner_text()
                price_text = await price_el.inner_text() if price_el else "0"
                link = await link_el.get_attribute("href") if link_el else ""
                image_url = await img_el.get_attribute("src") if img_el else ""

                if not image_url or "data:image" in image_url:
                     data_src = await img_el.get_attribute("data-src")
                     if data_src: image_url = data_src

                full_link = f"https://www2.hm.com{link}" if link and not link.startswith("http") else link

                # Deep scrape for materials
                composition_data = {}
                physics_data = {}

                if full_link:
                    try:
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

                self.products.append({
                    "id": f"hm-{category}-{i+1}",
                    "name": name.strip(),
                    "brand": "HM",
                    "category": self.map_category(category),
                    "price": self.normalize_price(price_text, "KRW"),
                    "currency": "USD",
                    "imageUrl": f"https:{image_url}" if image_url.startswith("//") else image_url,
                    "productUrl": full_link,
                    "sizes": ["XS", "S", "M", "L", "XL"],
                    "colors": [],
                    "composition": composition_data,
                    "physics": physics_data,
                    "isLuxury": False,
                    "scrapedAt": datetime.now().isoformat(),
                })

                print(f"   ✅ {i+1}. {name[:30]}...")
                await asyncio.sleep(1)

            except Exception as e:
                print(f"   ❌ Error scraping product {i+1}: {e}")
                continue

    def generate_mock_products(self, category: str, limit: int) -> List[Dict[str, Any]]:
        cat = self.map_category(category)
        mock_names = {
            "tops": ["Oversized Cotton Shirt", "Ribbed Tank Top", "Linen Blend Blouse", "Jersey Top", "Cropped Hoodie"],
            "dresses": ["Ribbed Knit Dress", "Satin Slip Dress", "Puff-sleeved Dress", "Shirt Dress", "Wrap Dress"],
            "outerwear": ["Single-breasted Jacket", "Denim Jacket", "Trench Coat", "Puffer Vest", "Wool Blend Coat"],
            "bottoms": ["Wide High Jeans", "Linen Trousers", "Cargo Pants", "Sweatpants", "A-line Skirt"],
        }

        names = mock_names.get(cat, mock_names["tops"])
        products = []

        for i in range(limit):
            idx = i % len(names)
            mat_text = "Cotton 100%"
            analysis = MaterialMapper.analyze_composition(mat_text)

            products.append({
                "id": f"hm-{category}-{i+1}",
                "name": f"{names[idx]}",
                "brand": "HM",
                "category": cat,
                "price": round(24.99 + (i * 5), 2),
                "currency": "USD",
                "imageUrl": f"https://placehold.co/600x800?text=HM+{cat}+{i+1}",
                "productUrl": f"https://www2.hm.com/mock-{i+1}",
                "sizes": ["XS", "S", "M", "L", "XL"],
                "colors": ["Black", "Beige", "Blue"],
                "composition": analysis["composition"],
                "physics": analysis["physics"],
                "isLuxury": False,
                "scrapedAt": datetime.now().isoformat(),
            })
        return products

async def main():
    parser = argparse.ArgumentParser(description="H&M Scraper")
    parser.add_argument("--category", default="women-tops")
    parser.add_argument("--limit", type=int, default=5)
    parser.add_argument("--test", action="store_true")
    args = parser.parse_args()

    scraper = HMScraper(limit=args.limit, test_mode=args.test)
    await scraper.scrape(args.category)
    scraper.save_products()

if __name__ == "__main__":
    asyncio.run(main())
