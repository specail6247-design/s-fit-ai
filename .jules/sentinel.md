
## 2026-09-20 - Prevent Path Traversal using absolute path checks
**Vulnerability:** Path traversal in Node.js file read operations.
**Learning:** `path.join` and `path.resolve` alone do not prevent path traversal if the user input contains `../` sequences, and `absolutePath.startsWith(baseDir)` is insufficient because `/app/public_secrets` matches `/app/public`.
**Prevention:** Always check if the resolved absolute path starts with `baseDir + path.sep` and is within the intended directory.
