import { useTexture } from '@react-three/drei';
import { FabricType, FABRIC_PRESETS } from './types';
import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

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

  useFrame(({ camera }) => {
    if (!materialRef.current) return;
    // Calculate camera distance to the garment (approximate center 0, 0.5, 0)
    const dist = camera.position.distanceTo(new THREE.Vector3(0, 0.5, 0));

    // Normal view dist is ~2.8, Macro view dist is ~1.26
    const zoomFactor = THREE.MathUtils.clamp((2.8 - dist) / (2.8 - 1.2), 0, 1);

    // Hyper-Zoom: amplify displacement and normal scales based on proximity
    materialRef.current.displacementScale = config.displacementScale * (1 + zoomFactor * 2);
    const amplifiedNormal = config.normalScale * (1 + zoomFactor * 1.5);
    materialRef.current.normalScale.set(amplifiedNormal, amplifiedNormal);
  });

  return (
    <meshPhysicalMaterial
      ref={materialRef}
      map={texture}
      // Physics based properties
      roughness={config.roughness}
      metalness={config.metalness}

      // 2.5D Displacement
      // We use the texture itself as a height map proxy.
      // Ideally this would be a real depth map.
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
    />
  );
}
