## 2026-01-23 - Path Traversal in File Utility
**Vulnerability:** The `localFileToDataUri` function in `app/api/try-on/route.ts` was vulnerable to path traversal (Local File Inclusion). It accepted user-controlled input (`garmentImageUrl`) and used it to construct a file path via `path.join` without verifying the resulting path was contained within the intended `public` directory.
**Learning:** `path.join` resolves `..` segments but does not enforce containment. Simply joining paths is insufficient for security when user input is involved.
**Prevention:** Always use `path.resolve` to get the absolute path and then verify it starts with the expected root directory (e.g., `resolvedPath.startsWith(expectedRoot)`).
