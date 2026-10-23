## 2024-10-23 - Path Traversal Vulnerability in Local File Reader
**Vulnerability:** A Path Traversal / LFI vulnerability was identified in `app/api/try-on/route.ts` where user-controlled paths passed to `localFileToDataUri` were resolved using `path.join`, allowing potential arbitrary file access outside the `public` directory.
**Learning:** `path.join` does not sanitize relative path sequences (`../`), meaning if an attacker provided a path like `../../../etc/passwd`, it would resolve to outside the intended base directory.
**Prevention:** Always use `path.resolve` for both the base and target directories, and strictly enforce bounds checking by verifying the resulting absolute path starts with `baseDir + path.sep`.
