## 2024-03-24 - Prevent Path Traversal in API Routes
**Vulnerability:** Path traversal via unsanitized `localPath` input resolving relative paths outside intended directory in `app/api/try-on/route.ts`.
**Learning:** Using `path.join()` without validating the resolved absolute path allows reading arbitrary files if input starts with `../`.
**Prevention:** Always use `path.resolve` to obtain the absolute path, and verify it strictly begins with the intended base directory `publicDir + path.sep`.
