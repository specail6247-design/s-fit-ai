# Sentinel Journal 🛡️

This journal records critical security learnings and vulnerability patterns found in the codebase.
Only add entries for unique, project-specific security insights.

## 2025-05-19 - Path Traversal in File Upload Logic
**Vulnerability:** The `localFileToDataUri` function in `app/api/try-on/route.ts` used `path.join` with user-supplied input without verifying that the resolved path remained within the intended directory (`public/`). This allowed attackers to read arbitrary files on the server by supplying paths like `/../../package.json`.
**Learning:** `path.join` normalizes paths but does not prevent traversal out of a root directory.
**Prevention:** Always use `path.resolve` to get the absolute path and verify it starts with the intended root directory path (e.g., `publicDir + path.sep`).
