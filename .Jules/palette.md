## 2024-07-13 - Screen Reader Handling of Material Symbols Ligatures
**Learning:** Material symbols using ligatures (e.g., "arrow_back") are read literally by screen readers, which creates a poor experience (e.g., "arrow underscore back"). This is a prevalent pattern in the app.
**Action:** Always apply `aria-hidden="true"` to the icon `<span className="material-symbols-outlined">` and provide a descriptive `aria-label` on the parent interactive element (button or link).
