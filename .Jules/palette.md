
## 2024-05-23 - Accessibility: ARIA Labels for Icon-Only Buttons
**Learning:** In this application's components (especially in the `components/` directory like `LuxuryGarmentDetail`, `PhotoFitting`, and `ARLiveFitting`), there are many interactive icon-only `<button>` elements that rely solely on `material-symbols-outlined` spans for visual meaning, but lack an `aria-label`. This makes them completely inaccessible to screen readers.
**Action:** When adding or updating icon-only buttons in this codebase, always proactively include an `aria-label` attribute with a concise, descriptive name of the button's action to ensure keyboard and screen reader accessibility.
