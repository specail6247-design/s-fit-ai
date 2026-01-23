import asyncio
import json
import random
import re
from abc import ABC, abstractmethod
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Optional, Any

try:
    from playwright.async_api import async_playwright, Page, Browser, BrowserContext
    from fake_useragent import UserAgent
except ImportError:
    print("Dependencies missing. Run: pip install -r scripts/scrapers/requirements.txt")
    exit(1)

from config import (
    HEADLESS, VIEWPORT, DEFAULT_TIMEOUT, RETRY_COUNT, RETRY_DELAY,
    REQUEST_DELAY_MIN, REQUEST_DELAY_MAX, DATA_DIR, KRW_TO_USD_RATE
)

class BaseScraper(ABC):
    def __init__(self, brand_name: str, limit: int = 50, test_mode: bool = False):
        self.brand_name = brand_name
        self.limit = limit
        self.test_mode = test_mode
        self.ua = UserAgent()
        self.products: List[Dict[str, Any]] = []

    async def scrape(self, category: str = "women-tops") -> List[Dict[str, Any]]:
        """Main scraping method"""
        print(f"🛍️  Scraping {self.brand_name}: {category}")

        if self.test_mode:
            print("   ⚠️ TEST MODE - Using mock data")
            self.products = self.generate_mock_products(category, self.limit)
            return self.products

        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=HEADLESS)
            context = await self._create_context(browser)
            page = await context.new_page()

            try:
                url = self.get_category_url(category)
                if not url:
                    print(f"   ❌ URL not found for category: {category}")
                    return []

                print(f"   URL: {url}")
                await self._navigate(page, url)
                await self._scroll_page(page)
                await self._extract_products(page, category)

            except Exception as e:
                print(f"   ❌ Scraping error: {e}")
                # Fallback to mock data in case of failure if needed,
                # but for now we just return what we have or empty list.

            finally:
                await browser.close()

        return self.products

    async def _create_context(self, browser: Browser) -> BrowserContext:
        """Create browser context with randomized user agent"""
        user_agent = self.ua.random
        return await browser.new_context(
            viewport=VIEWPORT,
            user_agent=user_agent
        )

    async def _navigate(self, page: Page, url: str):
        """Navigate to URL with retry logic"""
        for attempt in range(RETRY_COUNT):
            try:
                await page.goto(url, wait_until="networkidle", timeout=DEFAULT_TIMEOUT)
                await self._random_delay()
                return
            except Exception as e:
                print(f"   ⚠️ Connection attempt {attempt + 1} failed: {e}")
                await asyncio.sleep(RETRY_DELAY * (attempt + 1))
        raise Exception(f"Failed to connect to {url} after {RETRY_COUNT} attempts")

    async def _scroll_page(self, page: Page):
        """Scroll page to trigger lazy loading"""
        # Determine how many scrolls based on limit (rough estimate)
        scrolls = max(3, self.limit // 10)
        print(f"   Process: Scrolling {scrolls} times...")

        for _ in range(scrolls):
            await page.keyboard.press("End")
            await asyncio.sleep(1.5)
            await self._random_delay()

    async def _random_delay(self):
        """Sleep for random interval"""
        delay = random.uniform(REQUEST_DELAY_MIN, REQUEST_DELAY_MAX)
        await asyncio.sleep(delay)

    @abstractmethod
    def get_category_url(self, category: str) -> Optional[str]:
        """Return URL for the given category"""
        pass

    @abstractmethod
    async def _extract_products(self, page: Page, category: str):
        """Extract products from the page"""
        pass

    @abstractmethod
    def generate_mock_products(self, category: str, limit: int) -> List[Dict[str, Any]]:
        """Generate mock products for testing"""
        pass

    def save_products(self, filename: Optional[str] = None):
        """Save extracted products to JSON"""
        if not filename:
            filename = f"{self.brand_name.lower()}_products.json"

        DATA_DIR.mkdir(parents=True, exist_ok=True)
        output_path = DATA_DIR / filename

        with open(output_path, "w", encoding="utf-8") as f:
            json.dump({
                "brand": self.brand_name,
                "scrapedAt": datetime.now().isoformat(),
                "count": len(self.products),
                "products": self.products
            }, f, ensure_ascii=False, indent=2)

        print(f"\n💾 Saved {len(self.products)} products to {output_path}")

    def normalize_price(self, price_text: str, currency: str = "KRW") -> float:
        """Extract numeric price and convert to USD"""
        if not price_text:
            return 0.0

        # Remove non-numeric chars except dot
        clean_price = re.sub(r'[^\d.]', '', price_text)
        try:
            val = float(clean_price)
            if currency == "KRW":
                return round(val / KRW_TO_USD_RATE, 2)
            return val
        except ValueError:
            return 0.0

    def map_category(self, category: str) -> str:
        """Map generic category to standardized format"""
        cat_lower = category.lower()
        if "top" in cat_lower or "shirt" in cat_lower:
            return "tops"
        elif "dress" in cat_lower:
            return "dresses"
        elif "outerwear" in cat_lower or "coat" in cat_lower or "jacket" in cat_lower:
            return "outerwear"
        elif "bottom" in cat_lower or "pant" in cat_lower or "trouser" in cat_lower:
            return "bottoms"
        elif "bag" in cat_lower or "accessory" in cat_lower or "hat" in cat_lower or "jewel" in cat_lower:
            return "accessories"
        return "tops"
