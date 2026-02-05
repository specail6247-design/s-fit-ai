## 2025-05-23 - Path Traversal in File Utility
**Vulnerability:** Path traversal vulnerability in `localFileToDataUri` function within API route.
**Learning:** Inline file handling utilities often miss security checks that shared libraries might have. The function blindly joined user input with a base path.
**Prevention:** Always use `path.resolve` to establish a base directory and check that the resolved target path starts with that base path.
