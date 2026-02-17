## 2025-05-19 - Path Traversal in File Utilities
**Vulnerability:** Found a Path Traversal vulnerability in `localFileToDataUri` within `app/api/try-on/route.ts`. The function used `path.join` to construct file paths from user input without verifying if the resolved path remained within the intended `public` directory.
**Learning:** `path.join` does not prevent directory traversal (e.g., `../`). In Node.js, simply joining paths is insufficient for security when user input is involved.
**Prevention:** Always use `path.resolve` to get the absolute path of both the root directory and the target file, then verify that the target path starts with the root path (or use `path.relative` to check for `..` segments) before accessing the file.
