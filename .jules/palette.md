## 2024-09-16 - ModeSelector Accessibility Overhaul
**Learning:** In Next.js/Framer Motion apps, using interactive `<motion.div>` tags often breaks keyboard accessibility and tab order, creating issues where screen readers and keyboard users cannot activate features.
**Action:** Always replace interactive `<motion.div>` tags with `<motion.button>`, add `aria-label` attributes, implement `focus-visible` styles using Tailwind ring utilities for focus indicators, and convert inner nested buttons into `span`s with block display to preserve layout and avoid invalid HTML nesting.
