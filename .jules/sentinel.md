## 2025-03-04 - [Path Traversal in API]
**Vulnerability:** Found `localFileToDataUri` in `app/api/try-on/route.ts` which allowed arbitrary file reading via `../` due to missing input validation.
**Learning:** `path.join` normalizes paths but does not prevent traversal outside the intended root. Always verify the resolved path is within the allowed directory.
**Prevention:** Use `path.resolve` + strict check `path.relative(root, resolved).startsWith('..')` or similar robust check.
