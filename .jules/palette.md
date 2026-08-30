## 2024-05-18 - Missing ARIA labels on close buttons
**Learning:** Many custom modal components use "✕" as the content for their close buttons without an `aria-label`. This makes it difficult for screen reader users to understand the button's purpose.
**Action:** Always add an explicit `aria-label` (e.g., `aria-label="Close modal"`) to icon-only buttons, especially those using non-standard text characters as icons.
