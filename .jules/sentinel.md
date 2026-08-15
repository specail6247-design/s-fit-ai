## 2023-10-25 - Path Traversal in File Loading API
**Vulnerability:** The try-on API allowed arbitrary file reads (path traversal) because user-provided local file paths (`garmentImageUrl`) were resolved using `path.join` without verifying they stayed within the intended `public` directory.
**Learning:** Using `path.join` with untrusted input can easily escape the intended directory, especially when leading slashes are stripped.
**Prevention:** Always use `path.resolve` for both the target directory and the requested file, then strictly verify that the resolved file path starts with the resolved target directory path (e.g., `resolvedPath.startsWith(targetDir + path.sep)`).
