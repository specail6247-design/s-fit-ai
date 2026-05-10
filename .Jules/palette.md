## 2024-05-10 - ARIA Labels for Material Symbols Ligatures
**Learning:** In this application, many components use `material-symbols-outlined` text ligatures for icons inside buttons or links without additional accessible text. Since screen readers may read the raw ligature string (e.g., "zoom_in") or nothing at all, these interactive elements are inaccessible.
**Action:** Always ensure that icon-only interactive elements using text ligatures have explicit `aria-label` attributes to provide context to assistive technologies.
