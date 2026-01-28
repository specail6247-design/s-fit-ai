import { useTexture } from '@react-three/drei';
import { FabricType, FABRIC_PRESETS } from './types';
import * as THREE from 'three';
import { useMemo } from 'react';

interface FabricMaterialProps {
  textureUrl: string;
  fabricType: FabricType;
  opacity?: number;
  transparent?: boolean;
  isMacro?: boolean; // Hyper-Zoom Support
}

export function FabricMaterial({
  textureUrl,
  fabricType = 'cotton',
  opacity = 1,
  transparent = true,
  isMacro = false
}: FabricMaterialProps) {
  const baseTexture = useTexture(textureUrl);
  const texture = useMemo(() => {
    const cloned = baseTexture.clone();
    cloned.colorSpace = THREE.SRGBColorSpace;
    cloned.anisotropy = 16;
    cloned.wrapS = THREE.RepeatWrapping;
    cloned.wrapT = THREE.RepeatWrapping;
    // When in macro mode, we might want to repeat the texture to show "micro details"
    // if the texture was a tiled pattern. Since it's usually a product shot,
    // we rely on normal map scaling instead.
    cloned.needsUpdate = true;
    return cloned;
  }, [baseTexture]);

  const config = FABRIC_PRESETS[fabricType];

  // Hyper-Zoom Logic: Exaggerate details when zoomed in
  const macroNormalScale = isMacro ? (config.normalScale * 3.0) : config.normalScale;
  const macroDisplacementScale = isMacro ? (config.displacementScale * 1.5) : config.displacementScale;
  const macroRoughness = isMacro ? Math.max(0.1, config.roughness - 0.1) : config.roughness; // Shinier/Clearer close up? Or rougher?
  // Usually fiber details mean more self-shadowing, so slightly rougher visually, but let's stick to revealing structure.

  return (
    <meshPhysicalMaterial
      map={texture}
      // Physics based properties
      roughness={macroRoughness}
      metalness={config.metalness}

      // 2.5D Displacement
      // We use the texture itself as a height map proxy.
      // Ideally this would be a real depth map.
      displacementMap={texture}
      displacementScale={macroDisplacementScale}
      displacementBias={-macroDisplacementScale / 2}

      // Micro-surface details
      // Using the texture as a normal map adds surface detail corresponding to the visual pattern.
      normalMap={texture}
      normalScale={new THREE.Vector2(macroNormalScale, macroNormalScale)}

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
