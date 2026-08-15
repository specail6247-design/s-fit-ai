## 2024-08-15 - Add ARIA Labels to Icon-Only Buttons in ARLiveFitting and PhotoFitting
**Learning:** Found several icon-only buttons in `components/ARLiveFitting.tsx` and `components/PhotoFitting.tsx` lacking accessible names (ARIA labels). Screen reader users wouldn't know the purpose of these buttons (e.g., photo library, capture, refresh, back, info).
**Action:** Always ensure icon-only buttons have an `aria-label` or visually hidden text to provide an accessible name for screen readers.
