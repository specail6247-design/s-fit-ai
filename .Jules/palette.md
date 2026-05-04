## 2024-05-04 - [Missing ARIA Label on Share Button]
**Learning:** Found a pattern where icon-only action buttons (like the Share '📤' button in FittingRoom) are missing `aria-label` attributes and keyboard focus indicators.
**Action:** Ensure all icon-only interactive elements in floating UI overlays include clear `aria-label` descriptions and `focus-visible:ring-2` to remain accessible to screen readers and keyboard users.
