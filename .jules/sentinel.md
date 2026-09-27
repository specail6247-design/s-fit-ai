## 2025-03-05 - Fixed Path Traversal in Virtual Try-On API
**Vulnerability:** Path traversal vulnerability in `localFileToDataUri` in `app/api/try-on/route.ts` via unsanitized `path.join()`.
**Learning:** `path.join(base, user_input)` is insecure because `user_input` like `../../etc/passwd` allows escaping the base directory. It was exacerbated by `app/api/try-on/route.ts` converting files to base64.
**Prevention:** Always use `path.resolve(baseDir, userPath)` and strictly verify that the resolved absolute path starts with `baseDir + path.sep` (to avoid prefix matching sibling directories) before accessing the file system.
