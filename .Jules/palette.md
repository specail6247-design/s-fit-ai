## 2024-05-14 - Accessible File Inputs
**Learning:** File inputs hidden with `display: none` (e.g. `className="hidden"`) prevent keyboard navigation and break accessibility. Screen readers and keyboard users cannot interact with them.
**Action:** Use `sr-only` to visually hide the input while keeping it accessible, and apply `focus-within` styles to the parent `<label>` to provide a visible focus indicator.

## 2024-05-14 - Semantic ARIA labels for buttons and icons
**Learning:** Icon-only buttons and placeholder icons need clear semantic descriptions for screen readers. Using emoji as icons requires `role="img"` and `aria-label`.
**Action:** Always add `aria-label` to buttons without text content, and provide semantic meaning to visual placeholders.
