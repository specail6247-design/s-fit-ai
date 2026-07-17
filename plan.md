1. **Redesign `AuthButton.tsx` for VIP Club Feel**:
   - Update `components/AuthButton.tsx` using `replace_with_git_merge_diff`.
   - Change the modal title to "Member Access".
   - Enhance the minimalist styling: use `font-[family-name:var(--font-display)]` for headings, apply dark theme classes (`bg-void-black`, `border-white/10`), and keep form fields minimal (email/password only). Replace standard buttons with sleek ones using `bg-pure-white` and `text-void-black`.
2. **Create `SupportHub.tsx` Drawer**:
   - Create a new component file `components/ui/SupportHub.tsx` using `write_file`.
   - Implement the component using React state (`useState`) for `isOpen` and `openFaqIndex`, and `framer-motion` for a slide-out drawer (`<motion.div>`) originating from the right side.
   - Include a floating help button (a question mark icon using `<span className="material-symbols-outlined" aria-hidden="true">help</span>`) fixed to the bottom right of the screen.
   - Drawer Content:
     - "User Guide": An ordered list `<ol>` mapped over steps indicating "How to Fit".
     - "Caution": Warnings about lighting and camera distance, using a flex container with `<span className="material-symbols-outlined" aria-hidden="true">warning</span>`.
     - "Q&A": A state-driven accordion using mapped `<div>`s where clicking a question toggles `openFaqIndex`.
3. **Verify Creation of `SupportHub.tsx`**:
   - Run `cat components/ui/SupportHub.tsx` to verify the file was created successfully.
4. **Integrate into `RealLifeFitting.tsx`**:
   - Use `replace_with_git_merge_diff` on `components/RealLifeFitting.tsx`.
   - Add import statements for `SupportHub` from `@/components/ui/SupportHub` and `AuthButton` from `@/components/AuthButton` at the top of the file.
   - Inject `<AuthButton />` into the existing `<header className="mb-10 relative z-10">` area (specifically within a new flex container inside the header to align it).
   - Inject `<SupportHub />` right before the closing `</div>` of the main component return (verified at line 212 of `components/RealLifeFitting.tsx`).
5. **Fix Test Compilation Errors**:
   - Use `replace_with_git_merge_diff` on `__tests__/unit/lib/visionService.test.ts`.
   - In `mockProportions`, add `waistWidth: 0.3, armLength: 0.4, shoulderSlope: 0.1` after `overallRatio: 0.5`.
   - In `blackItem`, change `category: 'tops'` to `category: 'tops' as const`.
6. **Install Typescript**:
   - Run `pnpm install typescript`
7. **Verify Typescript Installation**:
   - Run `cat package.json`
8. **Revert Temporary Changes**:
   - Run `git restore --staged package.json` and `git restore package.json`.
   - Run `rm -f pnpm-lock.yaml`.
9. **Verify Reverted Changes**:
   - Run `git status`
10. **Verify Tests and Linting (TypeScript)**:
   - Run `npx tsc --noEmit`.
11. **Verify Tests and Linting (ESLint)**:
    - Run `pnpm run lint`.
12. **Verify Tests and Linting (Vitest)**:
    - Run `pnpm test`.
13. **Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.**
14. **Submit changes.**
