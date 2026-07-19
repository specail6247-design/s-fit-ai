## 2025-03-05 - Accessible Icon-Only Buttons
**Learning:** Icon-only buttons (like those for share, zoom, 360 view) lack accessible names for screen readers and visible focus indicators for keyboard navigation, making them inaccessible.
**Action:** Always include descriptive `aria-label` attributes and visible focus states (e.g. `focus-visible:ring-2 outline-none`) for all icon-only interactive elements.
