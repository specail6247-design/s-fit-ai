## 2026-08-11 - Icon-only vs Text-inclusive Buttons
**Learning:** When building custom close buttons or modals, developers often use the '✕' symbol. We must add `aria-label` to these buttons when they are icon-only, but strict adherence to WCAG 2.5.3 means we *avoid* adding `aria-label` if the button already contains visible text (e.g., '✕ Close').
**Action:** Audit buttons with symbols. If text is present alongside the symbol, rely on the visual text. If only a symbol is present, add an explicit `aria-label`.
