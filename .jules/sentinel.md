
## 2026-02-04 - Path Traversal in Local File Handling
**Vulnerability:** The `localFileToDataUri` helper allowed access to files outside the `public` directory via relative paths (e.g., `../package.json`) because it lacked validation after resolving the absolute path.
**Learning:** `path.join` resolves `..` segments, meaning joining a safe base path with user input does not guarantee safety.
**Prevention:** Always normalize the resolved path and verify it is contained within the expected root directory using `path.relative` checks (ensure it doesn't start with `..` and is not absolute) or strict prefix matching.
