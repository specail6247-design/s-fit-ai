## 2025-05-21 - Path Traversal in File Upload Utility
**Vulnerability:** The `localFileToDataUri` function in `app/api/try-on/route.ts` allowed reading arbitrary files on the server (LFI) by providing paths with `..` segments (e.g., `/../package.json`), as `path.join` resolved these against the current working directory.
**Learning:** `path.join` and `path.resolve` automatically handle `..` segments, which can allow breaking out of intended directories. Simply checking file existence is insufficient for security.
**Prevention:** Always resolve the final absolute path and explicitly verify it starts with the intended "jail" directory (e.g., `public/`) before accessing the file system.
