## 2026-10-20 - Secure Path Resolution
**Vulnerability:** Path traversal vulnerability
**Learning:** When resolving relative paths based on user input, `path.join` allows `..` to traverse outside the intended directory.
**Prevention:** Use `path.resolve` with a base directory and check that the resulting absolute path starts with the base directory plus a path separator.
