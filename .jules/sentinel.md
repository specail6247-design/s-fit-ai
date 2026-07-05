## 2024-05-18 - Path Traversal in File Resolution
**Vulnerability:** User-controlled input was concatenated with `path.join` without verifying if the resolved path escaped the intended base directory.
**Learning:** Using `startsWith(baseDir)` is insufficient because it allows partial matches (e.g., `/app/public` matches `/app/public-secrets`).
**Prevention:** Always use `path.resolve` and ensure `absolutePath.startsWith(baseDir + path.sep)` to enforce strict directory boundaries.