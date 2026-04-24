## 2025-04-24 - [Fix Path Traversal in Try-On API]
**Vulnerability:** Path traversal vulnerability in `app/api/try-on/route.ts` where `localFileToDataUri` used `path.join` with user input without validating if the resolved path remained inside the intended `public` directory.
**Learning:** Using `path.join()` or `path.resolve()` with unsanitized user input allows attackers to use `../` sequences to read arbitrary files from the server's filesystem.
**Prevention:** Always use `path.resolve()` with a known base directory and explicitly verify that the resulting absolute path starts with `baseDir + path.sep` before accessing the file system.
