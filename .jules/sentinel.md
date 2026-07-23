## 2024-07-23 - Path Traversal in Try-On API
**Vulnerability:** A path traversal vulnerability existed in the `/api/try-on` route when converting local files to base64. The application used `path.join` with unsanitized user input (`garmentImageUrl`), allowing an attacker to escape the `public` directory and read arbitrary files (like `.env.local` or `/etc/passwd`).
**Learning:** Using `path.join` with user input is unsafe because it evaluates `../` sequences without enforcing a boundary.
**Prevention:** Always use `path.resolve` combined with a boundary containment check (e.g., `absolutePath.startsWith(publicDir + path.sep)`) when dealing with user-provided paths.
