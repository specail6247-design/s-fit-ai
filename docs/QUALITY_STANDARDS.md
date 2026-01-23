# Crawling & Image Quality Standards

To ensure high-quality Virtual Try-On (VTO) results, all scraped images must adhere to the following standards.

## 1. Image Technical Specifications

*   **Minimum Resolution:** 1024px width (optimized for VTO model input).
*   **Format:** JPG, PNG, WEBP.
*   **Aspect Ratio:** Vertical preferred (3:4 or 9:16) for full-body items. 1:1 allowed for accessories.
*   **Size Limit:** Max 5MB per image.

## 2. Content Requirements (VTO Ready)

For an image to be "VTO Ready", it must match the algorithm's expectations:

### Clothing (IDM-VTON)
*   **Type:** **Flat Lay** or **Ghost Mannequin** (Invisible Mannequin) is MANDATORY for `garm_img`.
*   **Background:** Pure White (`#FFFFFF`) or Transparent.
*   **Restrictions:**
    *   No models wearing the item (unless we implement segmentation to extract the cloth).
    *   No folded items (must be fully visible).
    *   No hangers or tags visible.

### Accessories (Overlay)
*   **Bags:** Front view, clear straps. White background.
*   **Jewelry:** Macro shot on white background.
*   **Headwear:** Front view, neutral angle.

## 3. Crawler Validation Logic

The scraping pipeline must implement the following checks:

1.  **Resolution Check:** Discard images `< 800px` in width.
2.  **Background Check:** Simple pixel analysis (corners) to verify white/light background.
3.  **Deduplication:** Hash-based check to avoid storing identical images.

## 4. Brand Specifics

*   **ZARA:** Filter for "Packshot" images (usually the last image in the carousel).
*   **Luxury Brands (Gucci/Dior):** Usually have high-quality white background images by default. Priority scrape these.
