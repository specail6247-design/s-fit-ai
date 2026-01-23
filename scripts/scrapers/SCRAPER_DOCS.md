# S_FIT AI Scraper Documentation

This directory contains production-ready web scrapers for 8 fashion brands.

## Supported Brands
1. **ZARA** (zara.com)
2. **H&M** (hm.com)
3. **Uniqlo** (uniqlo.com)
4. **GAP** (gap.com)
5. **Massimo Dutti** (massimodutti.com)
6. **COS** (cos.com)
7. **TOPTEN** (topten10.co.kr)
8. **Gucci** (gucci.com)

## Architecture
- **BaseScraper**: Abstract base class (`base_scraper.py`) handling Playwright setup, navigation, retries, and data saving.
- **Brand Scrapers**: Individual files (e.g., `zara_scraper.py`) inheriting from `BaseScraper` with site-specific selectors.
- **Orchestrator**: `run_all.py` to run all scrapers and aggregate results.
- **Config**: `config.py` for URLs, constants, and settings.

## Installation
```bash
pip install -r requirements.txt
playwright install chromium
```

## Usage

### Run All Scrapers
To run all scrapers in test mode (mock data):
```bash
python run_all.py --test --limit 10
```

To run a real scrape (be careful with rate limits):
```bash
python run_all.py --limit 50
```

To run specific brands:
```bash
python run_all.py --brands ZARA,HM --limit 20
```

### Run Individual Scraper
```bash
python zara_scraper.py --limit 50 --category women-tops
```

## Data Output
- Individual brand data: `data/brands/{brand}_products.json`
- Aggregated data: `data/scraped_products.json`

## Adding a New Brand
1. Create `newbrand_scraper.py` inheriting from `BaseScraper`.
2. Implement `get_category_url` and `_extract_products`.
3. Implement `generate_mock_products` for testing.
4. Add URLs to `config.py`.
5. Register in `run_all.py`.

## Anti-Detection Features
- Random User-Agent rotation.
- Random delays between requests.
- Exponential backoff on retry.
- Mimicked human scrolling behavior.
