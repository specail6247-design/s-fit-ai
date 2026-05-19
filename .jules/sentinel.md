## 2025-03-05 - Path Traversal Vulnerability in Local File Access
**Vulnerability:** A Path Traversal vulnerability (CWE-22) was found in `app/api/try-on/route.ts` where user-provided input was directly appended to paths using `path.join()`, allowing access outside the intended `public` directory by using `../../`.
**Learning:** `path.join()` merely concatenates string components. When untrusted input is joined, it does not constrain the resulting path.
**Prevention:** To prevent Path Traversal when accessing local files based on user input in Node.js, always use `path.resolve(baseDir, userInput)` and explicitly validate containment with `!absolutePath.startsWith(baseDir + path.sep)`.
