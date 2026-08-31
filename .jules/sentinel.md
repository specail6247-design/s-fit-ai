## 2024-05-18 - Path Traversal Prevention
**Vulnerability:** Path traversal in `localFileToDataUri` within `app/api/try-on/route.ts` due to insecure usage of `path.join` with user input.
**Learning:** `path.join` does not prevent directory climbing (e.g., `../`). User input in paths can lead to arbitrary file reads.
**Prevention:** Always use `path.resolve` with a fixed base directory and explicitly verify that the resolved path begins with the target base directory string plus a separator (`absolutePath.startsWith(baseDir + path.sep)`).
