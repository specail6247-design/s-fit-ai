## 2025-02-14 - Fix Path Traversal Vulnerability in Try-On API
**Vulnerability:** The `localFileToDataUri` function used `path.join` on user-supplied paths without verifying if the final path was contained within the intended `public` directory, leading to a path traversal vulnerability.
**Learning:** Using `path.join` with relative paths is insecure against `../` attacks.
**Prevention:** Use `path.resolve` to resolve absolute paths and explicitly validate that the resolved absolute path `.startsWith()` the intended base directory followed by a path separator (`path.sep`).
