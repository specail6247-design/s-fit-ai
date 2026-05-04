## 2025-05-04 - [Fix Path Traversal in File Reader]
**Vulnerability:** The try-on API allowed arbitrary file reads via user input due to insecure path joining.
**Learning:** Using `path.join` with user-supplied input allows `../` sequences to traverse directories.
**Prevention:** Always use `path.resolve` to get the absolute path and verify it strictly using `absolutePath.startsWith(baseDir + path.sep)` to prevent partial directory name matches.
