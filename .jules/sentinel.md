## 2024-05-24 - [CRITICAL] Path Traversal in File Handling
**Vulnerability:** Path traversal vulnerability in `app/api/try-on/route.ts` through unvalidated `localPath` parameter, allowing arbitrary file read outside the `public` directory (e.g., `/etc/passwd`).
**Learning:** `path.join` with user input without validating if it stays within the expected base directory leads to path traversal. `path.resolve` combined with a `startsWith` check on the base directory is required.
**Prevention:** Always resolve paths to their absolute forms and verify they strictly start with the intended base directory before passing them to filesystem operations.
