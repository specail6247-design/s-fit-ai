## 2025-03-04 - Safely resolving file paths in Next.js APIs
**Vulnerability:** A Local File Inclusion (LFI) / Path Traversal vulnerability existed in the `/api/try-on` endpoint where user-supplied file paths were concatenated directly with `path.join(process.cwd(), 'public', userPath)`.
**Learning:** `path.join` resolves `../` segments but does not prevent the resulting path from escaping the intended base directory.
**Prevention:** Always use `path.resolve` for both the base directory and the target path, and explicitly verify that the absolute target path `startsWith(baseDir + path.sep)` before attempting file system access.
