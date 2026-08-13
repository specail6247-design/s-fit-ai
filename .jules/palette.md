## 2025-03-05 - Missing ARIA Labels on Icon Buttons in Live Fitting
**Learning:** Icon-only control buttons in interactive components like `ARLiveFitting.tsx` (e.g., photo library, camera, refresh) frequently lack descriptive `aria-label`s, rendering them inaccessible to screen readers.
**Action:** Always add descriptive `aria-label` attributes to icon-only buttons to ensure they are properly announced by screen readers, particularly in complex UI overlays.
