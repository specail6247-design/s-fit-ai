## 2024-05-01 - [Missing ARIA Labels on Icon-Only Buttons]
**Learning:** In luxury and minimalist design patterns like in `LuxuryGarmentDetail.tsx`, icon-only buttons are extremely common but frequently lack ARIA labels, creating significant accessibility barriers for screen readers.
**Action:** Always verify that icon-only buttons (especially those using `material-symbols-outlined` or similar icons) have an explicit `aria-label` attribute describing their function.
