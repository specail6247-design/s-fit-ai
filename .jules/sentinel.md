## 2025-02-18 - Prevent Path Traversal in API
**Vulnerability:** Found a Path Traversal vulnerability in `app/api/try-on/route.ts` where `path.join` was used with unsanitized input without checking if the resolved path escaped the intended public directory.
**Learning:** In Next.js Node-based routes, reading files via arbitrary user-supplied paths without boundary checks enables LFI (Local File Inclusion).
**Prevention:** Always use `path.resolve` and verify `absolutePath.startsWith(baseDir + path.sep)` to lock down the directory scope securely before executing file operations.
