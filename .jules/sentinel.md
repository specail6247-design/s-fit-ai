
## 2026-08-08 - Path Traversal Vulnerability in Local File Reader
**Vulnerability:** The `localFileToDataUri` function in `app/api/try-on/route.ts` was vulnerable to path traversal. User input `localPath` was joined directly with the `public` directory, allowing attackers to use `../` to access files outside the intended directory.
**Learning:** Using `path.join` with user-supplied paths without checking if the result escapes the base directory is dangerous.
**Prevention:** Always resolve the absolute path and verify it strictly starts with the intended base directory (using `baseDir + path.sep`) before accessing the file system.
