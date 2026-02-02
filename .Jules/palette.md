# Palette's Journal

## 2025-02-18 - Accessible Hover Reveals
**Learning:** Hover-reveal interfaces (like product card overlays) are inaccessible to keyboard users unless explicitly handled. Relying solely on `group-hover:opacity-100` leaves keyboard users guessing where focus is.
**Action:** Always pair `group-hover:opacity-100` with `group-focus-within:opacity-100` (or `focus-within`) on the container, and ensure the interactive element inside has clear `focus-visible` styles.
