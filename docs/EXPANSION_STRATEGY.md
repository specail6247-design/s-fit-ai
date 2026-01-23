# Global Brand & Accessory Expansion Strategy

## 1. Brand Expansion Targets

### Phase 1: Global Luxury (High Priority)
To achieve the "Luxury Virtual Fitting Platform" goal, we will introduce high-end brands that emphasize accessories.

*   **Louis Vuitton (KR/Global)**
    *   *Focus:* Bags, Small Leather Goods.
    *   *Rationale:* Iconic monogram bags are high-demand VTO items.
*   **Dior (KR)**
    *   *Focus:* Handbags, Hats.
    *   *Rationale:* Strong visual identity, high user engagement.
*   **Gucci (Existing - Expand)**
    *   *Focus:* Expand from Ready-to-wear to Belts, Bags, Scarves.

### Phase 2: Sport & Street (Volume)
*   **Nike / Adidas**
    *   *Focus:* Sneakers (AR Try-on), Caps.
*   **Gentle Monster**
    *   *Focus:* Eyewear.
    *   *Rationale:* Perfect for "Head" based VTO.

## 2. Accessory Category Architecture

We will expand the current `category` schema.

### Current Schema
*   `tops`
*   `bottoms`
*   `dresses`
*   `outerwear`

### New Accessory Schema
*   `bags`
    *   Sub-types: `shoulder_bag`, `tote`, `backpack`, `clutch`.
*   `jewelry`
    *   Sub-types: `necklace`, `earrings`, `ring`.
*   `headwear`
    *   Sub-types: `cap`, `beanie`, `bucket_hat`.
*   `scarves`

## 3. Technical Implementation Strategy: Hybrid VTO

Current **IDM-VTON** model is optimized for upper/lower body clothing. It fails with small accessories or rigid items like bags.

### Strategy A: Clothing (Existing)
*   **Model:** IDM-VTON (via Replicate).
*   **Input:** User Photo + Flat Lay Cloth.
*   **Mode:** `upper_body`, `lower_body`, `dresses`.

### Strategy B: Accessories (New)
*   **Bags:** 2D Composite Overlay.
    *   Detect User Hip/Shoulder keypoints (MediaPipe Pose).
    *   Scale and position bag image relative to keypoints.
*   **Headwear/Eyewear:**
    *   Detect Face Mesh (MediaPipe Face).
    *   Overlay item on head/eyes.
*   **Jewelry:**
    *   **Necklaces:** Neck landmarks.
    *   **Rings:** Hand landmarks (MediaPipe Hands).

### Database Updates
*   Add `vtoType` field to Product Schema: `['clothing-idm', 'accessory-overlay-body', 'accessory-overlay-face', 'accessory-overlay-hand']`.
