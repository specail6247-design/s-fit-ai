## 2025-02-07 - LFI/Path Traversal in API file reading
**Vulnerability:** Local File Inclusion (LFI) via path traversal using `localPath` parameter starting with `/` like `/../.env`.
**Learning:** `path.join(process.cwd(), 'public', relativePath)` does not prevent directory traversal if `relativePath` contains `../`. We must enforce that the resolved absolute path starts strictly with the base directory.
**Prevention:** Always use `path.resolve()` on both base and target, and strictly assert `resolvedTarget.startsWith(resolvedBase + path.sep)`.
