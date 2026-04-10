## 2024-04-10 - Fix Path Traversal in localFileToDataUri
**Vulnerability:** Path traversal vulnerability in `app/api/try-on/route.ts` where unvalidated user input was used in `path.join(process.cwd(), 'public', relativePath)` which could be exploited using `../` to read arbitrary local files outside the `public` directory.
**Learning:** Using `path.join` with unsanitized user input is insecure because it doesn't resolve directory traversals before concatenation.
**Prevention:** Always use `path.resolve` combined with `startsWith(baseDir + path.sep)` to ensure the absolute path points inside the allowed directory.
