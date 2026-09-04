## 2025-03-09 - Path Traversal in Local File Reader
**Vulnerability:** Path traversal vulnerability in `localFileToDataUri` within `app/api/try-on/route.ts` allowed reading arbitrary files via `garmentImageUrl`.
**Learning:** `path.join` without validation allows users to construct paths that escape the intended base directory using `../`.
**Prevention:** Always use `path.resolve` and explicitly validate that the resulting absolute path starts with `baseDir + path.sep` before reading files.
