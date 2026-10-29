## 2024-10-29 - Path Traversal Prevention
**Vulnerability:** The API endpoint used `path.join` with unsanitized user input (`relativePath`) without verifying if the resolved path escaped the intended `public` directory.
**Learning:** `path.join` alone does not prevent a path like `../../etc/passwd` from escaping the root directory.
**Prevention:** Always use `path.resolve` against a known base directory, and explicitly verify bounds using `absolutePath.startsWith(baseDir + path.sep)` to prevent Partial Path Traversal.
