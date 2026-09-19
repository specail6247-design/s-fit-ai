## 2024-05-24 - Prevent Path Traversal in Local File Reads
**Vulnerability:** The `localFileToDataUri` function in `app/api/try-on/route.ts` used `path.join` with user-supplied paths and lacked boundary checks, enabling path traversal attacks (e.g., reading `../public_secrets/secret.txt` or `/etc/passwd`).
**Learning:** `path.join` does not prevent resolving paths outside the intended base directory. Even `absolutePath.startsWith(baseDir)` is insufficient as it allows accessing sibling directories that share a prefix (e.g., `/app/public` matching `/app/public_secrets`).
**Prevention:** Use `path.resolve(baseDir, userInput)` to get the absolute path, and validate it using strict boundary enforcement: `absolutePath.startsWith(baseDir + path.sep) && absolutePath !== baseDir`.
