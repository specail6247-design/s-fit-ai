## 2025-06-05 - Missing ARIA Labels on Close Buttons
**Learning:** Found a pattern where multiple modal and overlay components (e.g., `AuthButton`, `FittingRoom`) implement close actions using icon-only buttons (like `✕` or `Close` text with purely visual styling) but lack `aria-label` attributes, making them inaccessible to screen readers.
**Action:** Always verify that buttons lacking descriptive text content, especially those used for dismissing or closing UI elements, include an `aria-label="Close"` or similar descriptive attribute to ensure accessibility.
