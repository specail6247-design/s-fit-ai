#!/usr/bin/env python3
"""
Universal Daily Fashion Sync
Aggregates data from Luxury and K-Fashion platforms and updates Supabase.
"""

import asyncio
import os
import json
from datetime import datetime
from typing import List, Dict, Any

try:
    from supabase import create_client, Client
except ImportError:
    print("Supabase library not found. Install with: pip install supabase")
    Client = None

import sys
from pathlib import Path
# Add scrapers directory to path
sys.path.append(str(Path(__file__).parent / "scrapers"))

from luxury_scrapers import FarfetchScraper, SsenseScraper
from k_fashion_scrapers import MusinsaScraper, WConceptScraper
from config import OUTPUT_FILE

# Scraper registry
SCRAPERS = {
    "FARFETCH": FarfetchScraper,
    "SSENSE": SsenseScraper,
    "MUSINSA": MusinsaScraper,
    "WCONCEPT": WConceptScraper
}

async def run_sync(test_mode: bool = False, limit: int = 10):
    print(f"🌍 Starting Universal Fashion Sync (Test Mode: {test_mode})")

    all_products = []

    # 1. Run Scrapers
    for name, scraper_cls in SCRAPERS.items():
        try:
            print(f"\nrunning {name}...")
            scraper = scraper_cls(limit=limit, test_mode=test_mode)

            # Scrape default categories
            categories = ["women-tops", "women-dresses"]

            for cat in categories:
                if scraper.get_category_url(cat):
                    products = await scraper.scrape(cat)
                    all_products.extend(products)
                    await asyncio.sleep(1) # Polite delay

        except Exception as e:
            print(f"❌ Error scraping {name}: {e}")

    print(f"\n📊 Total collected items: {len(all_products)}")

    # 2. Sync to Supabase
    supabase_url = os.environ.get("SUPABASE_URL")
    supabase_key = os.environ.get("SUPABASE_KEY")

    if supabase_url and supabase_key and Client:
        try:
            print("☁️  Syncing to Supabase...")
            supabase: Client = create_client(supabase_url, supabase_key)

            # Upsert in batches
            batch_size = 100
            for i in range(0, len(all_products), batch_size):
                batch = all_products[i:i+batch_size]

                # Clean data for DB (remove internal keys if any)
                # Assuming table 'products' exists with matching columns
                data, count = supabase.table("products").upsert(batch).execute()
                print(f"   Upserted batch {i//batch_size + 1}")

            print("✅ Supabase Sync Complete")

        except Exception as e:
            print(f"❌ Supabase Sync Failed: {e}")
            print("   Falling back to local JSON save.")
            save_local(all_products)
    else:
        print("⚠️  Supabase credentials not found or client missing. Saving locally.")
        save_local(all_products)

def save_local(products: List[Dict[str, Any]]):
    output_path = OUTPUT_FILE.parent / "universal_products_latest.json"
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump({
            "syncedAt": datetime.now().isoformat(),
            "count": len(products),
            "products": products
        }, f, ensure_ascii=False, indent=2)

    print(f"💾 Saved to {output_path}")

if __name__ == "__main__":
    # Check for test mode flag or env var
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--test", action="store_true", help="Run in test mode with mock data")
    parser.add_argument("--limit", type=int, default=10, help="Limit per category")
    args = parser.parse_args()

    asyncio.run(run_sync(test_mode=args.test, limit=args.limit))
