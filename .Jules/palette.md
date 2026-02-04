# Palette's Journal

## 2024-05-22 - Interactive Cards as Buttons
**Learning:** Large interactive cards implemented as `div`s with `onClick` create a major accessibility barrier. Keyboard users cannot tab to them or activate them.
**Action:** Always implement clickable cards as `<button>` elements. Use `appearance-none` to reset styles, and ensure no interactive elements (like other buttons) are nested inside. Replace inner "fake buttons" with styled `div`s.
