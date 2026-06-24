## 2025-03-05 - Accessibility on icon-only buttons
**Learning:** Found multiple icon-only buttons in LuxuryGarmentDetail.tsx that lacked ARIA labels, making them inaccessible to screen readers. Specifically, "zoom_in", "360", and "light_mode" buttons in the 3D UI overlays, as well as the "share" button in the top navigation. Adding `aria-label` ensures these controls are understandable.
**Action:** Always add descriptive `aria-label`s to icon-only buttons (`<button> <span class="material-symbols-outlined">icon</span> </button>`) to ensure accessibility compliance.
