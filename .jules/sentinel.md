## 2025-02-14 - Fix Path Traversal Vulnerability
**Vulnerability:** Path traversal in `app/api/try-on/route.ts` via `garmentImageUrl` processing.
**Learning:** The app constructs local file paths for public images using `path.join(process.cwd(), 'public', relativePath)` without validating that the resolved absolute path actually resides within the `public` directory. An attacker could provide a `garmentImageUrl` like `/../.env.local` to read arbitrary files from the server, which are then encoded as base64 and sent to an external API (Replicate).
**Prevention:** Always use `path.resolve` and explicitly verify that the resolved absolute path starts with the intended base directory (e.g., `path.join(process.cwd(), 'public')` appended with `path.sep`) before accessing the file system.
