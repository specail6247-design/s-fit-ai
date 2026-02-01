## 2024-05-23 - Keyboard Access for Hover Overlays
**Learning:** Components using `group-hover` to reveal actions (like "Try On" overlays) completely block keyboard users if they don't also include `group-focus-within`.
**Action:** When designing hover-reveal interfaces, always pair `group-hover:opacity-100` with `group-focus-within:opacity-100` and ensure interactive elements inside are focusable.
