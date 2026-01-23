# Global Brand & Accessory Expansion Strategy

## 1. Brand Expansion Strategy

### Global SPA Brands
- **Targets:** ZARA, H&M, COS, Massimo Dutti, GAP
- **Goal:** Secure standard sizing data and high-turnover inventory.
- **Approach:**
  - Automated weekly scraping of "New In" categories.
  - Standardize size mapping (US/EU/KR) across all brands.

### Domestic (Korean) Leaders
- **Targets:** Musinsa Standard, TOPTEN (Existing), 8seconds (Planned).
- **Goal:** Capture local trend data and K-Fashion fit.
- **Approach:**
  - Focus on specific "Asian Fit" data points for sizing algorithms.

### Luxury / Premium
- **Targets:** Gucci (Existing), Prada, Balenciaga (Planned).
- **Goal:** High-margin virtual try-on items ("Dream Items").
- **Approach:**
  - **Quality First:** Only scrape images > 2000px height.
  - Maintain "Collection" metadata (Season/Runway look).

---

## 2. Accessory Category Architecture

To support a full-body look, we are introducing an `accessories` category. This will prepare the system for multi-object virtual try-on.

### Category Structure
| Category | Sub-Categories (Type) | Key Attributes |
| :--- | :--- | :--- |
| **Bags** | `tote`, `shoulder`, `crossbody`, `clutch` | Size (cm), Strap Length, Texture |
| **Jewelry** | `necklace`, `earrings`, `ring`, `bracelet` | Material (Gold/Silver), Gemstone |
| **Headwear** | `cap`, `beanie`, `bucket_hat` | Circumference, Brim Width |
| **Scarves** | `muffler`, `silk_scarf` | Length, Pattern |

### Data Schema Expansion
The `Product` (or `ClothingItem`) interface will be updated:
- **New Category:** `'accessories'`
- **New Field:** `subCategory: string` (e.g., 'bag', 'necklace')
- **Future Field:** `attachPoint` (e.g., 'neck', 'wrist', 'hand_l', 'hand_r') for AR placement.

---

## 3. Image Quality Standards

To ensure a "Premium" feel, all scraped images must meet strict criteria.

### Criteria
1.  **Resolution:** Minimum **1000px** on the shortest side (Target: 1500px+).
2.  **View:** Front-facing, full product visibility. White or neutral grey background preferred.
3.  **Watermarks:** Rejection of any image containing detectable watermarks.
4.  **Format:** WebP or JPG (converted to WebP for optimization).

### Quality Control Logic (Automated)
- **Scraper Level:**
  - Check `naturalWidth` / `naturalHeight` in browser before downloading.
  - If < 1000px, look for `srcset` or zoom-in URL.
  - If still failed, mark product as `quality_failed` and skip.
- **Post-Processing:**
  - Background removal (rembg) for non-white backgrounds.
  - Super-resolution (Upscaling) for rare items if source is ~800px.

### Failure Recovery
- If a high-res image is not found:
  1.  Retry with a different User-Agent (mobile vs desktop sites often serve different sizes).
  2.  Flag for manual review if it's a "Luxury" item.
  3.  Discard if it's a generic Mass Market item.
