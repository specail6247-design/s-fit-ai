## 2024-05-18 - Material Symbols Screen Reader Ligature Issue
**Learning:** This app extensively uses Google Material Symbols with text ligatures (e.g., `<span className="material-symbols-outlined">zoom_in</span>`). Screen readers will literally read "zoom in" or "share" as text, which can be confusing without context or when combined with `aria-label` on parent buttons.
**Action:** When adding `aria-label` to icon-only buttons using Material Symbols, ALWAYS add `aria-hidden="true"` to the inner `<span>` to prevent double-reading or confusing screen reader output.
