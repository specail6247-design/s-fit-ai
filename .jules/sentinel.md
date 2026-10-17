## 2024-10-18 - Prevent Path Traversal in API
**Vulnerability:** Path traversal vulnerability in local file reading (`app/api/try-on/route.ts`). User input was concatenated using `path.join`, potentially allowing access outside the `public` directory.
**Learning:** `path.join` does not resolve paths strictly within a base directory, leaving an application vulnerable when handling user input.
**Prevention:** Use `path.resolve` for both the base and target paths, and explicitly verify that the resulting absolute path starts with the base directory plus a path separator (e.g., `absolutePath.startsWith(publicDir + path.sep)`).
