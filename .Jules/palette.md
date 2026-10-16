## 2025-01-23 - ARIA Labels for Ligature Icons
**Learning:** When using ligature-based icon fonts (like Material Symbols) in icon-only buttons, screen readers will read the ligature text (e.g., 'info' or 'zoom_in') instead of the button's intended action, which is confusing and non-descriptive.
**Action:** Always add `aria-hidden="true"` to the inner `<span>` containing the ligature text, and add a descriptive `aria-label` to the parent `<button>` element to ensure correct screen reader announcements.
