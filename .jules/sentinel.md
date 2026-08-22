## 2024-10-18 - Path Traversal in API Route
**Vulnerability:** Path traversal vulnerability in `app/api/try-on/route.ts` where user input was passed to `path.join()` without validation.
**Learning:** Using `path.join()` without validating if the resolved path escapes the intended base directory can lead to arbitrary file reads (LFI).
**Prevention:** Always use `path.resolve()` and verify that the resulting absolute path strictly starts with the intended base directory appended with `path.sep` before performing file operations.
