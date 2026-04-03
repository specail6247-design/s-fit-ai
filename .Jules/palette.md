## 2024-04-03 - Icon-only Button Accessibility
**Learning:** Buttons relying solely on `material-symbols-outlined` spans lack descriptive text, making them inaccessible to screen readers and difficult to navigate via keyboard.
**Action:** Always include an `aria-label` attribute on icon-only buttons and append focus visibility classes (e.g., `focus-visible:ring-2 focus-visible:outline-none`) to improve keyboard navigation.
