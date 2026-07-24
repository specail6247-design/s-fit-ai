## 2025-03-05 - Fix Path Traversal in Local File Read
**Vulnerability:** Path traversal vulnerability in `app/api/try-on/route.ts` via `path.join` with unsanitized user input (`garmentImageUrl`), allowing reading of files outside the `public` directory.
**Learning:** Using `path.join` with user input is unsafe because it resolves `../` segments without bounding them to a base directory. `path.resolve` followed by a prefix check is required.
**Prevention:** Always use `path.resolve` and validate containment by ensuring the resulting absolute path starts with the base directory explicitly followed by `path.sep` to prevent partial directory name matching attacks.
