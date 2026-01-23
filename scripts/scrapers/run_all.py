#!/usr/bin/env python3
"""
Orchestrator script to run all brand scrapers
"""

import asyncio
import argparse
import json
from datetime import datetime
from pathlib import Path
from config import OUTPUT_FILE

# Import all scrapers
from zara_scraper import ZaraScraper
from hm_scraper import HMScraper
from uniqlo_scraper import UniqloScraper
from gap_scraper import GapScraper
from massimodutti_scraper import MassimoDuttiScraper
from cos_scraper import CosScraper
from topten_scraper import ToptenScraper
from gucci_scraper import GucciScraper

SCRAPERS = {
    "ZARA": ZaraScraper,
    "HM": HMScraper,
    "UNIQLO": UniqloScraper,
    "GAP": GapScraper,
    "MASSIMO_DUTTI": MassimoDuttiScraper,
    "COS": CosScraper,
    "TOPTEN": ToptenScraper,
    "GUCCI": GucciScraper
}

async def run_scraper(name, scraper_cls, limit, test_mode):
    print(f"\n🚀 Starting {name}...")
    scraper = scraper_cls(limit=limit, test_mode=test_mode)

    # Scrape multiple categories if needed, for now just scraping tops as default or iterates
    # But BaseScraper.scrape takes one category.
    # We will scrape a default set of categories for each brand.

    categories = [
        "women-tops", "women-dresses", "women-outerwear", "women-bottoms",
        "women-bags", "women-jewelry"
    ]
    all_products = []

    for cat in categories:
        # Check if category exists for brand
        if scraper.get_category_url(cat) or (test_mode and name == "GUCCI" and cat in ["women-tops", "women-dresses", "women-outerwear"]):
             # Gucci uses slightly different keys in config but mapped in scraper class potentially
             # Actually Gucci keys are women-ready-to-wear etc.
             if name == "GUCCI":
                 if cat == "women-tops": cat = "women-ready-to-wear"
                 elif cat == "women-bottoms": continue # skip for now

             products = await scraper.scrape(cat)
             all_products.extend(products)
             # Small delay between categories
             await asyncio.sleep(2)

    scraper.products = all_products # Update total products
    scraper.save_products()
    return all_products

async def main():
    parser = argparse.ArgumentParser(description="Run All Scrapers")
    parser.add_argument("--limit", type=int, default=10, help="Products per category per brand")
    parser.add_argument("--test", action="store_true", help="Run in test mode")
    parser.add_argument("--brands", type=str, help="Comma separated list of brands to run")
    args = parser.parse_args()

    brands_to_run = args.brands.split(",") if args.brands else SCRAPERS.keys()
    final_results = []

    for brand_name in brands_to_run:
        brand_name = brand_name.strip()
        if brand_name in SCRAPERS:
            try:
                products = await run_scraper(brand_name, SCRAPERS[brand_name], args.limit, args.test)
                final_results.extend(products)
            except Exception as e:
                print(f"❌ Failed to run {brand_name}: {e}")

    # Save aggregated results
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump({
            "generatedAt": datetime.now().isoformat(),
            "totalCount": len(final_results),
            "products": final_results
        }, f, ensure_ascii=False, indent=2)

    print(f"\n✨ ALL DONE! Aggregated {len(final_results)} products to {OUTPUT_FILE}")

if __name__ == "__main__":
    asyncio.run(main())
