import { useTexture } from '@react-three/drei';
import { FabricType, FABRIC_PRESETS } from './types';
import * as THREE from 'three';
import { useMemo } from 'react';

interface FabricMaterialProps {
  textureUrl: string;
  fabricType: FabricType;
  opacity?: number;
  transparent?: boolean;
  isMacro?: boolean;
}

export function FabricMaterial({
  textureUrl,
  fabricType = 'cotton',
  opacity = 1,
  transparent = true,
  isMacro = false
}: FabricMaterialProps) {
  const baseTexture = useTexture(textureUrl);

  // Micro-fiber noise texture for Hyper-Zoom
  const noiseTexture = useMemo(() => {
      // 1x1 grey pixel as fallback, but ideally this is a high-freq noise map.
      // In a real implementation, we would load a shared detail_noise.jpg
      return baseTexture;
  }, [baseTexture]);

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

  // Hyper-Zoom Logic: Amplify details when in Macro mode
  const macroMultiplier = isMacro ? 2.5 : 1.0;

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
      displacementScale={config.displacementScale * (isMacro ? 1.2 : 1.0)}
      displacementBias={(-config.displacementScale * (isMacro ? 1.2 : 1.0)) / 2}

      // Micro-surface details
      // Using the texture as a normal map adds surface detail corresponding to the visual pattern.
      normalMap={texture}
      normalScale={new THREE.Vector2(config.normalScale * macroMultiplier, config.normalScale * macroMultiplier)}

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
