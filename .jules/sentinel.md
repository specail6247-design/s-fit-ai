## 2026-05-29 - Path Traversal in API Route
**Vulnerability:** A path traversal vulnerability existed in `app/api/try-on/route.ts` because user-supplied `garmentImageUrl` was used to read local files without correctly checking if the resolved path was inside the `public` directory.
**Learning:** `path.join` with untrusted input can easily escape the intended directory since it resolves `..` components. Simple string replacement or prefix matching (without `path.sep`) can be bypassed.
**Prevention:** Always use `path.resolve` to get the absolute path and then explicitly verify that it `startsWith` the base directory plus `path.sep` (e.g., `absolutePath.startsWith(publicDir + path.sep)`).
