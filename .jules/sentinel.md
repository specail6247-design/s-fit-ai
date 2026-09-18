
## 2025-02-23 - Prevent Path Traversal in Local File Read
**Vulnerability:** Path traversal vulnerability in `app/api/try-on/route.ts` allowed reading arbitrary local files using `fs.readFileSync` via manipulated `garmentImageUrl`.
**Learning:** `path.join` with user input does not prevent `../` from traversing outside the intended directory. Furthermore, validating with `startsWith(baseDir)` is flawed as it allows sibling directory access.
**Prevention:** Always use `path.resolve`, then strictly enforce directory boundaries by checking `absolutePath.startsWith(baseDir + path.sep)`.
