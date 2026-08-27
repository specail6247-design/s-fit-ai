## 2025-02-20 - Icon Font Ligature Accessibility
**Learning:** Icon font ligatures (like `<span className="material-symbols-outlined">info</span>`) are read aloud by screen readers as the literal text, which ruins the experience.
**Action:** When adding `aria-label` to icon buttons, ALWAYS add `aria-hidden="true"` to the inner icon `span`.
