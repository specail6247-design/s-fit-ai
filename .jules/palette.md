## 2023-10-08 - Accessible Ligature Icons in Next.js
**Learning:** When using Material Symbols ligature icons (e.g., `<span className="material-symbols-outlined">zoom_in</span>`) inside interactive elements like buttons, screen readers will read the literal text ("zoom in" or "arrow back"). While sometimes this happens to make sense, it often reads weirdly or redundantly. If wrapped in a button that needs a specific action name, the span itself should be hidden.
**Action:** Always add `aria-hidden="true"` to the `span` containing the ligature text, and add a descriptive `aria-label` to the parent `<button>` or `<Link>` to ensure screen readers announce the intended action, not the icon name.

## 2023-10-08 - Google Fonts in Next.js Layouts
**Learning:** Adding custom Google Fonts via `<link>` tags in Next.js layout files outside of `_document.js` will cause `no-page-custom-font` and `google-font-display` lint warnings, failing CI.
**Action:** Always add `&display=optional` to the end of the Google Font API URL (e.g., `...&display=optional`) and suppress the Next.js font warning with `/* eslint-disable-next-line @next/next/no-page-custom-font */`.

## 2023-10-08 - Vitest Coverage V8 Dependency Error
**Learning:** If `vitest run --coverage` fails on GitHub Actions complaining about a missing `@vitest/coverage-v8` dependency, it means the repo's dev dependencies are out of sync with the CI requirements.
**Action:** Restore `package.json` and `package-lock.json`, and explicitly install the correct version of `@vitest/coverage-v8` with `--legacy-peer-deps` using `npm`.
