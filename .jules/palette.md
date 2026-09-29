## 2024-10-27 - Icon-only buttons with text characters
**Learning:** Found multiple instances where the "✕" text character was used in icon-only close buttons without an aria-label, causing screen readers to redundantly announce "multiplication x" instead of "close".
**Action:** Always wrap textual icons in `<span aria-hidden="true">` and add an explicit `aria-label` to the parent button to ensure screen reader clarity.
