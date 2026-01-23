import asyncio
import random
from typing import List, Dict, Any, Optional
from base_scraper import BaseScraper
from config import BRAND_URLS
from material_mapper import MaterialMapper

class FarfetchScraper(BaseScraper):
    def __init__(self, limit: int = 50, test_mode: bool = False):
        super().__init__("FARFETCH", limit, test_mode)

    def get_category_url(self, category: str) -> Optional[str]:
        return BRAND_URLS["FARFETCH"].get(category)

    async def _extract_products(self, page, category: str):
        # Farfetch uses data-testid for reliability usually
        product_cards = await page.locator('[data-testid="productCard"]').all()
        print(f"   Found {len(product_cards)} products on page.")

        count = 0
        for card in product_cards:
            if count >= self.limit:
                break

            try:
                # Basic info from card
                link_el = card.locator('a')
                url = await link_el.get_attribute('href')
                if url and not url.startswith('http'):
                    url = "https://www.farfetch.com" + url

                name_el = card.locator('[data-testid="product-card-description"]')
                name = await name_el.inner_text() if await name_el.count() > 0 else "Unknown"

                brand_el = card.locator('[data-testid="product-card-brand"]')
                brand = await brand_el.inner_text() if await brand_el.count() > 0 else "Unknown"

                price_el = card.locator('[data-testid="price"]')
                price_text = await price_el.inner_text() if await price_el.count() > 0 else "0"

                image_el = card.locator('img')
                image_url = await image_el.get_attribute('src') if await image_el.count() > 0 else ""

                # Go to detail page for composition (Expensive operation)
                # In a real high-scale scraper, we might skip this or use an API
                composition = ""
                physics_preset = "cotton"

                # We will only deep-scrape if we are under a very small limit or logic allows
                # For this demo, we'll try to do it for the first few items to show it works,
                # or if the limit is small.
                if count < 5 and not self.test_mode:
                    print(f"   Analyzing material for: {name[:20]}...")
                    try:
                        new_page = await page.context.new_page()
                        await new_page.goto(url, timeout=30000)

                        # Grab all text and try to parse
                        body_text = await new_page.inner_text('body')
                        found_comp = MaterialMapper.parse_composition(body_text)

                        if found_comp:
                            # Construct string
                            comp_str = ", ".join([f"{k} {v}%" for k, v in found_comp.items()])
                            composition = comp_str
                            physics_preset = MaterialMapper.get_preset(comp_str)
                            print(f"     Found: {composition}")

                        await new_page.close()
                    except Exception as e:
                        print(f"     Detail scrape failed: {e}")
                        # Ensure page is closed if error
                        # context.pages should allow us to track it, but explicit close is better
                        pass

                self.products.append({
                    "id": url, # Use URL as ID
                    "name": f"{brand} {name}",
                    "brand": "Farfetch", # Platform
                    "original_brand": brand,
                    "url": url,
                    "image": image_url,
                    "price": self.normalize_price(price_text),
                    "currency": "USD",
                    "category": category,
                    "composition": composition,
                    "texture_type": physics_preset, # Default for now
                    "source": "FARFETCH"
                })
                count += 1

            except Exception as e:
                print(f"   Error extracting product: {e}")
                continue

    def generate_mock_products(self, category: str, limit: int) -> List[Dict[str, Any]]:
        mock_items = []
        for i in range(limit):
            mat_text = random.choice([
                "100% Cotton", "Silk 100%", "Wool 90%, Cashmere 10%",
                "Polyester 100%", "Denim 100% Cotton"
            ])
            mock_items.append({
                "id": f"ff-{category}-{i}",
                "name": f"Luxury Item {i}",
                "brand": "Gucci",
                "original_brand": "Gucci",
                "url": "https://farfetch.com/example",
                "image": "https://via.placeholder.com/300x400",
                "price": random.randint(200, 2000),
                "currency": "USD",
                "category": category,
                "composition": mat_text,
                "texture_type": MaterialMapper.get_preset(mat_text),
                "source": "FARFETCH"
            })
        return mock_items


class SsenseScraper(BaseScraper):
    def __init__(self, limit: int = 50, test_mode: bool = False):
        super().__init__("SSENSE", limit, test_mode)

    def get_category_url(self, category: str) -> Optional[str]:
        return BRAND_URLS["SSENSE"].get(category)

    async def _extract_products(self, page, category: str):
        product_cards = await page.locator('.product-tile').all()
        print(f"   Found {len(product_cards)} products on page.")

        count = 0
        for card in product_cards:
            if count >= self.limit:
                break
            try:
                # Basic extraction logic for SSENSE
                # SSENSE IDs usually in script tags, but we scrape DOM
                link_el = card.locator('a')
                url = await link_el.get_attribute('href')
                if url and not url.startswith('http'):
                    url = "https://www.ssense.com" + url

                brand_el = card.locator('[data-test="product-brand"]')
                brand = await brand_el.inner_text() if await brand_el.count() > 0 else "Unknown"

                name_el = card.locator('[data-test="product-name"]')
                name = await name_el.inner_text() if await name_el.count() > 0 else "Unknown"

                price_el = card.locator('[data-test="product-price"]')
                price_text = await price_el.inner_text() if await price_el.count() > 0 else "0"

                image_el = card.locator('img')
                image_url = await image_el.get_attribute('data-srcset')
                if not image_url:
                    image_url = await image_el.get_attribute('src')

                # Split srcset to get largest
                if image_url and ',' in image_url:
                    image_url = image_url.split(',')[-1].strip().split(' ')[0]

                self.products.append({
                    "id": url,
                    "name": f"{brand} {name}",
                    "brand": "SSENSE",
                    "original_brand": brand,
                    "url": url,
                    "image": image_url,
                    "price": self.normalize_price(price_text),
                    "currency": "USD",
                    "category": category,
                    "composition": "Cotton 100%", # Placeholder
                    "texture_type": "cotton",
                    "source": "SSENSE"
                })
                count += 1
            except Exception as e:
                print(f"   Error extracting product: {e}")

    def generate_mock_products(self, category: str, limit: int) -> List[Dict[str, Any]]:
        mock_items = []
        for i in range(limit):
            mat_text = random.choice([
                "100% Leather", "Nylon 50%, Polyester 50%", "100% Linen"
            ])
            mock_items.append({
                "id": f"ss-{category}-{i}",
                "name": f"Designer Piece {i}",
                "brand": "Prada",
                "original_brand": "Prada",
                "url": "https://ssense.com/example",
                "image": "https://via.placeholder.com/300x400",
                "price": random.randint(300, 3000),
                "currency": "USD",
                "category": category,
                "composition": mat_text,
                "texture_type": MaterialMapper.get_preset(mat_text),
                "source": "SSENSE"
            })
        return mock_items
