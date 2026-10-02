## 2024-06-25 - Prevent Path Traversal in API Endpoints using Local Files
**Vulnerability:** The `localFileToDataUri` function in `app/api/try-on/route.ts` used `path.join` with untrusted user input without enforcing boundary checks on the resolved absolute path.
**Learning:** Using `path.join` is insufficient for safety since it allows sequences like `../` to resolve outside the intended directory.
**Prevention:** Always use `path.resolve` and strictly verify that the resulting absolute path explicitly starts with the intended base directory plus a trailing path separator (`baseDir + path.sep`).
