## 2025-05-18 - Hidden Interactive Overlays
**Learning:** Interactive elements hidden by `opacity-0` (like "Try On" buttons in cards) are inaccessible to keyboard users unless they become visible on focus.
**Action:** Always add `group-focus-within:opacity-100` (or similar) to the container of hidden interactive elements to ensure they appear when tabbed to.
