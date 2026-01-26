## 2025-02-20 - Clickable Cards Accessibility
**Learning:** Large clickable cards implemented as `div`s with `onClick` are a major accessibility anti-pattern. They block keyboard users and screen readers.
**Action:** Always convert "card buttons" to `<button type="button">` or `<a>`. Ensure nested interactive elements (like fake "CTA" buttons) are converted to `span` or `div` to maintain valid HTML. Add `focus-visible` styles to the container.
