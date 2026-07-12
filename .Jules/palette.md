## 2025-03-05 - Material Symbols Accessibility
**Learning:** When using Google Material Symbols as ligatures (e.g., span containing text like "info"), screen readers will literally announce the icon name if not hidden.
**Action:** Always apply aria-hidden="true" to the material-symbols-outlined span, and apply an aria-label to its interactive parent element.
