## 2024-07-06 - [Path Traversal via path.join]
**Vulnerability:** Path traversal vulnerability in `app/api/try-on/route.ts` where `path.join` was used with unsanitized user input (`garmentImageUrl`), allowing attackers to access arbitrary files on the system by prefixing the path with `../../`.
**Learning:** `path.join` does not resolve paths absolutely or prevent navigating outside a base directory. It merely concatenates path segments and normalizes the result.
**Prevention:** Always use `path.resolve` to get the absolute path, and verify that the resolved absolute path starts with the intended base directory using `.startsWith(baseDirectory + path.sep)`.
