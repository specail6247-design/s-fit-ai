## 2025-03-04 - Icon-only buttons lacking ARIA labels
**Learning:** Found several floating and overlaid icon-only buttons (like those inside the 3D viewer in `LuxuryGarmentDetail.tsx` and the camera controls in `ARLiveFitting.tsx`) lacking `aria-label` attributes, making them inaccessible to screen readers. This pattern is common in complex, highly-visual components built rapidly.
**Action:** Always verify that buttons containing only a `<span className="material-symbols-outlined">` or similar icons have an explicit `aria-label` added to describe their function.
