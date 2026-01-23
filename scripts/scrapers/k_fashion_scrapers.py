import asyncio
import random
import re
from typing import List, Dict, Any, Optional
from base_scraper import BaseScraper
from config import BRAND_URLS
from material_mapper import MaterialMapper

def translate_korean_material(text: str) -> str:
    """
    Simple translator for common Korean material terms to English
    so MaterialMapper can process them.
    """
    replacements = {
        "면": "Cotton",
        "코튼": "Cotton",
        "울": "Wool",
        "모": "Wool",
        "캐시미어": "Cashmere",
        "폴리에스터": "Polyester",
        "폴리": "Polyester",
        "나일론": "Nylon",
        "레이온": "Rayon",
        "아크릴": "Acrylic",
        "마": "Linen",
        "린넨": "Linen",
        "리넨": "Linen",
        "가죽": "Leather",
        "실크": "Silk",
        "견": "Silk",
        "스판": "Spandex",
        "우레탄": "Polyurethane"
    }

    translated = text
    for kr, en in replacements.items():
        translated = translated.replace(kr, en)
    return translated

class MusinsaScraper(BaseScraper):
    def __init__(self, limit: int = 50, test_mode: bool = False):
        super().__init__("MUSINSA", limit, test_mode)

    def get_category_url(self, category: str) -> Optional[str]:
        return BRAND_URLS["MUSINSA"].get(category)

    async def _extract_products(self, page, category: str):
        # Musinsa list items
        # Selector might be #searchList > li or similar
        product_cards = await page.locator('.li_box').all()
        if not product_cards:
             product_cards = await page.locator('#searchList > li').all()

        print(f"   Found {len(product_cards)} products on page.")

        count = 0
        for card in product_cards:
            if count >= self.limit:
                break
            try:
                img_el = card.locator('div.list_img img')
                image_url = await img_el.get_attribute('data-original')
                if not image_url:
                    image_url = await img_el.get_attribute('src')

                link_el = card.locator('div.list_img a')
                url = await link_el.get_attribute('href')
                if url and not url.startswith('http'):
                    url = "https:" + url if url.startswith('//') else "https://www.musinsa.com" + url

                info_el = card.locator('div.article_info')
                brand_el = info_el.locator('p.item_title a')
                brand = await brand_el.inner_text() if await brand_el.count() > 0 else "Unknown"

                name_el = info_el.locator('p.list_info a')
                name = await name_el.get_attribute('title')
                if not name:
                    name = await name_el.inner_text()

                name = name.strip()

                price_el = info_el.locator('p.price')
                price_text = await price_el.inner_text()
                # Remove del tag content if exists (original price)
                if await price_el.locator('del').count() > 0:
                    del_text = await price_el.locator('del').inner_text()
                    price_text = price_text.replace(del_text, '').strip()

                # Composition is hard to get from list. Defaulting.
                composition = "Cotton 100%"
                texture_type = "cotton"

                self.products.append({
                    "id": url,
                    "name": f"{brand} {name}",
                    "brand": "Musinsa",
                    "original_brand": brand,
                    "url": url,
                    "image": image_url,
                    "price": self.normalize_price(price_text),
                    "currency": "USD",
                    "category": category,
                    "composition": composition,
                    "texture_type": texture_type,
                    "source": "MUSINSA"
                })
                count += 1
            except Exception as e:
                print(f"   Error extracting product: {e}")

    def generate_mock_products(self, category: str, limit: int) -> List[Dict[str, Any]]:
        mock_items = []
        for i in range(limit):
            # Mock Korean text translation
            korean_mat = random.choice([
                "면 100%", "울 50%, 폴리에스터 50%", "나일론 100%"
            ])
            translated_mat = translate_korean_material(korean_mat)

            mock_items.append({
                "id": f"mus-{category}-{i}",
                "name": f"K-Fashion Item {i}",
                "brand": "Thisisneverthat",
                "original_brand": "Thisisneverthat",
                "url": "https://musinsa.com/example",
                "image": "https://via.placeholder.com/300x400",
                "price": random.randint(30, 150),
                "currency": "USD",
                "category": category,
                "composition": translated_mat,
                "texture_type": MaterialMapper.get_preset(translated_mat),
                "source": "MUSINSA"
            })
        return mock_items


class WConceptScraper(BaseScraper):
    def __init__(self, limit: int = 50, test_mode: bool = False):
        super().__init__("WCONCEPT", limit, test_mode)

    def get_category_url(self, category: str) -> Optional[str]:
        return BRAND_URLS["WCONCEPT"].get(category)

    async def _extract_products(self, page, category: str):
        product_cards = await page.locator('.thumbnail_list li').all()
        print(f"   Found {len(product_cards)} products on page.")

        count = 0
        for card in product_cards:
            if count >= self.limit:
                break
            try:
                img_el = card.locator('.img_area img')
                image_url = await img_el.get_attribute('src')
                if image_url and image_url.startswith('//'):
                    image_url = "https:" + image_url

                link_el = card.locator('.img_area a')
                url = await link_el.get_attribute('href')
                if url and not url.startswith('http'):
                    url = "https://www.wconcept.co.kr" + url

                brand_el = card.locator('.brand')
                brand = await brand_el.inner_text() if await brand_el.count() > 0 else "Unknown"

                name_el = card.locator('.product')
                name = await name_el.inner_text() if await name_el.count() > 0 else "Unknown"

                price_el = card.locator('.discount_price')
                if await price_el.count() == 0:
                    price_el = card.locator('.price')
                price_text = await price_el.inner_text() if await price_el.count() > 0 else "0"

                self.products.append({
                    "id": url,
                    "name": f"{brand} {name}",
                    "brand": "W Concept",
                    "original_brand": brand,
                    "url": url,
                    "image": image_url,
                    "price": self.normalize_price(price_text),
                    "currency": "USD",
                    "category": category,
                    "composition": "Cotton 100%", # Placeholder
                    "texture_type": "cotton",
                    "source": "WCONCEPT"
                })
                count += 1
            except Exception as e:
                print(f"   Error extracting product: {e}")

    def generate_mock_products(self, category: str, limit: int) -> List[Dict[str, Any]]:
        mock_items = []
        for i in range(limit):
            korean_mat = random.choice([
                "캐시미어 10%, 울 90%", "폴리 100%", "코튼 100%"
            ])
            translated_mat = translate_korean_material(korean_mat)

            mock_items.append({
                "id": f"wc-{category}-{i}",
                "name": f"Concept Item {i}",
                "brand": "Andersson Bell",
                "original_brand": "Andersson Bell",
                "url": "https://wconcept.co.kr/example",
                "image": "https://via.placeholder.com/300x400",
                "price": random.randint(80, 400),
                "currency": "USD",
                "category": category,
                "composition": translated_mat,
                "texture_type": MaterialMapper.get_preset(translated_mat),
                "source": "WCONCEPT"
            })
        return mock_items
