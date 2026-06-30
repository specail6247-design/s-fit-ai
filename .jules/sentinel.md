## 2024-05-18 - [Path Traversal in localFileToDataUri]
**Vulnerability:** Unsanitized user input `localPath` in `app/api/try-on/route.ts` was directly joined with the `public` directory path, allowing attackers to escape the directory using `../` (e.g., `../../etc/passwd`).
**Learning:** `path.join` does not prevent path traversal if the inputs contain upward navigation sequences.
**Prevention:** Always resolve the final path using `path.resolve` and verify that the resulting absolute path strictly starts with the intended base directory (using trailing slashes to prevent partial path matching bypasses).
