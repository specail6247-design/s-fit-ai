# UX Enhancement: The Premium "Lookbook" Experience

## 1. Concept
Moving away from a simple "Grid of Clothes" to a **"Digital Wardrobe"** and **"Curated Lookbook"** experience. The interface should feel like browsing a high-end fashion editorial, not a spreadsheet.

---

## 2. Core UX Changes

### A. The "Lookbook" Flow
Instead of just filtering by "Tops", users can browse by "Vibe" or "Collection".
- **Vibes:** "Office Chic", "Weekend Getaway", "Date Night".
- **Interaction:** Clicking a Vibe pre-fills the Fitting Room with a matching outfit (Top + Bottom + Accessory).
- **Visuals:** Larger, varying aspect ratio cards (Masonry layout) rather than uniform squares.

### B. Premium Filtering & Navigation
- **Brand Filter:**
  - Logos should be displayed in monochrome (inactive) vs color (active) for a clean look.
  - "Luxury" toggle to instantly switch between ZARA/H&M and Gucci/Prada.
- **Category Filter (Expanded):**
  - **Main Level:** Apparel | Accessories | Shoes
  - **Sub Level (Accessories):** Bags | Jewelry | Hats
  - *Interaction:* Smooth sliding pill navigation.

### C. Product Detail & Selection
- **Hover Effects:**
  - Desktop: Cross-fade to "On Model" view.
  - Mobile: Long-press to see "On Model".
- **Quick Try-On:**
  - A "⚡ Try On" button on every card that instantly updates the 3D Avatar/2D Try-on view without opening a full modal.

---

## 3. Visual Polish Checklist
- [ ] **Typography:** Use a high-contrast serif font for headings (e.g., Playfair Display) paired with a clean sans-serif (Inter/Pretendard).
- [ ] **Micro-interactions:**
  - Buttons should have a subtle "magnetic" pull or scale effect.
  - Loading states should use skeleton screens that match the card layout, not generic spinners.
- [ ] **Color Palette:**
  - Deep Black (`#000000`) background.
  - Accent Color: Cyber Lime (`#ccff00`) or Electric Blue for "AI" actions.
  - Text: Off-white (`#f0f0f0`) for readability, never pure white on black (contrast strain).

---

## 4. Mobile Considerations
- **Bottom Sheet Navigation:** Filters and Categories should slide up from the bottom (thumb-friendly).
- **Horizontal Swipe:** Brand lists and recent views should be horizontally scrollable to save vertical space.
