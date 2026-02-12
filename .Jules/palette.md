## 2026-02-12 - Accessibility Pattern: Interactive Cards
**Learning:** The application uses `motion.div` with `onClick` for interactive cards (e.g., `ModeSelector`), which lacks keyboard accessibility and semantic roles.
**Action:** Replace `motion.div` with `motion.button` and add `aria-label` and `type="button"`. Ensure inner buttons are replaced with `div` or `span` to avoid invalid HTML nesting.
