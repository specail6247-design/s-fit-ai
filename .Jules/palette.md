# Palette's Journal

## 2024-05-22 - Accessibility Trap: Hidden Inputs
**Learning:** The codebase frequently uses `className="hidden"` (display: none) for file inputs, making them completely inaccessible to keyboard users. This seems to be a preferred pattern for custom styling here.
**Action:** Always replace `hidden` with `sr-only` (screen-reader only) for interactive elements that need to be visually hidden but functionally accessible. Ensure the visible trigger container has `focus-within` styles to indicate focus state.
