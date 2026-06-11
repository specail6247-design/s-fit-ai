## 2024-06-11 - File Path Traversal Vulnerability
**Vulnerability:** Found a file path traversal vulnerability in `app/api/try-on/route.ts` through the `garmentImageUrl` body parameter, allowing reading of arbitrary files on the system outside the public directory.
**Learning:** `path.join(process.cwd(), 'public', relativePath)` does not prevent a path containing `../` from escaping the intended public directory.
**Prevention:** Use `path.resolve` combined with a check that `absolutePath.startsWith(publicDir)` to restrict file reads safely to the intended directory.
