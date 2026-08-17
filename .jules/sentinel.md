## 2024-08-17 - Path Traversal in Local File Loading
**Vulnerability:** The `localFileToDataUri` function allowed path traversal (e.g., `garmentImageUrl: "/../../../../etc/passwd"`) due to insecure use of `path.join` with user-controlled input, allowing arbitrary file read.
**Learning:** `path.join` and `path.resolve` automatically normalize `..` segments. If user input contains `../`, it can escape the intended base directory.
**Prevention:** Always use `path.resolve` with the base directory and verify that the resulting absolute path strictly starts with the base directory path (including trailing separator) before performing any file operations.
