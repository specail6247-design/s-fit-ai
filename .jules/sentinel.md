## 2026-08-04 - Path Traversal Vulnerability in Local File Reader

**Vulnerability:**
The `localFileToDataUri` function in `app/api/try-on/route.ts` lacked proper path normalization and directory boundary checks. It constructed file paths using `path.join(process.cwd(), 'public', relativePath)` without validating if the resolved path escaped the `public` directory.

**Learning:**
`path.join` does not automatically resolve directory traversal sequences (like `..`) relative to a base directory in a secure way. Using `path.resolve` to obtain absolute paths and strictly verifying that the resolved path starts with the intended base directory (plus a separator) is essential for preventing path traversal attacks.

**Prevention:**
Always resolve both the base directory and the user-provided path to their absolute forms using `path.resolve`. Then, explicitly verify that the absolute target path strictly begins with the absolute base directory string (appending `path.sep` to prevent partial path matching bypasses) or matches it exactly. Include inline code comments (e.g., `// SECURITY: Prevent path traversal`) to clarify the intent.
