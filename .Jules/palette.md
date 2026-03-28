## 2024-05-24 - Accessibility for Material Symbols Icon-Only Buttons
**Learning:** Icon-only buttons that rely on `material-symbols-outlined` span classes (like `share`, `zoom_in`, `camera`) for visual content are completely invisible to screen readers without explicit `aria-label` attributes.
**Action:** Always add an explicit `aria-label="[Description]"` to `<button>` elements when their only visible child is a purely decorative icon span.
