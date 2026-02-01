## 2026-01-22 - Path Traversal in API Route
**Vulnerability:** The `localFileToDataUri` function in `app/api/try-on/route.ts` concatenated user input with a base path without verifying the resulting path remained within the intended directory.
**Learning:** `path.join` in Node.js resolves `..` segments, which can allow escaping the intended directory if the user input contains traversal characters.
**Prevention:** Always use `path.resolve` to get the absolute path and check that it starts with the intended root directory (e.g., `absolutePath.startsWith(rootPath)`) before filesystem access.
