## 2025-03-04 - Screen Reader Redundancy on Text-Based Icons
**Learning:** Using `aria-label` on a button that contains a literal text character (like '✕') causes screen readers to redundantly read both the label and the character unless the character is hidden.
**Action:** Always wrap text-based icons in `<span aria-hidden="true">` when applying an `aria-label` to their parent `<button>`.
