# UX Flow & Content Strategy Updates

## 1. Global Navigation Architecture

The top-level navigation will be split to accommodate the new hierarchy.

### Previous Flow
*   Home -> Brand List -> Product List (Mixed Categories)

### New Flow
*   **Home**
    *   **Tab 1: Clothing** (Default) -> Category Filter (Tops, Dresses, etc.)
    *   **Tab 2: Accessories** (New) -> Category Filter (Bags, Jewelry, Hats)
    *   **Tab 3: Brands** -> A-Z List of Brands

## 2. Product Detail & Try-On Interface

The "Try On" button behavior will adapt based on the product category (`vtoType`).

### Scenario A: Clothing (IDM-VTON)
1.  User clicks "Virtual Try-On".
2.  **Input Request:** "Upload a Full Body Photo".
3.  **Process:** Send to Replicate (IDM-VTON).
4.  **Result:** Generated image of user wearing the cloth.

### Scenario B: Accessories (New Overlay Flow)
1.  User clicks "Virtual Try-On".
2.  **Input Request:**
    *   *Bags/Belts:* "Upload Full Body Photo".
    *   *Hats/Glasses:* "Upload Selfie/Headshot".
    *   *Rings:* "Upload Hand Photo".
3.  **Live Preview (AR Mode):**
    *   If on mobile, open camera.
    *   Use MediaPipe to track landmarks (Face/Hand/Pose).
    *   Overlay the accessory image in real-time (or static overlay on photo).
4.  **Adjustment:** User can drag/resize the accessory manually if auto-placement is off.

## 3. Filtering & Sorting

*   **By Brand:** Users can filter accessories by brand (e.g., "Show only Gucci Bags").
*   **By Color:** Extracted from image analysis.
*   **By Occasion:** "Party", "Casual", "Office" (AI Tagging).

## 4. Content Enrichment

To support the "Luxury" feel:
*   **Brand Story Cards:** When entering a Luxury Brand page, show a high-quality banner and short history.
*   **Material Details:** Display "Leather", "Gold", "Silk" prominently for accessories.
