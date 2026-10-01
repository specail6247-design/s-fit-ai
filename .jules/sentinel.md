## 2025-03-09 - Path Traversal (LFI) in Try-On API
**Vulnerability:** The try-on API endpoint accepted arbitrary file paths for local images which were resolved using `path.join`, allowing local file inclusion outside the `public` directory.
**Learning:** `path.join` does not prevent directory traversal (e.g., `../../../etc/passwd`). When resolving user-provided paths for local files, they can escape the intended base directory.
**Prevention:** Always use `path.resolve` for both the base and target paths, and enforce that the resulting absolute path strictly starts with `baseDirectory + path.sep`.
