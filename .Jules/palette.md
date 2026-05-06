
## 2024-05-06 - [Missing ARIA Labels on Icon Buttons]
**Learning:** A recurring pattern across multiple components (e.g., `LuxuryGarmentDetail.tsx`, `PhotoFitting.tsx`) is the use of icon-only buttons (using `material-symbols-outlined`) without accessible names (`aria-label`). This makes critical navigation and control actions invisible to screen reader users.
**Action:** Always verify icon-only buttons have descriptive `aria-label` attributes to ensure keyboard and screen reader accessibility for micro-interactions.
