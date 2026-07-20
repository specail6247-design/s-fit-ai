## 2024-05-24 - Path Traversal in API Route
**Vulnerability:** Path traversal in `localFileToDataUri` allowing arbitrary file reads via `fs.readFileSync` (e.g., using `../` or absolute paths like `//etc/passwd`).
**Learning:** Using `path.join` with user-supplied relative paths without containment checks allows directory escape.
**Prevention:** Always use `path.resolve` with the intended base directory, and explicitly check that the resolved absolute path starts with the base directory followed by `path.sep` (e.g., `absolutePath.startsWith(publicDir + path.sep)`).