## 2024-10-05 - Ligature Icon Accessibility
**Learning:** When using ligature-based icon fonts like Material Symbols, screen readers will read the literal text (e.g., 'zoom_in') if left exposed, creating confusing audio experiences.
**Action:** Always add `aria-hidden="true"` to the icon `<span>` and an explicit `aria-label` to the parent interactive element (e.g., `<button>`).
