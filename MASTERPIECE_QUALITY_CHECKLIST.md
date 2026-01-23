# Masterpiece Fit Quality Checklist

Use this checklist to verify the "Hollywood-grade" quality of the virtual try-on experience.

## 1. Visual Fidelity (2.5D Displacement)
- [ ] **Material Recognition**: Verify that the viewer correctly identifies the material (Silk, Denim, Wool, etc.) from the analysis.
- [ ] **Surface Detail**: Zoom in (Macro Mode). Can you see the specific grain?
    - **Silk**: Smooth, high specular highlights, no grain.
    - **Denim**: Diagonal twill pattern visible.
    - **Wool**: Fuzzy, high-frequency noise/grain.
    - **Leather**: Slight cracking/irregularity, sharp specular.
- [ ] **Depth**: Does the clothing look like it has volume, or does it look flat? The normal map generated from the image should create shadows in the folds.

## 2. Lighting & Atmosphere
- [ ] **Studio Preset**: Clean, balanced lighting. Best for general fit check.
- [ ] **Dramatic Preset**: High contrast. Check for a strong "Rim Light" on the edges (Cyan tinted).
- [ ] **Natural Preset**: Warm, sun-like lighting. Soft shadows.
- [ ] **Relighting**: As you change presets, does the clothing surface *react*? Shadows should move. Highlights should shift.

## 3. Motion & Life
- [ ] **Runway Breathing**: Observe the image closely. Is there a subtle "breathing" or swaying motion? It should not look like a static JPEG.
- [ ] **Edge Stability**: The motion should not tear the edges of the image excessively.

## 4. VTON Generation Quality
- [ ] **Resolution**: Is the output sharp?
- [ ] **Description Accuracy**: Does the result match the detailed description passed to the AI?
- [ ] **Artifacts**: Are hands/faces preserved correctly (no distortion)? *Note: This depends on the Replicate model performance.*

## 5. UI/UX
- [ ] **Controls**: Do the Lighting and Macro buttons work instantly?
- [ ] **Loading State**: Is the transition smooth?
- [ ] **Info Overlay**: Does the viewer display the active Material type?
