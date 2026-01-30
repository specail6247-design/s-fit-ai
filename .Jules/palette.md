## 2025-10-26 - [Auth Modal Accessibility]
**Learning:** High-contrast minimal designs often rely on placeholders, which fails WCAG 3.3.2 (Labels or Instructions). Using `aria-label` allows us to maintain the aesthetic while fixing the accessibility gap.
**Action:** Audit all form inputs for missing labels and prefer `aria-label` over visible labels when strict adherence to the design system is required.
