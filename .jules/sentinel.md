## 2024-05-18 - Path Traversal in API Route
**Vulnerability:** A path traversal vulnerability was found in `app/api/try-on/route.ts` where user-controlled paths (like `garmentImageUrl`) were resolved using `path.join` without verification, allowing an attacker to read any arbitrary local file like `/etc/passwd`.
**Learning:** `path.join` does not resolve absolute paths and doesn't verify if the target stays within the expected base directory. Relying purely on string trimming `relativePath.startsWith('/')` does not prevent directory traversal `../`.
**Prevention:** Always use `path.resolve` to get the absolute path and ensure the resolved path explicitly starts with the target base directory (using `absolutePath.startsWith(baseDir + path.sep)`).
