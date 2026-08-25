## 2024-05-24 - Path Traversal in File Reading Helper
**Vulnerability:** Path traversal vulnerability in `localFileToDataUri` in `app/api/try-on/route.ts` where unvalidated user input was used with `path.join()` allowing access outside the `public` directory.
**Learning:** Using `path.join` with relative paths starting with `../` does not constrain the resulting absolute path. This allowed reading arbitrary files if they existed and were accessible.
**Prevention:** Always use `path.resolve()` with a base directory and verify that the resulting absolute path starts with the base directory using `absolutePath.startsWith(baseDir + path.sep)`.
