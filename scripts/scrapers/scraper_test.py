#!/usr/bin/env python3
"""
Unit and Integration Tests for Scrapers
"""

import unittest
import asyncio
from base_scraper import BaseScraper
from config import BRAND_URLS

# Mock subclass for testing BaseScraper
class TestScraper(BaseScraper):
    def get_category_url(self, category: str):
        return "http://example.com"

    async def _extract_products(self, page, category):
        self.products.append({"id": "test-1", "name": "Test Product"})

    def generate_mock_products(self, category, limit):
        return [{"id": "mock-1", "name": "Mock Product"}]

class TestBaseScraper(unittest.TestCase):
    def setUp(self):
        self.scraper = TestScraper("TestBrand", limit=1, test_mode=True)

    def test_initialization(self):
        self.assertEqual(self.scraper.brand_name, "TestBrand")
        self.assertEqual(self.scraper.limit, 1)
        self.assertTrue(self.scraper.test_mode)

    def test_mock_scrape(self):
        async def run_scrape():
            return await self.scraper.scrape("tops")

        products = asyncio.run(run_scrape())
        self.assertEqual(len(products), 1)
        self.assertEqual(products[0]["name"], "Mock Product")

    def test_price_normalization(self):
        self.assertEqual(self.scraper.normalize_price("₩13,500", "KRW"), 10.0)
        self.assertEqual(self.scraper.normalize_price("$10.00", "USD"), 10.0)
        self.assertEqual(self.scraper.normalize_price("13,500", "KRW"), 10.0)

    def test_category_mapping(self):
        self.assertEqual(self.scraper.map_category("Women Shirts"), "tops")
        self.assertEqual(self.scraper.map_category("Dresses"), "dresses")
        self.assertEqual(self.scraper.map_category("Coats & Jackets"), "outerwear")
        self.assertEqual(self.scraper.map_category("Trousers"), "bottoms")

class TestBrandIntegrations(unittest.TestCase):
    """Test that each brand scraper can be instantiated and has URL configs"""

    def test_zara_config(self):
        from zara_scraper import ZaraScraper
        scraper = ZaraScraper()
        self.assertIsNotNone(scraper.get_category_url("women-tops"))

    def test_hm_config(self):
        from hm_scraper import HMScraper
        scraper = HMScraper()
        self.assertIsNotNone(scraper.get_category_url("women-tops"))

    # Add other brands...
    def test_all_brands_urls(self):
        from zara_scraper import ZaraScraper
        from hm_scraper import HMScraper
        from uniqlo_scraper import UniqloScraper
        from gap_scraper import GapScraper
        from massimodutti_scraper import MassimoDuttiScraper
        from cos_scraper import CosScraper
        from topten_scraper import ToptenScraper
        from gucci_scraper import GucciScraper

        scrapers = [
            ZaraScraper, HMScraper, UniqloScraper, GapScraper,
            MassimoDuttiScraper, CosScraper, ToptenScraper, GucciScraper
        ]

        for cls in scrapers:
            scraper = cls()
            # Most use women-tops or similar, verify at least one key works
            # Gucci uses women-ready-to-wear
            cat = "women-ready-to-wear" if "Gucci" in str(cls) else "women-tops"
            self.assertTrue(scraper.get_category_url(cat) is not None, f"{cls.__name__} URL missing")

if __name__ == "__main__":
    unittest.main()
