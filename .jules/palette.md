## 2023-10-25 - Material Symbols Ligature Accessibility
**Learning:** Material Symbols rely on literal text ligatures (e.g., `light_mode`, `zoom_in`), which screen readers announce exactly as written (e.g., "light underscore mode"). This creates a confusing experience for assistive technologies.
**Action:** Always add `aria-hidden="true"` to the decorative `<span className="material-symbols-outlined">` and add a descriptive `aria-label` to the parent `<button>` or `<Link>` to provide a clear, human-readable name.
