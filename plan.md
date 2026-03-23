1. **Create `components/masterpiece/LuxuryImageDistortion.tsx`**
   - Use `write_file` tool to create the file.
   - Implement a Framer Motion-based 3D tilt effect on hover using `useMotionValue`, `useTransform`, and `<motion.div>` for wrapping child content. This will serve as the 3D interaction wrapper for product cards.
   - Verify creation with `read_file`.

2. **Copy `components/ARLiveFitting.tsx` to `components/LuxuryLiveFitting.tsx`**
   - Use `run_in_bash_session` to execute `cp components/ARLiveFitting.tsx components/LuxuryLiveFitting.tsx`.
   - Update component name inside the file using `replace_with_git_merge_diff`.
   - Verify creation with `list_files` and `read_file`.

3. **Refine Theme & Typography in `components/LuxuryLiveFitting.tsx`**
   - Use `replace_with_git_merge_diff` to replace `#2b8cee` (blue) with `#ecab13` (gold) across the file.
   - Use `replace_with_git_merge_diff` to change background themes to solid black `#0a0a0a` by replacing `dark:bg-[#101922]` with `dark:bg-[#0a0a0a]`.
   - Use `replace_with_git_merge_diff` to add `Cinzel` font import from `next/font/google` and apply it to the file by adding `const cinzel = Cinzel({ subsets: ["latin"] });` and updating header classes to use `${cinzel.className}`.
   - Verify with `read_file`.

4. **Implement Custom Cursor & Brand Experience in `components/LuxuryLiveFitting.tsx`**
   - Use `replace_with_git_merge_diff` to inject a Framer Motion custom cursor (a fixed `motion.div` gold ring `#ecab13` tracking `clientX/Y` using `useEffect` and `useState` for mouse position).
   - Use `replace_with_git_merge_diff` to inject a mocked "Gucci" parallax banner and description inside the main viewport container just below the Top Navigation Bar (`{/* Top Navigation Bar */}`).
   - Verify with `read_file`.

5. **Reformat Prices, Layout & Loading State in `components/LuxuryLiveFitting.tsx`**
   - Use `replace_with_git_merge_diff` to modify the dummy products mapping (the array with `Silk Gown`, `Moto Jacket`, `Tech Coat`) to format numbers with commas (e.g., `$12,500`) and ensure vertical/masonry-style layout using larger cards and slower transitions (`duration-700`).
   - Use `replace_with_git_merge_diff` to replace the generic `animate-pulse` loaders (the ones around `Live Fit AI` text and the Camera button) with a sophisticated thin gold line tracing animation (e.g., using an SVG path animation or a rotating border).
   - Use `replace_with_git_merge_diff` to wrap the `Aura Blazer` dummy card with the newly created `<LuxuryImageDistortion>` component.
   - Verify with `read_file`.

6. **Update Route in `app/luxury/fitting/page.tsx`**
   - Use `replace_with_git_merge_diff` to import `LuxuryLiveFitting` and replace the `PhotoFitting` component with `LuxuryLiveFitting`.
   - Verify with `read_file`.

7. **Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done**
   - Use `run_in_bash_session` to run `pnpm run lint` and `npx tsc --noEmit` and tests.
