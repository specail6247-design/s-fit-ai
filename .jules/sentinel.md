## 2024-04-07 - Path Traversal in API Route
**Vulnerability:** A path traversal vulnerability existed in `app/api/try-on/route.ts` where `path.join` was used with unsanitized user input (`garmentImageUrl`), allowing users to read arbitrary files from the server's filesystem by passing paths like `../../../../etc/passwd`.
**Learning:** Using `path.join()` alone does not resolve or sanitize relative path segments like `..`. When resolving paths from user input to an absolute path, we must ensure the resolved path remains within the intended base directory.
**Prevention:** Always use `path.resolve()` with a known base directory, and verify the resulting path starts with `baseDir + path.sep` to prevent directory traversal and name spoofing attacks.
