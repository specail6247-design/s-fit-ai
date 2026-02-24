# Palette's Journal - Critical Learnings

## 2024-05-23 - Tailwind Visibility vs Accessibility
**Learning:** The Tailwind `invisible` utility class hides elements from *both* visual users and screen readers (applies `visibility: hidden`). For accessible interactive elements that should be visually hidden but focusable (like custom checkboxes or radio inputs), `sr-only` must be used instead.
**Action:** When implementing custom form controls, always verify if `invisible` is being used where `sr-only` was intended to maintain keyboard and screen reader access.
