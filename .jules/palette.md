## 2024-03-01 - Icon-Only Button Accessibility Pattern
**Learning:** When implementing cinematic UIs or luxury interfaces with minimalistic overlays, standardizing aria-labels on icon-only buttons prevents severe accessibility regressions across complex 3D experiences.
**Action:** Always verify overlay `<button>` elements that only wrap icons or emojis (`<span className="material-symbols-outlined">...</span>`) include descriptive `aria-label` attributes.
