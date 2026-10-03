## 2023-10-24 - Path Traversal in API Route
**Vulnerability:** Path traversal in `app/api/try-on/route.ts` local file processing allowed arbitrary file read.
**Learning:** `path.join` does not prevent path traversal if the user input contains `../`. The input path can escape the intended directory.
**Prevention:** Always use `path.resolve` and verify that the resolved path strictly starts with the base directory plus a path separator (`basePath + path.sep`).
