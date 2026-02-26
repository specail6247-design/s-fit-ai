## 2025-05-15 - Path Traversal in File Utils
**Vulnerability:** The `localFileToDataUri` function naively joined `process.cwd()` with user input, allowing access to files outside the `public` directory via `..` segments.
**Learning:** `path.join` does not sandbox paths; it resolves `..`. Even if you prepend `process.cwd()`, attackers can traverse up.
**Prevention:** Always resolve the absolute path and verify it starts with the intended directory path using `.startsWith()`.
