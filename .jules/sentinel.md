## 2024-05-18 - Path Traversal Prevention
**Vulnerability:** Found a vulnerability involving user input in file paths without proper bounds checking.
**Learning:** `path.join` does not enforce boundaries against partial path traversals.
**Prevention:** Always use `path.resolve` combined with bounds checking like `startsWith(publicDir + path.sep)` to secure file reading.
