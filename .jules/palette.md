## 2024-08-19 - Adding ARIA labels to icon-only buttons
**Learning:** React elements with only icons or symbols visually communicate purpose but are inaccessible to screen readers without proper aria-labels. In S_FIT AI, utility buttons for features like "Photo Library", "Refresh", and "Share" lacked accessibility context.
**Action:** When adding new interactive elements containing only visual icons (such as Google Material Symbols), ensure a descriptive `aria-label` is always added to the `<button>` element to conform to WCAG 2.1 guidelines.
