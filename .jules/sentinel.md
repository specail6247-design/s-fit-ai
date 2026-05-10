## 2024-05-10 - Path Traversal Vulnerability in Try-On API
**Vulnerability:** Path traversal vulnerability found in `app/api/try-on/route.ts` where unsanitized user input (`localPath`) was passed to `path.join()`, allowing local file access outside the `public` directory (e.g., `/etc/passwd`).
**Learning:** Using `path.join()` with user input is insufficient to contain access to a specific directory. It resolves relative paths like `../` indiscriminately.
**Prevention:** Always use `path.resolve()` alongside a containment check using `.startsWith(baseDirectory + path.sep)` to ensure the final absolute path safely resides within the intended directory boundaries.
