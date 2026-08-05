## 2026-08-05 - Path Traversal in Local File Conversion
**Vulnerability:** Path traversal in `localFileToDataUri` function allowed reading arbitrary system files via `fs.readFileSync` by passing malicious paths like `/../../etc/passwd` disguised as local images.
**Learning:** Checking for leading slashes is insufficient. `path.join` resolves `../` sequences, so the final absolute path must be validated against the base directory.
**Prevention:** Always verify that the resolved absolute path starts with the intended base directory plus a path separator (`publicDir + path.sep`) or exactly matches the root directory.
