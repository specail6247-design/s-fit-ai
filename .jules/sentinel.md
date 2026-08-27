## 2024-05-18 - Path Traversal in local file reader
**Vulnerability:** The try-on API allowed reading arbitrary files via `path.join` when processing local file URLs.
**Learning:** Node's `path.join` does not prevent path traversal (e.g. `../../`), allowing access outside the intended directory.
**Prevention:** Use `path.resolve` and explicitly validate that the resulting absolute path starts with the base directory string `baseDir + path.sep`.
