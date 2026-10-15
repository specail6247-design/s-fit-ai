## 2025-03-05 - Path Traversal Vulnerability in API Route
**Vulnerability:** The Try-On API route used `path.join` with unsanitized user input (`garmentImageUrl`) to read local files, allowing path traversal attacks (e.g. `../../../etc/passwd`).
**Learning:** `path.join` does not resolve absolute boundaries, leaving relative traversal characters intact, which can lead to Local File Inclusion (LFI) if used to read files.
**Prevention:** Always use `path.resolve` for both the base and target paths, and enforce a strict boundary check by verifying that the resulting absolute path begins with the intended base directory (e.g. `absolutePath.startsWith(baseDir + path.sep)`).
