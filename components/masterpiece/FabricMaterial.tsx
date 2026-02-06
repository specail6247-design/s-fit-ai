import { useTexture } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import { FabricType, FABRIC_PRESETS } from './types';
import * as THREE from 'three';
import { useMemo, useState } from 'react';

interface FabricMaterialProps {
  textureUrl: string;
  fabricType: FabricType;
  opacity?: number;
  transparent?: boolean;
  isMacroView?: boolean;
}

export function FabricMaterial({
  textureUrl,
  fabricType = 'cotton',
  opacity = 1,
  transparent = true,
  isMacroView = false
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

  const { camera } = useThree();
  const [isCloseUp, setIsCloseUp] = useState(false);

  useFrame(() => {
    const isClose = camera.position.z < 2.0;
    if (isClose !== isCloseUp) setIsCloseUp(isClose);
  });

  const effectiveMacro = isMacroView || isCloseUp;
  const config = FABRIC_PRESETS[fabricType];

  // Amplify details in Macro Mode
  const normalScale = effectiveMacro ? config.normalScale * 2.5 : config.normalScale;
  const displacementScale = effectiveMacro ? config.displacementScale * 1.5 : config.displacementScale;

  return (
    <meshPhysicalMaterial
      map={texture}
      // Physics based properties
      roughness={config.roughness}
      metalness={config.metalness}

      // 2.5D Displacement
      // We use the texture itself as a height map proxy.
      // Ideally this would be a real depth map.
      displacementMap={texture}
      displacementScale={displacementScale}
      displacementBias={-displacementScale / 2}

      // Micro-surface details
      // Using the texture as a normal map adds surface detail corresponding to the visual pattern.
      normalMap={texture}
      normalScale={new THREE.Vector2(normalScale, normalScale)}

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
