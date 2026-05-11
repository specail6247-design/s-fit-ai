
## 2024-05-18 - Missing ARIA Labels on Icon Ligatures
**Learning:** In this application, many core UI components (like `LuxuryGarmentDetail.tsx` and others) use icon-only buttons with text ligatures (e.g. `<span className="material-symbols-outlined">share</span>`). These ligatures are completely opaque to screen readers, meaning the button's purpose is not announced.
**Action:** When working on UI components, specifically check for `material-symbols-outlined` usage within buttons or links that lack descriptive text. Always add `aria-label` attributes to these elements to ensure full accessibility.
