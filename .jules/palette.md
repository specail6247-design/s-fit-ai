## 2025-02-14 - Icon-only Buttons with Ligature Fonts Accessibility
**Learning:** Icon-only buttons using ligature-based icon fonts (like Material Symbols) cause screen readers to redundantly announce the literal text (e.g. "zoom_in") if not properly handled.
**Action:** Always wrap the icon character in `<span aria-hidden="true">` and apply an explicit `aria-label` to the parent interactive element (`<button>` or `<a>`) to ensure correct screen reader behavior.
