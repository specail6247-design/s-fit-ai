## 2025-05-18 - File Input Accessibility
**Learning:** File inputs were completely hidden using `display: none` (Tailwind `hidden` class), making them inaccessible to keyboard users and screen readers.
**Action:** Always use `.sr-only` (visually hidden) for file inputs and apply `focus-within` styles to the parent container to provide clear visual feedback when the hidden input receives focus.
