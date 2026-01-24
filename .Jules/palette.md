## 2026-01-24 - Interactive Overlay Visibility
**Learning:** Overlays that only appear on hover (`group-hover:opacity-100`) are inaccessible to keyboard users.
**Action:** Always add `group-focus-within:opacity-100` alongside hover classes to ensure nested interactive elements (like buttons) become visible when focused.
