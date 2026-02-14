# Palette's Journal

## 2025-05-18 - Accessibility of Hidden File Inputs
**Learning:** File inputs often use `display: none` (`hidden`) to style a custom label, but this removes them from the accessibility tree, preventing keyboard navigation.
**Action:** Use `sr-only` class to visually hide the input while keeping it keyboard accessible, and apply `focus-within` styles to the parent container to show focus state on the custom UI.
