## 2024-10-28 - Update route.ts
**Vulnerability:** Path traversal vulnerability due to use of path.join.
**Learning:** Usage of `path.join` with unsanitized paths allows for potential traversal outside the intended directory.
**Prevention:** Always use `path.resolve` and strict bounds checking with `path.sep` to ensure resolved paths stay within the intended base directory.
