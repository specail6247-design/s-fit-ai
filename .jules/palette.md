## 2024-05-14 - Improve Auth Modal Accessibility
**Learning:** React form components that rely solely on visually styled placeholders (like login modals) without explicit labels fail screen reader tests, and icon-only buttons need `aria-label`s.
**Action:** Always add explicit `aria-label` attributes to inputs that only use placeholders, and `aria-busy={loading}` to submit buttons for proper screen reader announcements.
