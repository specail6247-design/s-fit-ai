## 2026-02-17 - Clickable Divs vs Semantic Buttons
**Learning:** Using `div` with `onClick` for main interactive elements (like mode cards) creates a major accessibility barrier (no keyboard focus, no screen reader support).
**Action:** Always wrap interactive cards in `<button>` or `<motion.button>` with `type="button"`. Ensure inner text/layout uses non-interactive elements (like `div` or `span`) to avoid invalid HTML nesting, and add explicit `focus-visible` styles for keyboard navigation.
