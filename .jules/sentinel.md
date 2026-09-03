## 2024-05-24 - Path Traversal Vulnerability in local file loading
**Vulnerability:** Path traversal in `localFileToDataUri` using `path.join`. User-provided file paths could contain directory traversal sequences (e.g., `../../etc/passwd`).
**Learning:** `path.join` does not prevent path traversal. It simply concatenates strings, allowing a path to traverse out of the base directory.
**Prevention:** Strictly use `path.resolve(baseDir, userInput)` and explicitly validate that the resolved path begins with the target directory string (`absolutePath.startsWith(baseDir + path.sep)`).