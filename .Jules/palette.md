## 2026-05-15 - [Add ARIA labels to icon-only buttons]
**Learning:** Discovered a pattern across multiple app components where icon-only buttons relying on `material-symbols-outlined` text ligatures were completely inaccessible to screen readers because the ligatures are opaque to assistive technologies.
**Action:** Ensure all interactive elements utilizing text ligature icons explicitly include descriptive `aria-label` attributes to maintain accessibility.
