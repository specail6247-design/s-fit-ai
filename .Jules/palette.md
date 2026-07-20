## 2024-07-20 - Icon-only Buttons ARIA Labels
**Learning:** Icon-only buttons with decorative spans (like material symbols) lack accessible names, causing screen readers to announce them improperly.
**Action:** Always add explicit `aria-label` attributes to `<button>` or `<Link>` elements that only contain icons.
