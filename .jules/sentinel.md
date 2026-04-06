## 2024-04-06 - Path Traversal in File Resolution
**Vulnerability:** The `localFileToDataUri` function allowed users to resolve arbitrary files by providing paths with directory traversal sequences (e.g., `../../etc/passwd`), escaping the intended `public` directory.
**Learning:** Node.js `path.join` automatically normalizes `..` sequences, meaning it can construct paths outside the intended base directory if user input is not validated.
**Prevention:** Always verify that the resolved absolute path starts with the base directory path followed strictly by `path.sep` to prevent both path traversal and directory name spoofing (e.g., matching `/base` with `/base-fake`).
