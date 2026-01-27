## 2025-02-19 - Clickable Card Accessibility Pattern
**Learning:** Found critical navigation components (`ModeSelector`) implemented as clickable `div`s with nested `button`s, creating a keyboard trap and semantic confusion for screen readers.
**Action:** For all future "Card" components that are clickable, use `motion.button` (or `button`) as the wrapper. If visual buttons exist inside, render them as `div` or `span` to preserve design while maintaining valid HTML semantics (no interactive-inside-interactive). Use `aria-labelledby` to link the card to its title.
