## 2024-05-14 - Aria Labels on Material Symbols
**Learning:** Icon-only buttons using `material-symbols-outlined` need `aria-label`s on the button element and `aria-hidden="true"` on the inner span for screen reader accessibility.
**Action:** Always add `aria-label` to the wrapper button and `aria-hidden="true"` to the icon string span in `LuxuryGarmentDetail` and similar components.
