## 2026-01-23 - Path Traversal in File Processing
**Vulnerability:** Found `localFileToDataUri` helper blindly concatenating user input with `process.cwd()` to read files. This allowed reading arbitrary files from the server via path traversal (e.g., `../package.json`).
**Learning:** Even internal helper functions that process paths must strictly validate input, especially when dealing with filesystem access. `path.join` is insufficient for security; explicit boundary checks with `path.resolve` are necessary.
**Prevention:** Always resolve the target path and check if it starts with the intended root directory before reading.
