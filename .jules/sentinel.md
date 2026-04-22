## 2024-05-24 - Path Traversal in Local Asset Proxy
**Vulnerability:** Path traversal allowing arbitrary file read via user-supplied image URL in `localFileToDataUri`.
**Learning:** `path.join` with user-supplied relative paths doesn't inherently block traversal (`../`).
**Prevention:** Always construct the absolute path using `path.resolve()` with a known base directory, and explicitly verify that the result begins with `baseDir + path.sep`.
