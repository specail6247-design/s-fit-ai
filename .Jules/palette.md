## 2026-02-23 - [Accessible File Inputs]
**Learning:** Hidden file inputs (`display: none`) are inaccessible to keyboard users. Using `sr-only` keeps them focusable, but requires `focus-within` styling on the parent container to provide visual feedback.
**Action:** Always use `sr-only` + `focus-within` for custom file inputs instead of `hidden`.
