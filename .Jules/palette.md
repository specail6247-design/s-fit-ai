## 2024-05-18 - ARIA Labels for Icon-Only Buttons
**Learning:** Found several icon-only buttons (`<span className="material-symbols-outlined">...</span>` inside `<button>`) across different components (`LuxuryGarmentDetail.tsx`, `PhotoFitting.tsx`) lacking `aria-label`s, indicating a common pattern in the codebase.
**Action:** Always ensure icon-only buttons have descriptive `aria-label` attributes to maintain accessibility for screen readers. Check for this pattern when creating or modifying components.
