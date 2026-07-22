## 2024-07-22 - Missing ARIA Labels on Interactive Elements
**Learning:** In ARLiveFitting.tsx, several interactive components meant to behave as buttons were implemented as `<div>` elements without semantic meaning or keyboard support. Additionally, icon-only `<button>` elements lacked `aria-label`s, making them invisible to screen readers.
**Action:** Always ensure that interactive elements that trigger actions are implemented as `<button>` elements, not `<div>`s. For icon-only buttons, always include descriptive `aria-label` attributes and visible focus states using `focus-visible`.
