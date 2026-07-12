## 2025-07-12 - [Path Traversal in Try-On API]
**Vulnerability:** Unsanitized user input was used with `path.join` to read files, allowing directory traversal attacks.
**Learning:** Always use `path.resolve` and verify the resolved path is scoped within the intended base directory using `.startsWith()`.
**Prevention:** Ensure all file access paths derived from user input are strictly validated against their intended root directory.
