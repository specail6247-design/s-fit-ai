## 2025-05-09 - Path Traversal in API Route
**Vulnerability:** Path traversal in `app/api/try-on/route.ts` where user input `localPath` is joined with `process.cwd()` without validation.
**Learning:** Always validate that paths constructed from user input resolve within the expected base directory.
**Prevention:** Use `path.join` and check if the resolved `absolutePath` starts with the `publicDir + path.sep`.
