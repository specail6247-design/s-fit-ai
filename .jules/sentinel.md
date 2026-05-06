## 2025-05-06 - [Path Traversal in API]
**Vulnerability:** Path traversal via arbitrary `localPath` access bypassing directory checks.
**Learning:** `path.join` with relative input paths enables directory climbing.
**Prevention:** Use `path.resolve` and ensure the final absolute path strictly starts with the base directory plus `path.sep` to avoid partial-path match bypasses.
