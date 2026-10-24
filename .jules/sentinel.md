## 2024-10-24 - Path Traversal Vulnerability Fix
**Vulnerability:** Path traversal in `app/api/try-on/route.ts` where unvalidated user input was joined with the base path and used to read files.
**Learning:** Using `path.join` with unsanitized user input allows attackers to use `../` to access files outside the intended directory.
**Prevention:** Always use `path.resolve` and verify the resolved path explicitly starts with the intended base directory before accessing the file.
