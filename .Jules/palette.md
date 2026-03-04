## 2024-05-20 - Accessible Icon-Only Material Symbols
**Learning:** Found an accessibility issue pattern in the app where icon-only buttons using Google Material Symbols (`<span className="material-symbols-outlined">`) are missing accessible names, causing screen readers to read the visual ligature text (e.g., "photo_library") instead of a descriptive action.
**Action:** Always add a descriptive `aria-label` to the parent `<button>` and set `aria-hidden="true"` on the inner `<span>` containing the Material Symbol ligature to ensure proper screen reader support across the design system.
