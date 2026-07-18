## 2025-02-25 - [Path Traversal in Try-On API]
**Vulnerability:** Path traversal vulnerability in `app/api/try-on/route.ts` via `garmentImageUrl` parameter.
**Learning:** `path.join(process.cwd(), 'public', relativePath)` without checking if the resulting absolute path stays within the intended directory allows directory climbing (e.g., `/../../../etc/passwd`).
**Prevention:** Always use `path.resolve` and enforce that the resolved absolute path starts with the intended base directory using `.startsWith(baseDir + path.sep)`.
