import { useTexture } from '@react-three/drei';
import { FabricType, FABRIC_PRESETS } from './types';
import * as THREE from 'three';
import { useMemo } from 'react';
import { generateNoiseCanvas } from '@/lib/textureUtils';

interface FabricMaterialProps {
  textureUrl: string;
  fabricType: FabricType;
  opacity?: number;
  transparent?: boolean;
  microMode?: boolean;
}

export function FabricMaterial({
  textureUrl,
  fabricType = 'cotton',
  opacity = 1,
  transparent = true,
  microMode = false
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

  // Generate noise texture for micro-details (Hyper-Zoom)
  const noiseTexture = useMemo(() => {
    const canvas = generateNoiseCanvas(512, 512);
    if (!canvas) return null;
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(50, 50); // High repetition for fiber simulation
    return tex;
  }, []);

  const config = FABRIC_PRESETS[fabricType];

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

      // Hyper-Zoom Detail: Apply noise as bump map when in micro mode
      bumpMap={microMode && noiseTexture ? noiseTexture : undefined}
      bumpScale={microMode ? 0.02 : 0}

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
