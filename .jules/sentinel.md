## 2025-02-27 - Fix Path Traversal in API
**Vulnerability:** Path traversal in `app/api/try-on/route.ts` via unsanitized `localPath` in `path.join()`.
**Learning:** `path.join` resolves `../` sequences, allowing bypass of the intended base directory.
**Prevention:** Always check if the resolved absolute path starts with the intended base directory plus `path.sep` to prevent both directory traversal and partial path matching.
