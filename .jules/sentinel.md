## 2025-03-10 - LFI/Path Traversal in Try-On API
**Vulnerability:** The `app/api/try-on/route.ts` API route allowed Local File Inclusion (LFI) and path traversal when processing local files as data URIs. The `path.join` function was used without validating if the resolved path stayed within the `public` directory.
**Learning:** `path.join` does not inherently prevent path traversal if user input contains `../`. In Node.js, you must explicitly resolve and check that the resulting absolute path starts with the intended base directory.
**Prevention:** Always validate user-provided file paths by using `path.resolve` for both the base and target directories, and strictly verify that the target path starts with the base directory plus a path separator (`path.sep`).
