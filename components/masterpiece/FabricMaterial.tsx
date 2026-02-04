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

// Generate a procedural noise texture for micro-fiber simulation
function generateMicroFiberTexture() {
    if (typeof document === 'undefined') return null;

    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // 1. Base Noise
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, size, size);

    const imageData = ctx.getImageData(0, 0, size, size);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 40;
        data[i] = Math.max(0, Math.min(255, data[i] + noise));
        data[i+1] = Math.max(0, Math.min(255, data[i+1] + noise));
        data[i+2] = Math.max(0, Math.min(255, data[i+2] + noise));
    }
    ctx.putImageData(imageData, 0, 0);

    // 2. Micro Weave Pattern
    ctx.globalCompositeOperation = 'overlay';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;

    // Horizontal threads
    for(let y = 0; y < size; y += 4) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(size, y);
        ctx.stroke();
    }

    // Vertical threads
    for(let x = 0; x < size; x += 4) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, size);
        ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.anisotropy = 16;

    return texture;
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

  // Generate or memoize the micro-fiber texture
  const microTexture = useMemo(() => {
     const tex = generateMicroFiberTexture();
     if (tex) {
         // High repetition for micro-detail
         tex.repeat.set(40, 40);
     }
     return tex;
  }, []);

  useEffect(() => {
      return () => {
          microTexture?.dispose();
      };
  }, [microTexture]);

  const config = FABRIC_PRESETS[fabricType];

  return (
    <meshPhysicalMaterial
      map={texture}
      // Physics based properties
      roughness={config.roughness}
      metalness={config.metalness}

      // 2.5D Displacement (Macro Folds)
      displacementMap={texture}
      displacementScale={config.displacementScale}
      displacementBias={-config.displacementScale / 2}

      // Micro-surface details (Hyper-Zoom)
      // Use the generated weave for true micro-surface detail
      normalMap={microTexture || texture}
      normalScale={microTexture ? new THREE.Vector2(0.5, 0.5) : new THREE.Vector2(config.normalScale, config.normalScale)}

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
