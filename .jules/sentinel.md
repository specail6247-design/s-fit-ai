## 2024-05-24 - Path Traversal in API Route
**Vulnerability:** A critical path traversal vulnerability was found in `app/api/try-on/route.ts` where unsanitized user input was used with `path.join` and passed directly to `fs.readFileSync`.
**Learning:** Using `path.join` on user-supplied paths without additional checks allows attackers to traverse directories using `../` and read sensitive files outside the intended directory.
**Prevention:** Always use `path.resolve` and verify that the resulting absolute path strictly starts with the intended base directory (plus a path separator) before accessing the file system.
