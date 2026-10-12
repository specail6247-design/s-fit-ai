## 2024-05-18 - Path Traversal in API Try-on Route
**Vulnerability:** Path traversal vulnerability in `app/api/try-on/route.ts` where `path.join` was used with a user-provided relative path to resolve local image files, which could allow accessing arbitrary files on the server (e.g. `../../../../etc/passwd`).
**Learning:** `path.join` does not sanitize directory traversal characters like `..`. When resolving local paths from user input, we must strictly validate that the resolved absolute path remains within the intended directory.
**Prevention:** Always use `path.resolve` to build the absolute path and verify that the resulting absolute path `startsWith` the base directory path (including the trailing path separator) before accessing the file system.
