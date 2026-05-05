## 2024-05-05 - [Path Traversal in API Route]
**Vulnerability:** Path traversal vulnerability in `app/api/try-on/route.ts` through `localPath` parameter because it didn't strictly validate that the resolved path is within the target directory.
**Learning:** `path.resolve`/`path.join` alone does not prevent directory traversal if the user input contains `../`. We must ensure the resolved path still starts with the intended base directory.
**Prevention:** Always validate path boundaries explicitly after joining user input (e.g., `if (!absolutePath.startsWith(baseDir + path.sep)) throw Error`).
