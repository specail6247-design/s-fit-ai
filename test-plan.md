Phase 5: Service Essentials (Release Ready):
1. **Login System (AuthButton.tsx)**
   - Redesign `AuthButton.tsx` to match a VIP club entry aesthetic ("Member Access").
   - Update typography to be clean and distinctive ("Sign In" focus).
   - Minimize fields and visual clutter in the modal.
   - Use Framer Motion for smooth open/close animations.
2. **Support Hub (Slide-out Drawer)**
   - Create a new component `SupportHub.tsx` in `components/`.
   - Mount it globally in `app/layout.tsx` (as a slide-out drawer, hidden until needed).
   - Contents:
     - User Guide: Step-by-step carousel ("How to Fit").
     - Caution: Clear warnings about lighting and camera distance with icons.
     - Q&A: Accordion-style FAQ.
     - "Hidden until needed" toggle button (e.g., a discrete "?" or "Support" icon fixed on the screen).
