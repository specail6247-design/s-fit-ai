## 2026-05-07 - [Missing ARIA Labels on Material Icons]
**Learning:** Icon-only buttons using `material-symbols-outlined` text ligatures are completely opaque to screen readers in this project's component patterns.
**Action:** Always add explicit `aria-label` attributes to any interactive element (button or link) where the child content is solely a material symbol ligature.
