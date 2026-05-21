## 2025-05-21 - Path Traversal in File to Data URI Helper
**Vulnerability:** The `localFileToDataUri` function in `app/api/try-on/route.ts` used `path.join` with an unsanitized relative path derived from user input (`garmentImageUrl`), allowing path traversal (e.g., `../../etc/passwd`) to read any file on the server.
**Learning:** Using `path.join` on user-controlled input without bounds checking is a common pattern that leads to arbitrary file reads, especially in helper functions converting local files to base64 URIs.
**Prevention:** Always use `path.resolve` to get the absolute path, and verify that the resulting path strictly begins with the intended base directory using `absolutePath.startsWith(baseDir + path.sep)`.
