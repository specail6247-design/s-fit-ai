## 2026-08-01 - Path Traversal in Node.js fs operations
**Vulnerability:** The `localFileToDataUri` function allowed users to pass relative paths that could traverse out of the intended directory using `path.join` and relative paths like `../../../etc/passwd`.
**Learning:** When using `path.join` or `path.resolve` with user-supplied input, it's not enough to simply join paths. Node.js resolves `../` segments, which can escape the base directory.
**Prevention:** Always use `path.resolve` to get the absolute path, and then strictly verify that the resulting absolute path starts with the expected base directory path before passing it to any `fs` functions.
