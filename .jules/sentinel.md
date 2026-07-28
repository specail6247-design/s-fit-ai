## 2026-07-28 - Prevent Path Traversal in Local File Read
**Vulnerability:** Path traversal in `localFileToDataUri` function allowed reading arbitrary files via `path.join(process.cwd(), 'public', relativePath)` without checking if the resulting path escaped the intended directory.
**Learning:** `path.join` and `path.resolve` automatically normalize `..` segments, which can escape the intended base directory if not explicitly validated.
**Prevention:** Always use `path.resolve` and validate containment by ensuring the resulting absolute path starts with the base directory explicitly followed by a path separator (e.g., `absolutePath.startsWith(publicDir + path.sep)`).
