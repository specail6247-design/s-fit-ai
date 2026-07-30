## 2026-07-30 - Prevent Path Traversal in File Resolution
**Vulnerability:** The `localFileToDataUri` function used `path.join` with user-provided relative paths without validating if the resolved path stayed within the intended directory (e.g., `public`).
**Learning:** Using `path.join` alone is insufficient to prevent path traversal (e.g., using `../../`) when resolving paths from untrusted user input, as it will resolve the relative segments and can escape the base directory.
**Prevention:** Use `path.resolve` with the base directory and the relative path, and explicitly validate that the resulting absolute path starts with the base directory explicitly followed by a path separator (e.g., `absolutePath.startsWith(publicDir + path.sep)`) to securely prevent path traversal.
