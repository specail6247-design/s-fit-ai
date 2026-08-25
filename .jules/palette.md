## 2024-05-18 - Screen Reader Issues with Icon Ligatures
**Learning:** Icon font ligatures (e.g., 'zoom_in', '360', 'light_mode') inside `<span>` tags without `aria-hidden="true"` are read literally by screen readers, which confuses users. Buttons that rely solely on these icons lack accessible names if they don't have an `aria-label`.
**Action:** When using icon fonts in buttons, always add an explicit `aria-label` to the button and set `aria-hidden="true"` on the icon element to ensure screen readers read the descriptive action rather than the ligature name.
