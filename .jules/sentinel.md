## 2024-10-24 - [Fix Path Traversal in local file processing]
**Vulnerability:** Path traversal vulnerability in app/api/try-on/route.ts due to insecure concatenation of user-provided file paths with path.join.
**Learning:** Using path.join with unvalidated user input for file paths can allow attackers to access arbitrary files on the server by supplying inputs like ../../../etc/passwd.
**Prevention:** Use path.resolve to get the absolute path and verify that it strictly starts with the intended base directory path appended with path.sep to restrict file access to the intended directory.
