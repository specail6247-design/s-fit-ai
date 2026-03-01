## 2024-05-20 - [Path Traversal & SSRF]
**Vulnerability:** Path traversal existed in `app/api/try-on/route.ts` via `garmentImageUrl` due to `path.join` not validating the resolved absolute path. Also SSRF vulnerabilities where `userPhotoUrl` and `imageUrl` across try-on APIs weren't validated for acceptable schemas. `fs.readFileSync` was used leading to blocked I/O.
**Learning:** Never trust user input to be contained within a directory just because it uses `path.join` on a "safe" root path. Also ensure URLs are validated correctly (starting with http/https/data:image). Always use `fs.promises.readFile` for performance.
**Prevention:** Validate absolute paths using `path.resolve` and verify it strictly starts with the target directory (`publicDir + path.sep`).
