## 2024-03-24 - Added ARIA attributes to Auth Modal
**Learning:** React state elements in modals (like login forms) typically lack inherent accessible labels as they are visually styled with placeholders.
**Action:** Always add `aria-label` to placeholder-only inputs and `aria-busy` to loading buttons to ensure screen readers can announce changes properly.
