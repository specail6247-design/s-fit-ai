## 2025-06-09 - Accessibility of Google Material Symbols
**Learning:** When using Google Material Symbols (e.g. `material-symbols-outlined`), screen readers may announce the literal text inside the span (like "arrow_back" or "person_add_alt") if it's not hidden. This creates a confusing experience for screen reader users when these icons are used as icon-only buttons.
**Action:** Always add `aria-hidden="true"` to the icon span itself to hide the literal text from screen readers, and provide a descriptive `aria-label` on the parent interactive element (button or link) to convey its action.
