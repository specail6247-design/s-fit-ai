## 2025-02-28 - Secure Path Resolution in API Routes
**Vulnerability:** Path Traversal
**Learning:** Using `path.join` to append user-controlled input (`garmentImageUrl` starting with `/`) to a base directory is insecure, as `path.join('/base', '../../etc/passwd')` resolves to `/etc/passwd`, allowing local file inclusion.
**Prevention:** Securely resolve paths by using `path.resolve` for both the base and target paths, and explicitly verify that the resulting absolute path starts with the base directory plus a path separator (e.g., `absolutePath.startsWith(baseDir + path.sep)`).
