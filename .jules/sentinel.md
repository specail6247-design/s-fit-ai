## 2023-10-31 - [Path Traversal in Try-On API]
**Vulnerability:** The Try-On API endpoint in `app/api/try-on/route.ts` used `path.join` with `startsWith('/')` check to resolve local file paths without checking if the resolved absolute path actually resides within the intended directory (e.g. `public`).
**Learning:** This missing check allows attackers to use ".." sequences, either directly or indirectly, to access files outside the `public` directory, posing a severe path traversal vulnerability.
**Prevention:** Always check that the fully resolved path (`path.resolve`) strictly begins with the intended base directory path (including trailing separator) to prevent directory climbing attacks.
