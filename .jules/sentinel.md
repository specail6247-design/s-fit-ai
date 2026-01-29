# Sentinel's Journal

## 2025-05-23 - Path Traversal in File Handling
**Vulnerability:** Path Traversal (CWE-22) in `app/api/try-on/route.ts`
**Learning:** The `localFileToDataUri` function naively joined `process.cwd()` with user-controlled input without validating that the resolved path remained within the intended directory (`public`). Using `path.join` alone does not prevent traversal via `..`.
**Prevention:** Always validate that the resolved absolute path starts with the intended root directory (e.g., `publicDir`) using `startsWith` (ensuring directory separator) or by checking `path.relative` does not start with `..`.
