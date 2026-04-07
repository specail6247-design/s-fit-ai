## 2025-04-07 - Accessible Icon-Only Buttons
**Learning:** Icon-only buttons relying on `material-symbols-outlined` spans lack accessible names, making them invisible to screen readers, and often miss keyboard focus styles.
**Action:** Always add an explicit `aria-label` attribute and append `focus-visible:ring-2 outline-none` to the button classes, along with `aria-hidden="true"` on the icon span itself to prevent redundant screen reader announcements.
