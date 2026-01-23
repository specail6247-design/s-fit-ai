# Sprint Goals: Week 1 - Foundation for Expansion

## Goal: "Prepare the Platform for Luxury & Accessories"

### 1. Backend & Data (Days 1-2)
*   **Update Scraper Config:** Add URLs for Louis Vuitton (Bags) and Dior (Accessories).
*   **Schema Migration:** Update `scraped_products.json` schema to support `subCategory` and `vtoType`.
*   **Test Scrape:** Run a limited scrape (10 items) for new categories to verify data integrity.

### 2. Frontend & UX (Days 3-4)
*   **Navigation Update:** Implement the Tab system (Clothing | Accessories) on the Home Page.
*   **Product Card Update:** Add "Material" and "Brand Badge" to the product display.
*   **VTO Router:** Refactor `lib/virtualTryOn.ts` to throw a specific error or message for Accessories ("Overlay coming soon") instead of trying to send them to IDM-VTON.

### 3. Design & Assets (Day 5)
*   **Asset Collection:** Manually curate 5 perfect "Ghost Mannequin" images for the Demo.
*   **Prototype AR:** Experiment with MediaPipe Face Mesh for a simple "Hat Overlay" test in a standalone page.

## Success Metrics
*   Configuration supports 2 new brands and 3 new categories.
*   UI successfully filters products by "Accessories".
*   No regressions in existing Clothing VTO.
