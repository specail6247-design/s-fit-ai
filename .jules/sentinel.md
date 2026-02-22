# Sentinel's Journal

## 2025-03-05 - Path Traversal in Next.js API
**Vulnerability:** A path traversal vulnerability (CWE-22) in `app/api/try-on/route.ts` allowed reading arbitrary files by supplying `../` in `garmentImageUrl`.
**Learning:** `path.join` does not prevent traversal if user input contains `..`. The relative path logic was flawed because it trusted `relativePath` to stay within `public`.
**Prevention:** Use `path.resolve` to get absolute paths and verify containment using `path.relative` (ensure it doesn't start with `..` and isn't absolute).
