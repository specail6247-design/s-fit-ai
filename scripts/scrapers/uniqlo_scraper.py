#!/usr/bin/env python3
"""
UNIQLO Product Scraper
"""

import asyncio
import argparse
from datetime import datetime
from typing import List, Dict, Optional, Any
from playwright.async_api import Page
from base_scraper import BaseScraper
from config import BRAND_URLS
from material_mapper import MaterialMapper

class UniqloScraper(BaseScraper):
    def __init__(self, limit: int = 50, test_mode: bool = False):
        super().__init__("UNIQLO", limit, test_mode)

    def get_category_url(self, category: str) -> Optional[str]:
        return BRAND_URLS["UNIQLO"].get(category)

    async def _extract_products(self, page: Page, category: str):
        # Uniqlo uses a grid. We'll look for links to products.
        try:
            await page.wait_for_selector("a[href*='/products/']", timeout=15000)
        except:
            print("   ⚠️ Timeout waiting for product links.")

        product_links = await page.query_selector_all("a[href*='/products/']")
        
        # Deduplicate links (often multiple links per product card)
        seen_urls = set()
        unique_urls = []
        for link in product_links:
            href = await link.get_attribute("href")
            if not href: continue

            # Normalize URL
            if href.startswith("//"): href = "https:" + href
            elif href.startswith("/"): href = "https://www.uniqlo.com" + href

            # Filter for actual product pages (usually contain /products/E...)
            if "/products/" in href and href not in seen_urls:
                # Avoid review anchors etc
                if "#" in href: href = href.split("#")[0]

                if href not in seen_urls:
                    seen_urls.add(href)
                    unique_urls.append(href)

        print(f"   Found {len(unique_urls)} unique product items.")

        for i, full_url in enumerate(unique_urls[:self.limit]):
            try:
                print(f"   Analyzing product {i+1}...")

                # Open product page
                new_page = await page.context.new_page()
                try:
                    await new_page.goto(full_url, timeout=45000, wait_until="domcontentloaded")

                    # Extract Data from Detail Page
                    name_el = await new_page.query_selector("h1")
                    name = await name_el.inner_text() if name_el else "Uniqlo Item"

                    price_el = await new_page.query_selector(".price, .fr-price")
                    price_text = await price_el.inner_text() if price_el else "0"

                    # Try to find main image
                    image_url = ""
                    # Common selectors for Uniqlo main image
                    img_candidates = await new_page.query_selector_all("img")
                    for img in img_candidates:
                        src = await img.get_attribute("src")
                        alt = await img.get_attribute("alt")
                        # Heuristic: usually large and has product name or is first large image
                        if src and "goods" in src and "width" in src:
                            image_url = src
                            break

                    if not image_url and img_candidates:
                        image_url = await img_candidates[0].get_attribute("src")

                    # Material
                    mat_text = await self.get_material_text(new_page)
                    analysis = MaterialMapper.analyze_composition(mat_text)

                    composition_data = analysis["composition"]
                    physics_data = analysis["physics"]
                    print(f"     Material: {analysis['texture_type']} ({len(composition_data)} comps)")

                    self.products.append({
                        "id": f"uniqlo-{category}-{i+1}",
                        "name": name.strip(),
                        "brand": "Uniqlo",
                        "category": self.map_category(category),
                        "price": self.normalize_price(price_text, "KRW"), # Config uses KRW URLs
                        "currency": "USD",
                        "imageUrl": image_url,
                        "productUrl": full_url,
                        "sizes": ["XS", "S", "M", "L", "XL"],
                        "colors": [],
                        "composition": composition_data,
                        "physics": physics_data,
                        "isLuxury": False,
                        "scrapedAt": datetime.now().isoformat(),
                    })

                finally:
                    await new_page.close()

                await asyncio.sleep(1)

            except Exception as e:
                print(f"   ❌ Error scraping product {i+1}: {e}")
                continue

    def generate_mock_products(self, category: str, limit: int) -> List[Dict[str, Any]]:
        cat = self.map_category(category)
        mock_names = ["AIRism Cotton T-Shirt", "HEATTECH Turtleneck", "Ultra Light Down Jacket", "Pleated Wide Pants"]
        products = []

        for i in range(limit):
            idx = i % len(mock_names)
            mat_text = "Cotton 50%, Polyester 50%"
            analysis = MaterialMapper.analyze_composition(mat_text)

            products.append({
                "id": f"uniqlo-{category}-{i+1}",
                "name": f"{mock_names[idx]}",
                "brand": "Uniqlo",
                "category": cat,
                "price": 19.90 + (i * 10),
                "currency": "USD",
                "imageUrl": f"https://placehold.co/600x800?text=UNIQLO+{cat}+{i+1}",
                "productUrl": f"https://www.uniqlo.com/mock-{i+1}",
                "sizes": ["XS", "S", "M", "L", "XL"],
                "colors": ["Black", "White", "Beige"],
                "composition": analysis["composition"],
                "physics": analysis["physics"],
                "isLuxury": False,
                "scrapedAt": datetime.now().isoformat(),
            })
        return products

async def main():
    parser = argparse.ArgumentParser(description="Uniqlo Scraper")
    parser.add_argument("--category", default="women-tops")
    parser.add_argument("--limit", type=int, default=5)
    parser.add_argument("--test", action="store_true")
    args = parser.parse_args()

    scraper = UniqloScraper(limit=args.limit, test_mode=args.test)
    await scraper.scrape(args.category)
    scraper.save_products()

if __name__ == "__main__":
    asyncio.run(main())
