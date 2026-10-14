## 2024-05-14 - Secure File Path Resolution
**Vulnerability:** Unsafe local path resolution in API route.
**Learning:** Using basic path join with user input can resolve outside intended directories.
**Prevention:** Use absolute path resolution for both base and target, and verify the resulting path starts with the base directory plus a path separator.
