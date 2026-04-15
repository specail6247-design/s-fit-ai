## 2024-05-24 - Path Traversal in API Route
**Vulnerability:** Found a path traversal vulnerability in `app/api/try-on/route.ts` where user-supplied `garmentImageUrl` was passed directly to `path.join` without validation.
**Learning:** `path.join` alone is insufficient to prevent path traversal when dealing with user input because it will resolve `..` segments, potentially allowing access to arbitrary files on the filesystem.
**Prevention:** Always use `path.resolve` with a known base directory, and explicitly verify that the resulting absolute path starts with `baseDir + path.sep` (or equals `baseDir`) to ensure the resolved path remains strictly within the intended directory boundaries.
