## 2025-02-15 - Path Traversal in Try-On API
**Vulnerability:** The try-on API endpoint accepted local file paths from user input and constructed absolute paths using `path.join(process.cwd(), 'public', relativePath)` without bounds checking. This allowed malicious users to access arbitrary files on the server using `../` sequences in the `garmentImageUrl` parameter.
**Learning:** In Next.js API routes that proxy local assets to external services (like Replicate), standard `path.join` is insufficient to protect against path traversal when the input components are user-controlled.
**Prevention:** Always use `path.resolve()` with a known base directory, and explicitly verify that the resulting absolute path begins with `baseDir + path.sep` before accessing the file system.
