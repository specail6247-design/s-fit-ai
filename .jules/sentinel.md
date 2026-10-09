## 2024-05-24 - Fix Path Traversal in localFileToDataUri
**Vulnerability:** The localFileToDataUri function was vulnerable to path traversal (Local File Inclusion), allowing arbitrary files on the server to be read by supplying paths like `../../../etc/passwd`.
**Learning:** Path parameters were not strictly validated against a base directory, and `path.join` was used without checking if the resolved path escaped the intended directory.
**Prevention:** Always use `path.resolve` for both the base and target directories, and strictly assert that the resolved target path starts with the base directory plus a path separator.
