## 2024-05-18 - Prevent Path Traversal using strict boundaries
**Vulnerability:** The `localFileToDataUri` API route used `path.join` with untrusted input to map a local file URL to a file in the `public` directory.
**Learning:** Using `absolutePath.startsWith(publicDir)` is insufficient for boundary checks because it allows access to sibling directories (e.g. `public_secrets` matches `public`).
**Prevention:** Always use `path.resolve` for resolving user inputs and append `path.sep` to the `startsWith` string (e.g., `absolutePath.startsWith(publicDir + path.sep) && absolutePath !== publicDir`) to enforce a strict boundary.
