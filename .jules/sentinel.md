## 2025-03-05 - Path Traversal in File Operations
**Vulnerability:** `app/api/try-on/route.ts` used `path.join` with unsanitized user input (`garmentImageUrl`), allowing attackers to read any file on the filesystem via directory traversal (e.g., `../../etc/passwd`).
**Learning:** `path.join` does not resolve absolute paths strictly or prevent navigating up directories. Any file reading function taking user paths must verify the final absolute path.
**Prevention:** Always use `path.resolve` with a strict `baseDir`. Then, explicitly verify that the resolved absolute path starts with `baseDir + path.sep` (or matches `baseDir` exactly) before proceeding with file system operations.
