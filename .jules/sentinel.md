## 2024-08-24 - API Route Path Traversal
**Vulnerability:** The try-on API allowed arbitrary file reading via a path traversal vulnerability in `localFileToDataUri` using relative paths like `../../`.
**Learning:** `path.join` does not prevent path traversal natively if user input contains `../`. We must enforce containment.
**Prevention:** Always use `path.resolve` for both the base directory and the target path, and explicitly verify that the absolute target path `startsWith(baseDir + path.sep)`.
