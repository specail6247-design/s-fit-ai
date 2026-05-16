## 2024-05-16 - Add aria-labels to icon-only buttons
**Learning:** Icon-only buttons relying on material-symbols-outlined text ligatures are opaque to screen readers without explicit ARIA labels. I discovered several missing `aria-label`s in `LuxuryGarmentDetail.tsx`, `ARLiveFitting.tsx`, and `PhotoFitting.tsx`.
**Action:** Adding explicit `aria-label` attributes to these buttons ensures accessibility compliance, which aligns with Palette UX guidelines.
