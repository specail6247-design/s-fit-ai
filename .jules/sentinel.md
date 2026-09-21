## 2024-05-18 - Prevent Path Traversal using path.resolve
**Vulnerability:** Found a path traversal vulnerability in `app/api/try-on/route.ts` where `path.join` was used with unvalidated user input, allowing access to arbitrary files on the system via `..` segments.
**Learning:** `path.join` does not prevent directory traversal if the appended path contains `..`. We must check if the resolved path starts with the intended base directory.
**Prevention:** Always use `path.resolve` and verify `absolutePath.startsWith(baseDir + path.sep) && absolutePath !== baseDir` to strictly enforce directory boundaries and avoid sibling directory access.
