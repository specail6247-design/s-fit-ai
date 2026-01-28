# Palette's Journal

## 2025-01-22 - Accessibility in Interactive Cards
**Learning:** Interactive cards implemented as clickable `div`s with nested buttons create confusion for screen readers and break keyboard navigation.
**Action:** Always use semantic `<button>` or `<a>` elements for the entire card wrapper and avoid nested interactive elements. Use pseudo-classes or simplified DOM for inner "buttons".
