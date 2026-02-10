export const microFiberParsFragment = `
  uniform float uMicroMix;
  uniform int uFabricType; // 0: Cotton, 1: Silk, 2: Denim, 3: Wool, 4: Leather
  uniform float uTime;

  // Simplex Noise (Ashima Arts)
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // Fabric specific noise generators
  float denimWeave(vec2 uv) {
    float x = sin(uv.x * 200.0) * 0.5 + 0.5;
    float y = sin(uv.y * 200.0) * 0.5 + 0.5;
    return (x + y) * 0.5;
  }

  float silkSheen(vec2 uv) {
    return snoise(uv * 50.0) * 0.3 + 0.7; // Subtle smooth variation
  }

  float woolFuzz(vec2 uv) {
    return snoise(uv * 150.0) * 0.8 + 0.2; // High frequency fuzz
  }

  float leatherGrain(vec2 uv) {
    return snoise(uv * 30.0) * 0.6 + snoise(uv * 100.0) * 0.2; // Cellular-ish look
  }
`;

export const microFiberFragment = `
  // Hyper-Zoom Logic
  float microDetail = 0.0;

  if (uFabricType == 2) { // Denim
    microDetail = denimWeave(vMapUv); // Use vMapUv from standard material
    diffuseColor.rgb *= mix(1.0, microDetail, uMicroMix * 0.3);
  }
  else if (uFabricType == 1) { // Silk
    microDetail = silkSheen(vMapUv);
    float sheen = pow(microDetail, 3.0);
    diffuseColor.rgb += vec3(sheen * 0.2) * uMicroMix;
    roughnessFactor = mix(roughnessFactor, roughnessFactor * 0.5 * microDetail, uMicroMix); // Smoother
  }
  else if (uFabricType == 3) { // Wool
    microDetail = woolFuzz(vMapUv);
    diffuseColor.rgb *= mix(1.0, microDetail, uMicroMix * 0.4);
    roughnessFactor = mix(roughnessFactor, 1.0, uMicroMix * 0.5); // Fuzzier
  }
  else if (uFabricType == 4) { // Leather
    microDetail = leatherGrain(vMapUv);
    diffuseColor.rgb *= mix(1.0, microDetail, uMicroMix * 0.2);
    roughnessFactor = mix(roughnessFactor, roughnessFactor * (1.0 + microDetail), uMicroMix);
  }
  else { // Cotton / Default
    microDetail = snoise(vMapUv * 80.0);
    diffuseColor.rgb *= mix(1.0, 0.9 + microDetail * 0.2, uMicroMix * 0.2);
  }
`;
