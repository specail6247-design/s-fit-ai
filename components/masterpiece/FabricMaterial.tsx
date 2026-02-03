import { useTexture } from '@react-three/drei';
import { FabricType, FABRIC_PRESETS } from './types';
import * as THREE from 'three';
import { useMemo } from 'react';

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

  // Hyper-Zoom Shader Injection
  // Adds procedural micro-noise to simulate fibers and grain at close distance
  const onBeforeCompile = useMemo(() => (shader: THREE.Shader) => {
    // 1. Inject Noise Function
    shader.fragmentShader = `
      float rand(vec2 co){
          return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
      }
    ` + shader.fragmentShader;

    // 2. Perturb Roughness (Micro-Grain)
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <roughnessmap_fragment>',
      `
      #include <roughnessmap_fragment>

      // Hyper-Zoom: Micro-Grain Simulation
      // High frequency noise to break up the smoothness
      float microNoise = rand(vMapUv * 1200.0);
      float detailStrength = 0.12;

      // Varies based on fabric type logic could be added here via uniforms,
      // but for now we apply a general fiber grain.
      roughnessFactor += (microNoise - 0.5) * detailStrength;
      roughnessFactor = clamp(roughnessFactor, 0.05, 1.0);
      `
    );

    // 3. Perturb Normal (Fiber Depth)
    // We modify the view-space normal after the normal map is applied
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <normal_fragment_maps>',
      `
      #include <normal_fragment_maps>

      // Hyper-Zoom: Fiber Normal Perturbation
      // Adds subtle bumps that catch light at micro scales
      float fiberNoiseX = rand(vMapUv * 2000.0);
      float fiberNoiseY = rand(vMapUv * 2000.0 + 42.0);

      vec3 fiberPerturb = vec3((fiberNoiseX - 0.5) * 0.08, (fiberNoiseY - 0.5) * 0.08, 0.0);

      // Apply only if we have a map (which we do)
      normal += fiberPerturb;
      normal = normalize(normal);
      `
    );
  }, []);

  return (
    <meshPhysicalMaterial
      map={texture}
      // Physics based properties
      roughness={config.roughness}
      metalness={config.metalness}

      // 2.5D Displacement
      // We use the texture itself as a height map proxy.
      displacementMap={texture}
      displacementScale={config.displacementScale}
      displacementBias={-config.displacementScale / 2}

      // Micro-surface details
      // Using the texture as a normal map adds surface detail corresponding to the visual pattern.
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

      // Hyper-Zoom Integration
      onBeforeCompile={onBeforeCompile}
    />
  );
}
