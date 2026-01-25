#!/usr/bin/env python3
"""
Universal Daily Fashion Sync
Aggregates data from Global Brands (Zara, H&M, Uniqlo) and Luxury/K-Fashion platforms.
Updates Supabase with vector embeddings for semantic search.
"""

import asyncio
import os
import json
from datetime import datetime
from typing import List, Dict, Any
import sys
from pathlib import Path

# Add scrapers directory to path
sys.path.append(str(Path(__file__).parent / "scrapers"))

try:
    from supabase import create_client, Client
except ImportError:
    print("Supabase library not found. Install with: pip install supabase")
    Client = None

from zara_scraper import ZaraScraper
from hm_scraper import HMScraper
from uniqlo_scraper import UniqloScraper
from luxury_scrapers import FarfetchScraper, SsenseScraper
from k_fashion_scrapers import MusinsaScraper, WConceptScraper
from config import OUTPUT_FILE

# Scraper registry
SCRAPERS = {
    "ZARA": ZaraScraper,
    "HM": HMScraper,
    "UNIQLO": UniqloScraper,
    "FARFETCH": FarfetchScraper,
    "SSENSE": SsenseScraper,
    "MUSINSA": MusinsaScraper,
    "WCONCEPT": WConceptScraper
}

async def generate_embeddings(products: List[Dict[str, Any]]):
    """Generates vector embeddings for products using OpenAI"""
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("⚠️ OPENAI_API_KEY not found. Skipping embeddings.")
        return products

    try:
        from openai import AsyncOpenAI
        client = AsyncOpenAI(api_key=api_key)
    except ImportError:
        print("⚠️ OpenAI library not found. Skipping embeddings.")
        return products

    print(f"🧠 Generating embeddings for {len(products)} items...")

    # Process in chunks to respect rate limits if needed, but sequential for simplicity here
    for i, product in enumerate(products):
        if "embedding" in product and product["embedding"]:
            continue

        # Construct rich text representation
        comp_str = ""
        if isinstance(product.get("composition"), dict):
            comp_str = ", ".join([f"{k} {v}%" for k, v in product["composition"].items()])
        elif isinstance(product.get("composition"), str):
            comp_str = product["composition"]

        text_input = f"{product.get('brand', '')} {product.get('name', '')} {product.get('category', '')} {comp_str}".strip()

        try:
            response = await client.embeddings.create(
                input=text_input,
                model="text-embedding-3-small"
            )
            product["embedding"] = response.data[0].embedding

            if i % 10 == 0:
                print(f"   Embedded {i}/{len(products)}", end="\r")

        except Exception as e:
            print(f"   ❌ Embedding failed for {product.get('id')}: {e}")

    print("\n✅ Embeddings generated.")
    return products

async def run_sync(test_mode: bool = False, limit: int = 10, target_brand: str = None):
    print(f"🌍 Starting Universal Fashion Sync (Test Mode: {test_mode})")

    all_products = []

    # 1. Run Scrapers
    targets = SCRAPERS.items()
    if target_brand:
        if target_brand.upper() in SCRAPERS:
            targets = [(target_brand.upper(), SCRAPERS[target_brand.upper()])]
        else:
            print(f"⚠️ Brand {target_brand} not found. Available: {list(SCRAPERS.keys())}")
            return

    for name, scraper_cls in targets:
        try:
            print(f"\nrunning {name}...")
            scraper = scraper_cls(limit=limit, test_mode=test_mode)

            # Scrape default categories
            categories = ["women-tops", "women-dresses"] # Can expand this

            for cat in categories:
                if scraper.get_category_url(cat):
                    products = await scraper.scrape(cat)
                    all_products.extend(products)
                    await asyncio.sleep(1) # Polite delay

        except Exception as e:
            print(f"❌ Error scraping {name}: {e}")

    print(f"\n📊 Total collected items: {len(all_products)}")

    # 2. Generate Embeddings
    all_products = await generate_embeddings(all_products)

    # 3. Sync to Supabase
    supabase_url = os.environ.get("SUPABASE_URL")
    supabase_key = os.environ.get("SUPABASE_KEY")

    if supabase_url and supabase_key and Client:
        try:
            print("☁️  Syncing to Supabase...")
            supabase: Client = create_client(supabase_url, supabase_key)

            # Upsert in batches
            batch_size = 50
            for i in range(0, len(all_products), batch_size):
                batch = all_products[i:i+batch_size]

                # Sanitize: ensure no unsupported types
                # e.g. tuple to list? JSON serialization handles most.

                try:
                    data, count = supabase.table("products").upsert(batch).execute()
                    print(f"   Upserted batch {i//batch_size + 1}")
                except Exception as db_err:
                     print(f"   ⚠️ Batch upsert failed: {db_err}")
                     # If column missing error, advise user
                     if "column" in str(db_err) and "does not exist" in str(db_err):
                         print("   ❗ Database schema mismatch. Please run scripts/setup_products_db.sql")

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

    # Remove embedding for local save readability (optional, but they are huge arrays)
    # Actually keeping them is better for debug

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
    parser.add_argument("--brand", type=str, help="Run specific brand only")
    args = parser.parse_args()

    asyncio.run(run_sync(test_mode=args.test, limit=args.limit, target_brand=args.brand))
