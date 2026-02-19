## 2025-05-20 - Icon-Only Buttons Accessibility
**Learning:** Icon-only buttons using `material-symbols-outlined` or similar icon fonts are completely inaccessible to screen readers without explicit labels, as the text content is often the icon name (e.g., "share", "360") or a ligature, which may not be meaningful or announced correctly.
**Action:** Always add `aria-label` to buttons that rely solely on icons for visual affordance.
