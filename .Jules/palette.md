## 2024-07-21 - Accessible Mode Selector Cards
**Learning:** Using `div`s for interactive cards without appropriate ARIA roles and keyboard support breaks accessibility for screen reader and keyboard users. Complex interactive cards should ideally be semantic `<button>` elements if they act as a single action, avoiding nested interactive elements.
**Action:** Always use semantic `<button>` elements for selectable cards and ensure there are no nested `<button>` tags within them to maintain valid HTML and correct accessibility trees.
