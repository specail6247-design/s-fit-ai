
## 2025-03-08 - Prevent Path Traversal in API Try-on Route
**Vulnerability:** The `/api/try-on` endpoint allowed path traversal by concatenating unsanitized user input (`relativePath`) with a base directory using `path.join`. This allowed an attacker to request files outside the intended `public` directory (e.g., `/../../../etc/passwd`).
**Learning:** Using `path.join` with unsanitized paths is insufficient to keep resolved paths inside a base directory. Input validation is required to ensure the resolved absolute path starts with the intended base directory.
**Prevention:** Always use `path.resolve` to normalize the path and explicitly check that the resolved path strictly starts with the base directory appended with `path.sep` (e.g., `absolutePath.startsWith(baseDir + path.sep)`).
