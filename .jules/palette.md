## 2024-05-18 - Missing ARIA labels in LuxuryGarmentDetail
**Learning:** Icon-only buttons with material-symbols-outlined ligatures require explicit aria-labels on parent and aria-hidden="true" on the icon for screen reader accessibility. This pattern exists in multiple components.
**Action:** Always verify icon-only buttons include these accessible attributes when using symbol ligature fonts.