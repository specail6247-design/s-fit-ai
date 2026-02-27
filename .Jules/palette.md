## 2024-05-24 - File Input Accessibility
**Learning:** Hidden file inputs (`display: none` or `visibility: hidden`) are removed from the accessibility tree, making them inaccessible to keyboard users and screen readers.
**Action:** Use `sr-only` (or equivalent visually-hidden patterns) for file inputs instead of `hidden`. This keeps the element in the DOM and focusable, while hiding it visually. Ensure the parent label or container has clear focus styles (`focus-within`) to indicate when the hidden input has focus.

## 2024-05-24 - Client-Side Navigation
**Learning:** Using standard `<a>` tags for internal links in Next.js causes full page reloads, breaking the SPA experience and potentially resetting state.
**Action:** Always use `next/link` for internal navigation to ensure client-side routing and state preservation.
