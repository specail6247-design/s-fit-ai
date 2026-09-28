## 2024-05-18 - Added ARIA labels to close buttons
**Learning:** Icon-only close buttons lacking ARIA labels are a common accessibility issue across various component modes (e.g. `FittingRoom`, `AuthButton`, `DigitalTwinMode`).
**Action:** Always add `aria-label` to buttons relying only on text icons like "✕" and wrap the text icon in `<span aria-hidden="true">` to prevent redundancy or unhelpful screen reader announcements.
