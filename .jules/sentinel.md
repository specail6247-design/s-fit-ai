## 2025-05-20 - Path Traversal in File Upload
**Vulnerability:** The `localFileToDataUri` function in `app/api/try-on/route.ts` allowed reading arbitrary files via path traversal (e.g., `/../package.json`) because it didn't validate that the resolved path remained within the `public` directory.
**Learning:** `path.join` resolves `..` segments but doesn't prevent traversing out of the base directory. Always check the final absolute path against the allowed root.
**Prevention:** Use `path.resolve` to get the absolute path and verify it starts with the expected root directory using `.startsWith()`.
