## 2024-03-27 - Initial Palette setup\n**Learning:** Creating journal for UX/a11y insights.\n**Action:** Add entries when learning about app components.

## 2026-03-27 - Missing ARIA labels on Icon-only Buttons
**Learning:** The app frequently uses icon-only buttons with `material-symbols-outlined` spans for styling (e.g., in ARLiveFitting and LuxuryGarmentDetail), but omits `aria-label` attributes. This makes these buttons completely inaccessible to screen readers, as they simply read out the icon's ligature name (like 'camera' or 'zoom in') as text, or nothing meaningful.
**Action:** When adding or modifying icon-only buttons in the design system, explicitly enforce the inclusion of an `aria-label` on the `<button>` element to describe the action.
