## Sentinel's Journal

## 2024-03-01 - [Path Traversal in API Route]
**Vulnerability:** Found a CRITICAL Path Traversal vulnerability in `app/api/try-on/route.ts` within the `localFileToDataUri` function. User-supplied input for `garmentImageUrl` was being used directly in `path.join(process.cwd(), 'public', relativePath)` without proper validation, allowing access to arbitrary files on the filesystem (e.g., `/../../../../etc/passwd`).
**Learning:** Even when stripping the leading slash, `path.join` resolves `..` segments, which allows escaping the intended `public` directory.
**Prevention:** Use `path.resolve` or `path.normalize` and verify that the resulting absolute path strictly starts with the intended base directory (e.g., `absolutePath.startsWith(path.join(process.cwd(), 'public') + path.sep)`).
