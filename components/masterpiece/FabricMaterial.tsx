import { useTexture } from '@react-three/drei';
import { FabricType, FABRIC_PRESETS } from './types';
import * as THREE from 'three';
import { useMemo } from 'react';

interface FabricMaterialProps {
  textureUrl: string;
  normalMapUrl?: string;
  displacementMapUrl?: string;
  fabricType: FabricType;
  opacity?: number;
  transparent?: boolean;
}

export function FabricMaterial({
  textureUrl,
  normalMapUrl,
  displacementMapUrl,
  fabricType = 'cotton',
  opacity = 1,
  transparent = true
}: FabricMaterialProps) {
  const textures = useTexture({
    map: textureUrl,
    normal: normalMapUrl || textureUrl,
    disp: displacementMapUrl || textureUrl
  });

  const { texture, normalMap, displacementMap } = useMemo(() => {
    // Base Color Texture
    const map = textures.map.clone();
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = 16;
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.needsUpdate = true;

    // Normal Map
    const normal = textures.normal.clone();
    normal.colorSpace = THREE.NoColorSpace;
    normal.wrapS = THREE.RepeatWrapping;
    normal.wrapT = THREE.RepeatWrapping;
    normal.needsUpdate = true;

    // Displacement Map
    const disp = textures.disp.clone();
    disp.colorSpace = THREE.NoColorSpace;
    disp.wrapS = THREE.RepeatWrapping;
    disp.wrapT = THREE.RepeatWrapping;
    disp.needsUpdate = true;

    return { texture: map, normalMap: normal, displacementMap: disp };
  }, [textures]);

  const config = FABRIC_PRESETS[fabricType];
  const hasRealNormal = !!normalMapUrl;
  const hasRealDisp = !!displacementMapUrl;

  return (
    <meshPhysicalMaterial
      map={texture}
      // Physics based properties
      roughness={config.roughness}
      metalness={config.metalness}

      // 2.5D Displacement
      displacementMap={displacementMap}
      displacementScale={hasRealDisp ? config.displacementScale * 2 : config.displacementScale} // Boost if real map
      displacementBias={hasRealDisp ? -config.displacementScale : -config.displacementScale / 2}

      // Micro-surface details
      normalMap={normalMap}
      normalScale={hasRealNormal ? new THREE.Vector2(1, 1) : new THREE.Vector2(config.normalScale, config.normalScale)}

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
