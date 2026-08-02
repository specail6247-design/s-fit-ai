## 2024-08-02 - Icon-only buttons accessibility pattern
**Learning:** Found a recurring pattern in the app (`components/LuxuryGarmentDetail.tsx`) where icon-only action buttons (e.g., share, zoom, light mode, back link) lacked `aria-label` attributes, rendering them invisible to screen readers.
**Action:** Always verify that interactive elements containing only icons or `material-symbols-outlined` spans include explicit `aria-label` attributes to ensure screen reader accessibility.
