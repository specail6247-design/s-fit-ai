## 2026-08-02 - Path Traversal in API Route
**Vulnerability:** Found a Path Traversal vulnerability in `app/api/try-on/route.ts` where `path.join(process.cwd(), 'public', relativePath)` didn't validate if the resulting absolute path stays within the `public` directory, allowing malicious input like `../../etc/passwd` to be read.
**Learning:** Using `path.join` with user-provided paths is inherently unsafe if not strictly validated against a base directory.
**Prevention:** Always validate that the resolved absolute path starts with the intended base directory using `absolutePath.startsWith(baseDir + path.sep)` to prevent partial matches like `/public_secrets`.
