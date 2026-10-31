1. **Fix `vitest` coverage issue in CI**: Install `@vitest/coverage-v8@4.0.18` locally to run coverage. (But this was a CI failure. In CI it says `Cannot find dependency '@vitest/coverage-v8'`. I should add it to package.json and commit it).
2. **Fix `next/next/no-img-element` and `jsx-a11y/alt-text` warnings**:
   - `components/RealLifeFitting.tsx` (lines 109, 127, 212)
   - `components/SimpleTryOn.tsx` (lines 67, 75, 93)
   - Use `/* eslint-disable-next-line @next/next/no-img-element */` and add alt text if missing.
3. **Fix unused variable warnings**:
   - `components/PhotoFitting.tsx` line 3: `'useEffect' is defined but never used`
   - `components/LuxuryGarmentDetail.tsx` line 5: `'motion' is defined but never used`
   - `components/FittingRoom.tsx` line 309: `'opacity' is assigned a value but never used`
   - `components/ErrorBoundary.tsx` line 19: `'_' is defined but never used` -> use `/* eslint-disable-next-line @typescript-eslint/no-unused-vars */`
4. **Fix font issues**:
   - `app/spa/layout.tsx` line 13
   - `app/luxury/layout.tsx` line 17
   - Add `display: 'optional'` and `/* eslint-disable-next-line @next/next/no-page-custom-font, @next/next/google-font-display */`
5. **Run full verification**: `npm run lint` and `npm run test` and `npx vitest run --coverage`.
6. **Submit**: Use `submit` with the same branch `feature/phase6-trust-and-growth-10216058013312883762`.
