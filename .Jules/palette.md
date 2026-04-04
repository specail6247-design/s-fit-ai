## 2024-03-24 - Initial File\n**Learning:** Creating the palette log\n**Action:** Starting to document UX findings.

## 2024-03-24 - Icon-only buttons accessibility
**Learning:** Icon-only buttons relying purely on `material-symbols-outlined` or similar icon fonts lack context for screen readers and can be difficult to navigate via keyboard if focus indicators are missing.
**Action:** Always add explicit `aria-label` attributes describing the action, and append keyboard focus styles (e.g., `focus-visible:ring-2 outline-none`) to ensure accessibility for icon-only buttons.
