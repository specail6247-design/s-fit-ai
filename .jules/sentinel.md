# Sentinel Journal

## 2026-02-05 - Path Traversal in File Upload
**Vulnerability:** The `localFileToDataUri` function in `app/api/try-on/route.ts` was vulnerable to path traversal. It joined a user-provided path with `process.cwd()` without validating if the resolved path was within the intended directory (public folder). This could allow reading arbitrary files on the server (e.g., `package.json`).
**Learning:** Using `path.join` with user input is dangerous. Even if you prepend a safe directory, `..` sequences can escape it. Always use `path.resolve` and verify the result starts with the expected root directory.
**Prevention:** Always use a dedicated utility function for file path resolution that enforces a root directory check (e.g., `startsWith(ROOT_DIR)`). Created `lib/fileUtils.ts` to centralize this logic.
