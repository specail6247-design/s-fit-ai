# S_FIT AI - Fitting Algorithm & Rendering Engine

## 1. AI Size Recommendation Engine

The size recommendation system uses a hybrid approach combining MediaPipe pose landmarks and standard anthropometric heuristics.

### Workflow

1.  **Input Data**:
    *   **User Height**: Explicitly provided by the user.
    *   **Pose Landmarks**: 33 3D landmarks from MediaPipe Pose.
    *   **Clothing Data**: Category, Brand, Size Chart, Material Analysis.

2.  **Body Measurement Estimation** (`lib/sizeRecommendation.ts`):
    *   **Scale Factor Calculation**:
        *   We extract the normalized `torsoHeight` and `legLength` from MediaPipe landmarks.
        *   We estimate that the "Shoulder to Ankle" path accounts for ~82% of the user's total height.
        *   `cmPerUnit = (UserHeight * 0.82) / (NormalizedTorso + NormalizedLeg)`
    *   **Linear Measurements**:
        *   `Shoulder Width (cm) = NormalizedShoulderWidth * cmPerUnit`
        *   `Hip Width (cm) = NormalizedHipWidth * cmPerUnit`
    *   **Circumference Estimation** (Heuristics):
        *   `Chest Circumference ≈ Shoulder Width * 2.3`
        *   `Waist Circumference ≈ Hip Width * 1.8` (Approximation for rectangle/athletic shape)
        *   `Hip Circumference ≈ Hip Width * 2.4` (Accounting for depth)

3.  **Size Matching Logic**:
    *   We load the brand-specific size chart (`data/sizeCharts.ts`).
    *   We compare estimated body measurements against the size chart dimensions.
    *   **Material Awareness**: If the clothing analysis indicates high `stretchFactor`, we "shrink" the target body measurement by up to 10% to allow for a snug fit (negative ease).
    *   **Weighted Scoring**:
        *   **Tops**: 70% weight on Chest, 30% on Shoulders.
        *   **Bottoms**: 60% weight on Hips, 40% on Waist.
    *   The size with the minimum weighted difference is selected.

4.  **Confidence Score**:
    *   `Score = 100 - (TotalDifferenceInCm * 2)`
    *   Returns a 0-100% confidence level.

## 2. 2.5D Displacement Rendering

The rendering engine simulates 3D clothing using 2D images ("2.5D") to provide realistic mockups without requiring full 3D garment models.

### Technique: Cylindrical Billboard with Displacement

Implemented in `lib/clothingRenderer.tsx` using `React Three Fiber` and custom shaders.

1.  **Geometry**:
    *   High-segment `PlaneGeometry` (64x64) to support vertex displacement.
    *   Aspect ratio matches the source image.

2.  **Fabric Material Shader**:
    *   **Vertex Shader**:
        *   **Curvature**: Wraps the flat plane around a virtual cylinder (the body) using a parabolic function: `z -= x^2 * curvature`.
        *   **Displacement**: Uses the image texture brightness as a height map to push pixels outward (`d * displacementScale`).
        *   **Procedural Folds**: Adds dynamic sine-wave perturbations (`sin(uv.x * 20 + time)`) to simulate fabric draping and micro-movement.
    *   **Fragment Shader**:
        *   Standard PBR-like lighting with Roughness/Metalness control.
        *   Uses calculated normals from the vertex shader (adjusted for curvature).

3.  **Alignment**:
    *   Clothing is positioned relative to the mannequin's `root` but offset in Y based on category (Tops higher, Bottoms lower).
    *   The entire assembly rotates with the mannequin, and the curvature ensures it looks volumetric from side angles (up to ~45-60 degrees).

## 3. Performance Optimization

*   **Shader-based Animation**: Folds are animated on the GPU, avoiding CPU overhead.
*   **Texture Reuse**: Using the same texture for Color and Displacement maps reduces memory usage.
*   **Segmented Loading**: Clothing billboards are lightweight compared to full 3D meshes.
