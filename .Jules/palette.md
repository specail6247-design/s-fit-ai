## 2024-05-28 - Emoji Screen Reader Accessibility
**Learning:** In the RealLifeFitting component, native emojis (e.g., 👤, 👕, ⚡️) were used as visual icons inside `<span>` elements but lacked appropriate screen reader attributes, causing them to be announced incorrectly or unhelpfully by assistive technologies.
**Action:** When using emojis as icons, explicitly add `role="img"` and a descriptive `aria-label` for informative icons, or `aria-hidden="true"` for decorative icons positioned alongside descriptive text.
