## 2024-07-13 - [Sentinel] Fix path traversal in Try-On API
**Vulnerability:** The Try-On API converted local file paths to base64 using unsanitized user input with `path.join`, allowing potential path traversal vulnerabilities to access files outside the `public` directory.
**Learning:** Always use `path.resolve` to generate an absolute path from user input and explicitly verify that the resolved path starts with the intended base directory using `.startsWith(baseDirectory + path.sep)`.
**Prevention:** Avoid `path.join` with unsanitized inputs for file access. Implement validation logic on all file operations resolving from user-provided paths.
