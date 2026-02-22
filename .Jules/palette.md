## 2024-05-22 - [Accessibilty] Brand Selector Keyboard Navigation
**Learning:** `motion.div` as a button replacement requires explicit `role="button"`, `tabIndex`, and `onKeyDown` handlers to fully emulate native button behavior, whereas `motion.button` provides this out of the box but needs care with default browser styles.
**Action:** Use `motion.button` for interactive elements whenever possible to inherit native accessibility features, only resorting to `motion.div` if the styling constraints are severe. Always verify `focus-visible` states.
