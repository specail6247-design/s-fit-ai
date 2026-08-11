## 2026-08-11 - Path Traversal Prevention
**Vulnerability:** Path traversal vulnerability in `localFileToDataUri` allowing arbitrary file read via `../` sequences in the user-provided path parameter.
**Learning:** Using `path.join` with unsanitized user input allows directory traversal. Simply checking `startsWith(publicDir)` is insufficient due to partial path bypasses (e.g., `/public_secrets` matching `/public`).
**Prevention:** Always use `path.resolve` against a base directory and verify containment using `absolutePath.startsWith(baseDir + path.sep) && absolutePath !== baseDir`.
