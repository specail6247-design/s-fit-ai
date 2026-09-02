## 2025-03-05 - Fix Path Traversal in Local File Reader
**Vulnerability:** Arbitrary file read via path traversal in `/api/try-on` due to relying solely on `path.join` for `localFileToDataUri`.
**Learning:** Using `path.join` with user input does not resolve `../` safely relative to the base directory.
**Prevention:** Always use `path.resolve` combined with a strict containment check (`absolutePath.startsWith(baseDir + path.sep)`) when handling user-provided file paths.