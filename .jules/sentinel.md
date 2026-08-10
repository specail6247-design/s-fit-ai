## 2026-08-10 - Path Traversal Vulnerability in Local File Reader
**Vulnerability:** The `localFileToDataUri` function allowed path traversal (e.g., `../../etc/passwd`) because it used `path.join` without validating if the resulting absolute path stayed within the intended base directory.
**Learning:** Node.js `path.join` does not restrict paths to the base directory. Simply joining a user-provided relative path to a base directory can result in an absolute path anywhere on the file system.
**Prevention:** Always use `path.resolve` and verify the resulting path starts with the intended base directory plus a path separator (`absolutePath.startsWith(publicDir + path.sep)`).
