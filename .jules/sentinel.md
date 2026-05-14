## 2024-05-14 - Fix Path Traversal in localFileToDataUri
**Vulnerability:** Path Traversal (CWE-22) in `app/api/try-on/route.ts` where user-provided `garmentImageUrl` input directly constructed a local filesystem path without validation.
**Learning:** Using `path.join` with untrusted input can easily escape the intended directory using `../` or absolute paths.
**Prevention:** Always use `path.resolve` to get the absolute path, and verify the resulting path starts with the intended base directory using `.startsWith(baseDir + path.sep)` to ensure it stays contained.
