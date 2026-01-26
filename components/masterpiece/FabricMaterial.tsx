import { useTexture } from '@react-three/drei';
import { FabricType, FABRIC_PRESETS } from './types';
import * as THREE from 'three';
import { useMemo, useRef } from 'react';

interface FabricMaterialProps {
  textureUrl: string;
  fabricType: FabricType;
  opacity?: number;
  transparent?: boolean;
}

export function FabricMaterial({
  textureUrl,
  fabricType = 'cotton',
  opacity = 1,
  transparent = true
}: FabricMaterialProps) {
  const baseTexture = useTexture(textureUrl);
  const texture = useMemo(() => {
    const cloned = baseTexture.clone();
    cloned.colorSpace = THREE.SRGBColorSpace;
    cloned.anisotropy = 16;
    cloned.wrapS = THREE.RepeatWrapping;
    cloned.wrapT = THREE.RepeatWrapping;
    cloned.needsUpdate = true;
    return cloned;
  }, [baseTexture]);

  const config = FABRIC_PRESETS[fabricType];
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);

  const onBeforeCompile = useMemo(() => (shader: THREE.Shader) => {
    shader.uniforms.uMicroScale = { value: 800.0 };

    // Inject Simplex Noise Function
    shader.fragmentShader = `
      uniform float uMicroScale;

      // Simplex 2D noise
      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                 -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
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
    ` + shader.fragmentShader;

    // Inject Micro-Fiber Logic
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <map_fragment>',
      `
      #include <map_fragment>

      // HYPER-ZOOM: Micro-Fiber Detail Engine
      // Calculate distance to camera (approximation from view position)
      float dist = length(vViewPosition);

      // Ramp up detail when closer than 1.5m, max at 0.3m
      float detailMix = smoothstep(1.5, 0.3, dist);

      if (detailMix > 0.01) {
        float noise = snoise(vMapUv * uMicroScale);
        float microNoise = snoise(vMapUv * uMicroScale * 2.0);

        // Modulate diffuse color for fiber texture
        // Darken crevices, lighten threads
        diffuseColor.rgb += (noise * 0.03 * detailMix) + (microNoise * 0.01 * detailMix);
      }
      `
    );

    // Inject Roughness Modulation
    shader.fragmentShader = shader.fragmentShader.replace(
        '#include <roughnessmap_fragment>',
        `
        #include <roughnessmap_fragment>
        if (detailMix > 0.01) {
            float noise = snoise(vMapUv * uMicroScale);
            // Increase roughness variation at micro scale
            roughnessFactor += (noise * 0.2 * detailMix);
            roughnessFactor = clamp(roughnessFactor, 0.0, 1.0);
        }
        `
    );

    // Inject Normal/Bump Modulation (Fake Surface Detail)
    shader.fragmentShader = shader.fragmentShader.replace(
        '#include <normal_fragment_maps>',
        `
        #include <normal_fragment_maps>
        if (detailMix > 0.01) {
             float noise = snoise(vMapUv * uMicroScale);
             // Perturb normal slightly based on noise
             // This is a cheat but effective for micro-surface feel without a real normal map
             normal.x += noise * 0.1 * detailMix;
             normal.y += noise * 0.1 * detailMix;
             normal = normalize(normal);
        }
        `
    );

  }, []);

  return (
    <meshPhysicalMaterial
      ref={materialRef}
      map={texture}
      // Physics based properties
      roughness={config.roughness}
      metalness={config.metalness}

      // 2.5D Displacement
      displacementMap={texture}
      displacementScale={config.displacementScale}
      displacementBias={-config.displacementScale / 2}

      // Micro-surface details
      normalMap={texture}
      normalScale={new THREE.Vector2(config.normalScale, config.normalScale)}

      // Advanced Fabric features
      sheen={config.sheen || 0}
      sheenColor={new THREE.Color(0xffffff)}
      sheenRoughness={0.5}

      clearcoat={config.clearcoat || 0}
      clearcoatRoughness={config.clearcoatRoughness || 0}

      // Standard props
      transparent={transparent}
      opacity={opacity}
      side={THREE.DoubleSide}
      alphaTest={0.5} // Sharper edges

      // Custom Shader Injection
      onBeforeCompile={onBeforeCompile}
    />
  );
}
