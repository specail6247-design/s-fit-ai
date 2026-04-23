## 2025-01-24 - Path Traversal in Next.js API Routes Proxying Local Assets
**Vulnerability:** Arbitrary file read in `app/api/try-on/route.ts` via `path.join(process.cwd(), 'public', relativePath)` which allows directory traversal payloads (e.g., `../../etc/passwd`).
**Learning:** Using `path.join` with user input for file paths is insecure, as Next.js API routes run in a Node.js context and can access the filesystem outside of intended directories.
**Prevention:** Always use `path.resolve()` with a known base directory, and explicitly verify that the resulting absolute path begins with `baseDir + path.sep`.
