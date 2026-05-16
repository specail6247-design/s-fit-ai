## 2025-05-16 - Path Traversal Vulnerability
**Vulnerability:** Path Traversal (CWE-22) in local file to data URI conversion due to insecure use of path.join.
**Learning:** Relying on path.join with user-provided relative paths can allow accessing unintended files outside the intended directory.
**Prevention:** Always use path.resolve to get the absolute path and explicitly validate containment with !absolutePath.startsWith(baseDir + path.sep).
