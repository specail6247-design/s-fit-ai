## 2026-07-27 - Added ARIA labels and Focus States to AuthButton
**Learning:** Icon-only close buttons in modals frequently lack `aria-label`s. Also, modal triggers and main buttons benefit greatly from visible focus states (`focus-visible:ring-2`) to support keyboard navigation.
**Action:** Always verify modals and auth components have focus indicators (`focus-visible`) and explicitly label icon buttons (`aria-label`) so screen readers can announce them.
