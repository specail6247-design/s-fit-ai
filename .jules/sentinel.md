## 2026-02-19 - Path Traversal in File Access
**Vulnerability:** Found a Path Traversal vulnerability in `app/api/try-on/route.ts` where user input was directly joined with system paths without verifying the result stayed within the allowed directory.
**Learning:** Node.js `path.join` does not prevent traversal (e.g., `../`). Simply removing a leading slash is insufficient.
**Prevention:** Always use `path.resolve` to get the absolute path and verify it starts with the resolved allowed root path (e.g., `absolutePath.startsWith(allowedRoot + path.sep)`). Also, enforce strict file extension allowlists for file read operations.
