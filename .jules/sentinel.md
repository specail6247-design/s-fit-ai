## 2025-03-04 - Path Traversal in Try-On API
**Vulnerability:** A critical Path Traversal vulnerability was found in `app/api/try-on/route.ts`. The `localFileToDataUri` function naively joined user input with `process.cwd()` using `path.join`, allowing attackers to access arbitrary files on the server using `../` sequences or absolute paths (e.g., `/etc/passwd`).
**Learning:** `path.join` does not prevent directory traversal. When handling user-supplied file paths, one must always resolve the absolute path and verify it remains within the intended directory. Additionally, blindly trusting that `path.join` handles "security" is a common misconception.
**Prevention:**
1. Always strip leading slashes from user input to force relative path resolution.
2. Use `path.resolve` to get the canonical absolute path.
3. Explicitly check if the resolved path starts with the intended safe directory path.
