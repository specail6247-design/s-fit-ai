import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { FabricType, FABRIC_PRESETS } from './types';
import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { microFiberParsFragment, microFiberFragment } from './hyperZoomShaders';

interface FabricMaterialProps {
  textureUrl: string;
  fabricType: FabricType;
  opacity?: number;
  transparent?: boolean;
}

const FABRIC_TYPE_MAP: Record<FabricType, number> = {
  'cotton': 0,
  'silk': 1,
  'denim': 2,
  'wool': 3,
  'leather': 4
};

export function FabricMaterial({
  textureUrl,
  fabricType = 'cotton',
  opacity = 1,
  transparent = true
}: FabricMaterialProps) {
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
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

  // Hyper-Zoom Logic: Update uniform based on camera distance
  useFrame(({ camera }) => {
    if (materialRef.current && materialRef.current.userData.shader) {
      // Since the material is on a mesh, we need the mesh position.
      // But here we are inside the material component.
      // We can approximate by assuming the object is near 0,0,0 or pass a ref.
      // Better: The shader uniform can be updated directly if we have access to it.

      // Calculate distance to camera.
      // Assuming the object is roughly at origin or we use camera position length if looking at origin.
      // Ideally we'd use the mesh's world position, but for simplicity in this component:
      const dist = camera.position.distanceTo(new THREE.Vector3(0, 0.9, 0)); // Approx chest height

      // Mix factor: 0 at > 2m, 1 at < 0.8m
      let mix = 1.0 - (dist - 0.8) / (2.0 - 0.8);
      mix = Math.max(0, Math.min(1, mix));

      materialRef.current.userData.shader.uniforms.uMicroMix.value = mix;
      materialRef.current.userData.shader.uniforms.uTime.value = performance.now() / 1000;
    }
  });

  const onBeforeCompile = (shader: THREE.Shader) => {
    materialRef.current!.userData.shader = shader;

    shader.uniforms.uMicroMix = { value: 0 };
    shader.uniforms.uFabricType = { value: FABRIC_TYPE_MAP[fabricType] };
    shader.uniforms.uTime = { value: 0 };

    // Inject Pars
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <common>',
      `
      #include <common>
      ${microFiberParsFragment}
      `
    );

    // Inject Logic
    // We inject after map_fragment to affect the sampled color
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <roughnessmap_fragment>',
      `
      #include <roughnessmap_fragment>
      ${microFiberFragment}
      `
    );
  };

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
      alphaTest={0.5}

      // Shader Injection
      onBeforeCompile={onBeforeCompile}
    />
  );
}
