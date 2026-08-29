1. **Add Share Button to `CinematicViewer.tsx`:**
   - I need to add a "Cinematic Share" button to the controls overlay.
   - When clicked, it should use the `navigator.share` API (if available) to share the `videoUrl`.
   - Alternatively, it could trigger a download of the 4K video using a `<a download>` tag or similar.
2. **Pre-commit step**:
   - Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
3. **Run local verification**:
   - Build and start the app to check for errors.
