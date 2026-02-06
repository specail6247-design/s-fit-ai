## 2026-05-21 - Invalid Nesting in Accessible Cards
**Learning:** Wrapping complex cards in a `<button>` tag causes invalid HTML when the card contains block-level elements (div, h3, p). This triggers React hydration errors and potential rendering issues, despite being semantically attractive for simple cases.
**Action:** For complex interactive cards, use `<div role="button" tabIndex={0}>` with explicit `onKeyDown` handlers for Enter/Space keys to maintain accessibility while ensuring valid HTML structure.
