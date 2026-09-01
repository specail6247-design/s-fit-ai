## 2026-09-01 - Fix Path Traversal in Virtual Try-On API
**Vulnerability:** Path traversal vulnerability in `app/api/try-on/route.ts` where `path.join` was used to construct local file paths from user input.
**Learning:** `path.join` with unsanitized user input allows `../` sequences to traverse outside the intended directory.
**Prevention:** Use `path.resolve` with a base directory and validate that the resolved path strictly begins with `baseDir + path.sep` to enforce boundary constraints.