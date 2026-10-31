## 2024-11-01 - Created
## 2024-11-01 - Add ARIA Labels to Icon-Only Buttons
**Learning:** Found multiple icon-only interactive elements in `components/LuxuryGarmentDetail.tsx` (using Material Symbols) that were missing accessible names. Screen readers would not be able to announce the purpose of these buttons.
**Action:** Added `aria-label` attributes to the parent `<button>` or `<Link>` elements, and added `aria-hidden="true"` to the decorative icon `<span>` elements to prevent redundant or confusing screen reader announcements.
