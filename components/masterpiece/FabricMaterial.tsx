import { useTexture } from '@react-three/drei';
import { FabricType, FABRIC_PRESETS } from './types';
import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

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
  const { camera } = useThree();

  useFrame(() => {
    if (materialRef.current) {
      // Hyper-Zoom Engine: Calculate distance from camera to center
      const distance = camera.position.length();

      // The closer the camera, the higher the detail multiplier
      // Normal camera distance is ~3, Macro distance is ~1.5
      let zoomFactor = 1.0;
      if (distance < 2.5) {
        // Linearly increase detail as camera gets closer (from 1.0 at d=2.5 to ~3.0 at d=1.0)
        zoomFactor = 1.0 + (2.5 - distance) * 1.5;
      }

      // Apply amplified displacement and normal scales to reveal micro-fiber details
      materialRef.current.displacementScale = config.displacementScale * zoomFactor;
      materialRef.current.displacementBias = -materialRef.current.displacementScale / 2;
      materialRef.current.normalScale.set(
        config.normalScale * zoomFactor,
        config.normalScale * zoomFactor
      );
    }
  });

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
    />
  );
}
