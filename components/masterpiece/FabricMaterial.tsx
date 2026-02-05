import { useTexture } from '@react-three/drei';
import { FabricType, FABRIC_PRESETS } from './types';
import * as THREE from 'three';
import { useMemo, useEffect } from 'react';

interface FabricMaterialProps {
  textureUrl: string;
  fabricType: FabricType;
  opacity?: number;
  transparent?: boolean;
}

// Procedural Micro-Fiber Generation (Hyper-Zoom Engine)
function generateMicroFiberTexture(type: FabricType): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Fill background
  ctx.fillStyle = '#808080'; // Neutral gray
  ctx.fillRect(0, 0, size, size);

  // Noise Generation
  const imageData = ctx.getImageData(0, 0, size, size);
  const data = imageData.data;

  // 40x40 Repetition Density
  const frequency = 40;

  for (let i = 0; i < data.length; i += 4) {
    const x = (i / 4) % size;
    const y = Math.floor((i / 4) / size);

    let noise = 0;

    if (type === 'denim') {
        // Diagonal Weave Pattern
        noise = (Math.sin((x + y) * 0.5 * frequency) + Math.random() * 0.5) * 20;
    } else if (type === 'silk') {
        // Smooth, very fine grain
        noise = (Math.random() - 0.5) * 5;
    } else if (type === 'wool') {
        // Fuzzy, high frequency
        noise = (Math.random() - 0.5) * 40;
    } else if (type === 'leather') {
        // Cellular noise approximation (simplified)
        noise = (Math.sin(x * 0.1 * frequency) * Math.cos(y * 0.1 * frequency)) * 10 + (Math.random() - 0.5) * 5;
    } else {
        // Cotton / Default (Crosshatch)
        noise = (Math.sin(x * 0.5 * frequency) + Math.cos(y * 0.5 * frequency)) * 10;
    }

    const value = 128 + noise;
    data[i] = value;     // R
    data[i + 1] = value; // G
    data[i + 2] = value; // B
    data[i + 3] = 255;   // A
  }

  ctx.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4); // Repeat the detail map

  return texture;
}

export function FabricMaterial({
  textureUrl,
  fabricType = 'cotton',
  opacity = 1,
  transparent = true
}: FabricMaterialProps) {
  const baseTexture = useTexture(textureUrl);

  // Main Texture Config
  const texture = useMemo(() => {
    const cloned = baseTexture.clone();
    cloned.colorSpace = THREE.SRGBColorSpace;
    cloned.anisotropy = 16;
    cloned.wrapS = THREE.RepeatWrapping;
    cloned.wrapT = THREE.RepeatWrapping;
    cloned.needsUpdate = true;
    return cloned;
  }, [baseTexture]);

  // Micro-Fiber Detail Texture
  const detailTexture = useMemo(() => {
    return generateMicroFiberTexture(fabricType);
  }, [fabricType]);

  // Clean up procedural texture
  useEffect(() => {
    return () => {
      detailTexture.dispose();
    };
  }, [detailTexture]);

  const config = FABRIC_PRESETS[fabricType];

  return (
    <meshPhysicalMaterial
      map={texture}
      // Physics based properties
      roughness={config.roughness}
      metalness={config.metalness}

      // Micro-Fiber Roughness Map (Adds surface variation)
      roughnessMap={detailTexture}

      // 2.5D Displacement
      displacementMap={texture}
      displacementScale={config.displacementScale}
      displacementBias={-config.displacementScale / 2}

      // Micro-surface details (Main visual pattern)
      normalMap={texture}
      normalScale={new THREE.Vector2(config.normalScale, config.normalScale)}

      // Detail Bump Map (Micro-fibers)
      bumpMap={detailTexture}
      bumpScale={0.005} // Subtle micro-detail

      // Advanced Fabric features
      sheen={config.sheen || 0}
      sheenColor={config.sheenColor ? new THREE.Color(config.sheenColor) : new THREE.Color(0xffffff)}
      sheenRoughness={config.sheenRoughness || 0.5}

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
