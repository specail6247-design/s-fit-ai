
## 2024-05-30 - Fix Path Traversal in API Try-On Endpoint
**Vulnerability:** The `/api/try-on/route.ts` endpoint used `path.join(process.cwd(), 'public', relativePath)` to construct an absolute file path without verifying if the resolved path was still within the `public` directory. A user could supply `../../package.json` to read arbitrary files from the server.
**Learning:** `path.join` resolves `../` tokens correctly but doesn't prevent traversing above the intended root directory if the provided string has enough `../` sequences relative to the current working directory.
**Prevention:** Always use `path.resolve` to find the final absolute path and then explicitly check that the resolved path starts with the base directory plus `path.sep` (e.g. `!absolutePath.startsWith(publicDir + path.sep) && absolutePath !== publicDir`) before attempting to open the file.
