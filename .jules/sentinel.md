# Sentinel's Journal

## 2025-02-17 - Path Traversal in Local File Access
**Vulnerability:** Path Traversal in `app/api/try-on/route.ts` via `localFileToDataUri`.
**Learning:** `path.join` and `path.resolve` alone do not prevent directory traversal (e.g., `../`). Strict validation of the resolved path against the allowed root directory is mandatory.
**Prevention:** Always resolve paths to absolute form and verify they start with the intended root directory path (plus separator) before accessing the file system.
