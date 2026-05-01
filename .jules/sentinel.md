## 2024-05-18 - [Path Traversal in API Route]
**Vulnerability:** A path traversal vulnerability was found in the `app/api/try-on/route.ts` endpoint, allowing the reading of arbitrary local files outside the public directory.
**Learning:** Using `path.join` and checking `absolutePath.startsWith(baseDir)` is insufficient if partial matches are possible. For example, `baseDir` `/app/public` partially matches `/app/public_secrets`.
**Prevention:** Ensure correct boundary checking by verifying that `absolutePath` starts with `baseDir + path.sep` or strictly equals `baseDir`.
