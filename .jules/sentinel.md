# Security & Code Quality Journal

## Phase 7 Learnings

### Type Safety & Linting
- **Web Audio API:** TypeScript environments often lack `webkitAudioContext` in the standard `Window` interface. Extending the interface locally (`interface CustomWindow extends Window`) ensures type safety without `any` casts.
- **JSX Escaping:** Strict linters (ESLint in Next.js) enforce escaping of quotes (`&quot;`, `&apos;`) in text content. Failure to do so breaks the build.
- **React Hooks:** `setState` calls inside `useEffect` must be guarded by conditions or dependency checks to prevent infinite render loops.

### Testing
- **Mock Integrity:** Unit tests using mocks (`visionService.test.ts`) must strictly align with updated TypeScript interfaces (`PoseProportions`). Adding new properties to the interface requires immediate updates to all test mocks.
