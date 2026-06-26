1. **Redesign `components/AuthButton.tsx` (Login System)**
    - Change button text from "LOGIN" to "MEMBER ACCESS".
    - Update modal header to "ENTER VIP CLUB" (when logging in) and "REQUEST ACCESS" (when signing up).
    - Apply distinct luxury typography, dark backgrounds, and gold accents (`#ecab13` or `text-luxury-gold`) per guidelines.
    - Keep fields minimal (Email, Password).

2. **Create `components/SupportHub.tsx` (Support Hub Drawer)**
    - Implement a slide-out drawer (using Framer Motion or simple CSS transitions) that is "Hidden until needed".
    - Include three sections:
        - **User Guide**: A visual, step-by-step carousel ("How to Fit").
        - **Caution**: Clear warnings about lighting and camera distance, using icons (e.g., `material-symbols-outlined` with accessibility labels).
        - **Q&A**: Accordion-style FAQ.
    - Ensure it overlays correctly and can be toggled from the main screen (e.g., in `RealLifeFitting.tsx` or a global layout).

3. **Integrate `SupportHub`**
    - Add a trigger button (e.g., a subtle help icon or "SUPPORT") in `components/RealLifeFitting.tsx` (or another appropriate main component like a top nav if it exists) to toggle the `SupportHub` drawer.

4. **Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.**

5. **Test and verify**
    - Run linting and build commands to ensure no errors.
    - Review the UI in a local server if possible.
