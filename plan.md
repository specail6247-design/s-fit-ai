1. **Add `isPrivacyOpen`, `isSupportOpen`, and `privacyActiveTab` to global state (`store/useStore.ts`)**.
2. **Create `PrivacyModal.tsx` in `components/modals/`**:
   - Clean, readable modal with tabs for Privacy Policy and Terms of Service.
   - Triggers based on `useStore().isPrivacyOpen`.
3. **Create `SupportHub.tsx` in `components/modals/`**:
   - Slide-out drawer design ('Hidden until needed' philosophy).
   - "How to Fit" carousel.
   - FAQ accordion.
   - "Report Issue" form for bug reporting (Feedback Loop).
   - "Data Safety Badge" indicating "Photos are processed securely and not shared."
   - Triggers based on `useStore().isSupportOpen`.
4. **Update `components/RealLifeFitting.tsx` (and potentially other main layouts)**:
   - Add a footer or menu buttons to open Privacy and Support modals.
   - Mount `PrivacyModal` and `SupportHub`.
5. **Add "Share to Story" feature (Social Viral Loop)**:
   - Create a function to generate a branded, vertical image specifically for Instagram Stories.
   - Add a "Share to IG Story" button in the result overlay of `RealLifeFitting.tsx`.
   - The button should create a canvas, draw the result image, add branding/logo, and trigger a download or native share (if supported).
6. **Pre-commit checks**:
   - Run `pre_commit_instructions` and ensure all tests, linters, and checks pass.
