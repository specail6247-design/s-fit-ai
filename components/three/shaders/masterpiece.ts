
export const masterpieceVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vWorldPosition;

  uniform float uTime;
  uniform float uMotionIntensity;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);

    // Base position
    vec3 pos = position;

    // Runway Motion: Subtle breathing/sway
    // Only apply to the "body" area (approximate by UV center)
    // We dampen the edges (uv 0 and 1) to avoid tearing at the borders of the plane
    float edgeDamp = smoothstep(0.0, 0.2, vUv.x) * (1.0 - smoothstep(0.8, 1.0, vUv.x));

    float breathing = sin(uTime * 1.5) * 0.005 * uMotionIntensity * edgeDamp;
    float sway = sin(uTime * 0.8 + pos.y * 2.0) * 0.003 * uMotionIntensity * edgeDamp;

    pos.z += breathing;
    pos.x += sway;

    vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
    vWorldPosition = worldPosition.xyz;

    vec4 viewPos = viewMatrix * worldPosition;
    vViewPosition = -viewPos.xyz;

    gl_Position = projectionMatrix * viewPos;
  }
`;

export const masterpieceFragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  uniform sampler2D uTexture;
  uniform float uFabricType; // 0: Cotton, 1: Silk, 2: Denim, 3: Wool, 4: Leather
  uniform float uTime;
  uniform float uZoom;

  // Lighting Uniforms
  uniform vec3 uLightPos;
  uniform vec3 uLightColor;
  uniform vec3 uAmbientColor;
  uniform vec3 uRimColor;
  uniform float uRimIntensity;
  uniform float uSpecularStrength;

  // Utils
  float luminance(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
  }

  // Pseudo-random function
  float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }

  // Noise for fabric grain
  float noise(vec2 uv) {
    return rand(uv); // Simple white noise
  }

  void main() {
    vec4 texColor = texture2D(uTexture, vUv);

    // Skip lighting for transparent pixels
    if (texColor.a < 0.1) discard;

    // 1. Generate Normal from Image (Sobel-like)
    float delta = 0.002 / max(1.0, uZoom); // Adjust delta based on zoom for sharpness
    float luma = luminance(texColor.rgb);
    float lumaU = luminance(texture2D(uTexture, vUv + vec2(0.0, delta)).rgb);
    float lumaD = luminance(texture2D(uTexture, vUv - vec2(0.0, delta)).rgb);
    float lumaR = luminance(texture2D(uTexture, vUv + vec2(delta, 0.0)).rgb);
    float lumaL = luminance(texture2D(uTexture, vUv - vec2(delta, 0.0)).rgb);

    float dx = (lumaR - lumaL) * 3.0; // Strength of normal map
    float dy = (lumaU - lumaD) * 3.0;

    vec3 normal = normalize(vec3(-dx, -dy, 1.0));

    // 2. Add Detail Map based on Fabric Type
    float grain = 0.0;
    float roughness = 0.8;
    float specularPower = 10.0;
    float fabricSpecular = uSpecularStrength;

    // Macro view scaling
    vec2 detailUV = vUv * (50.0 + uZoom * 50.0);

    if (uFabricType < 0.5) {
      // Cotton: standard noise
      grain = noise(detailUV) * 0.05;
      roughness = 0.8;
    } else if (uFabricType < 1.5) {
      // Silk: very smooth, tiny noise, high specular
      grain = noise(detailUV) * 0.01;
      roughness = 0.3;
      fabricSpecular *= 3.0;
      specularPower = 64.0;
    } else if (uFabricType < 2.5) {
      // Denim: diagonal grain
      float diagonal = sin((detailUV.x + detailUV.y) * 20.0);
      grain = (noise(detailUV) * 0.5 + diagonal * 0.5) * 0.08;
      roughness = 0.9;
    } else if (uFabricType < 3.5) {
      // Wool: fuzzy noise
      grain = noise(detailUV) * 0.15;
      roughness = 1.0;
      fabricSpecular *= 0.2;
    } else {
      // Leather/Polyester/Other
      float n = noise(detailUV * 0.5);
      grain = smoothstep(0.4, 0.6, n) * 0.05;
      roughness = 0.4;
      fabricSpecular *= 1.5;
      specularPower = 32.0;
    }

    // Apply grain to normal
    normal = normalize(normal + vec3(grain * 0.5, grain * 0.5, 0.0));

    // 3. Lighting Calculation (Phong)
    vec3 lightDir = normalize(uLightPos - vec3(0.0, 0.0, -1.0)); // Approximate light dir relative to surface

    vec3 viewDir = normalize(vViewPosition);
    vec3 halfDir = normalize(lightDir + viewDir);

    // Ambient
    vec3 ambient = uAmbientColor * texColor.rgb;

    // Diffuse
    float diff = max(dot(normal, lightDir), 0.0);
    vec3 diffuse = diff * uLightColor * texColor.rgb;

    // Specular
    float spec = pow(max(dot(normal, halfDir), 0.0), specularPower);
    vec3 specular = vec3(spec) * uLightColor * fabricSpecular;

    // Rim Light (Fresnel)
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
    vec3 rim = fresnel * uRimColor * uRimIntensity;

    // Combine
    vec3 finalColor = ambient + diffuse + specular + rim;

    // Tone Mapping / Saturation boost for "Ad Quality"
    // Slight S-curve for contrast
    finalColor = pow(finalColor, vec3(0.9)); // Gamma correctionish
    finalColor = mix(finalColor, finalColor * 1.1, 0.2); // Contrast boost

    gl_FragColor = vec4(finalColor, texColor.a);
  }
`;
