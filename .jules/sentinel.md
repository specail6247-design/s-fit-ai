## 2024-05-18 - Avoid deleting package-lock.json

**Learning:** When cleaning up untracked files after running `pnpm install`, do not delete `package-lock.json` as it is a tracked file and doing so can cause massive side effects.
**Action:** Use `git restore package-lock.json` to revert tracked changes, and `rm -f pnpm-lock.yaml` to remove untracked files instead of `rm -f package-lock.json`.
