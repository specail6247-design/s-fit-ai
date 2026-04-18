## 2025-03-08 - Icon Buttons Accessibility
**Learning:** Icon-only buttons using `material-symbols-outlined` need `aria-label` for screen readers and `aria-hidden="true"` on the literal text icon so that they are not read as the text itself (e.g., "zoom_in"). Also, interactive elements require focus states (e.g. `focus-visible:ring-2 outline-none`) to support keyboard navigation correctly.
**Action:** Always verify `aria-label`, `aria-hidden="true"` on the icon, and focus styles on all interactive icon-only elements across the app.
