## 2023-10-08 - Accessible Ligature Icons in Next.js
**Learning:** When using Material Symbols ligature icons (e.g., `<span className="material-symbols-outlined">zoom_in</span>`) inside interactive elements like buttons, screen readers will read the literal text ("zoom in" or "arrow back"). While sometimes this happens to make sense, it often reads weirdly or redundantly. If wrapped in a button that needs a specific action name, the span itself should be hidden.
**Action:** Always add `aria-hidden="true"` to the `span` containing the ligature text, and add a descriptive `aria-label` to the parent `<button>` or `<Link>` to ensure screen readers announce the intended action, not the icon name.

## 2023-10-08 - npm ci package-lock.json mismatch
**Learning:** If `npm ci` fails in GitHub Actions because `package.json` and `package-lock.json` are out of sync, installing a dependency with a caret (`^`) version (like `^4.0.18`) can unintentionally upgrade transitive dependencies, causing the lockfile to become incompatible with what CI expects.
**Action:** When adding missing dependencies to fix CI (like `@vitest/coverage-v8`), install the strictly pinned exact version (`4.0.18` instead of `^4.0.18`) using `npm install --save-dev package@version --legacy-peer-deps` to ensure the lockfile remains in sync.
