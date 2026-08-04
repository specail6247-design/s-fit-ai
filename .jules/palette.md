## 2024-08-04 - Immersive WebGL Interactions & Advanced Typography

**Learning:** When layering WebGL canvases (via `@react-three/fiber`) underneath interactive DOM overlays, using a `pointer-events-none` container for overlay elements ensures that hover events and pointer tracking successfully reach the 3D meshes beneath.
**Action:** Applied a 3D WebGL simplex noise distortion effect mapped to hover events on the product image while keeping UI overlays accessible but non-blocking to pointer interactions, enhancing the tactile "feel" of digital luxury without breaking standard DOM interactions.

**Learning:** Global smooth scrolling integrations (like Lenis) can disrupt Next.js routing if not initialized properly within a `useEffect` on a client component that wraps the layout children.
**Action:** Encapsulated Lenis initialization inside a dedicated `<SmoothScroll>` client component, avoiding hydration mismatches while ensuring consistent smooth scroll behaviour across dynamic routing boundaries.
