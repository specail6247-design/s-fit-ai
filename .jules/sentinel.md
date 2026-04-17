## 2024-04-17 - [CRITICAL] Fix Path Traversal in API Route
**Vulnerability:** Path traversal vulnerability in `app/api/try-on/route.ts` allowed attackers to read arbitrary files outside the `public` directory by passing malicious paths like `../../../etc/passwd` to `localFileToDataUri`.
**Learning:** Using `path.join` with unsanitized user input allows `..` segments to traverse up the directory tree.
**Prevention:** Always use `path.resolve` to determine the absolute target path, and strictly verify it `startsWith(baseDir + path.sep)` to ensure it remains within the intended directory boundary.
