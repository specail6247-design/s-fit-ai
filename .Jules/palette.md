## 2024-03-24 - Missing ARIA Labels on Icon Buttons
**Learning:** Many icon-only buttons across components like `ARLiveFitting.tsx`, `RealLifeFitting.tsx`, `LuxuryGarmentDetail.tsx` and `AuthButton.tsx` are missing `aria-label`s, making them inaccessible to screen readers. In `LuxuryGarmentDetail.tsx`, there are top navigation buttons and 3D UI overlays buttons using `material-symbols-outlined` with no labels.
**Action:** When adding icon-only buttons, always ensure an `aria-label` is present to maintain accessibility.
