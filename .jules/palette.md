## 2025-06-07 - Missing ARIA labels on Icon Buttons
**Learning:** Icon-only buttons using `material-symbols-outlined` span elements across the application lack `aria-label` attributes, rendering them inaccessible to screen readers and violating WCAG guidelines.
**Action:** Always add descriptive `aria-label` attributes to `button` or `Link` elements that only contain icons.
