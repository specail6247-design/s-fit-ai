## 2024-06-03 - Interactive Motion Card Accessibility
**Learning:** Using `<motion.div>` with `onClick` for interactive cards breaks keyboard accessibility and screen reader support. Nested interactive elements like `<button>` inside these divs cause invalid HTML and navigation issues.
**Action:** Convert `<motion.div onClick={...}>` to `<motion.button>` with `aria-label` and `focus-visible` styles. Ensure inner interactive elements are changed to non-interactive equivalents like `<span className="block">`.
