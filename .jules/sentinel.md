# Sentinel's Journal

## 2025-05-15 - Path Traversal in File Upload Handler
**Vulnerability:** The `localFileToDataUri` helper in `app/api/try-on/route.ts` allowed reading arbitrary files on the server by accepting relative paths like `../package.json` in the `garmentImageUrl` field.
**Learning:** `path.join` resolves `..` segments but does not restrict the result to a base directory. Always validate the final resolved path against the allowed root directory.
**Prevention:** Use `path.resolve` to get absolute paths for both the root and the target, then check if the target starts with `root + path.sep`.
