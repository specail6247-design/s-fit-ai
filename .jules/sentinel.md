## 2026-07-27 - [Path Traversal in API]
**Vulnerability:** Found a path traversal vulnerability in `app/api/try-on/route.ts` where user input was resolved to file paths without checking if they escaped the intended directory.
**Learning:** Path joining (`path.join`) without checking bounds allows escaping the intended base directory using `../`.
**Prevention:** Always use `path.resolve` combined with an explicit boundary check using `startsWith(baseDir + path.sep)` to ensure paths are contained.
