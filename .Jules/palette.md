## 2024-05-18 - Interactive Elements Should Be Buttons
**Learning:** Found a pattern in the app (e.g., ARLiveFitting) where interactive controls (like close or flash toggle) were implemented as `div` elements without keyboard support (`tabIndex`, `onKeyDown`) or semantic meaning, and other icon-only buttons lacked `aria-label` attributes.
**Action:** Always ensure interactive elements that behave like buttons use the semantic `<button>` tag, include `aria-label`s for icon-only components, and have visible focus states (`focus-visible:ring-2`) for keyboard accessibility.
