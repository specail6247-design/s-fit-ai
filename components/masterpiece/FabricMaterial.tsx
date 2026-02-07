import { useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { FabricType, FABRIC_PRESETS } from './types';
import * as THREE from 'three';
import { useMemo, useState, useRef, useEffect } from 'react';

interface FabricMaterialProps {
  textureUrl: string;
  fabricType: FabricType;
  opacity?: number;
  transparent?: boolean;
}

// Procedural Noise Generator for Hyper-Zoom Micro-Details
function generateNoiseTexture(type: FabricType): THREE.CanvasTexture {
  if (typeof document === 'undefined') return new THREE.CanvasTexture(new OffscreenCanvas(256, 256) as unknown as HTMLCanvasElement);

  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const imageData = ctx.createImageData(size, size);
    const data = imageData.data;

    // Different noise characteristics based on fabric type
    for (let i = 0; i < data.length; i += 4) {
      let val = Math.random() * 255;

      if (type === 'denim') {
        // Diagonal grain for denim
        const x = (i / 4) % size;
        const y = Math.floor((i / 4) / size);
        if ((x + y) % 4 === 0) val = Math.min(255, val + 50);
      } else if (type === 'silk') {
        // Smoother, lower contrast noise for silk
        val = 200 + Math.random() * 55;
      }

      data[i] = val;     // R
      data[i + 1] = val; // G
      data[i + 2] = val; // B
      data[i + 3] = 255; // A
    }
    ctx.putImageData(imageData, 0, 0);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  // High repetition for micro-detail
  const repeat = type === 'silk' ? 60 : (type === 'denim' ? 40 : 30);
  texture.repeat.set(repeat, repeat);
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

  // Generate micro-detail map
  const detailMap = useMemo(() => generateNoiseTexture(fabricType), [fabricType]);

  // Dispose of generated texture on unmount
  useEffect(() => {
    return () => {
      detailMap.dispose();
    };
  }, [detailMap]);

  const config = FABRIC_PRESETS[fabricType];
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const { camera } = useThree();

  // Hyper-Zoom Logic: Adjust Bump Scale based on distance
  useFrame((state) => {
    if (!materialRef.current) return;

    // Get world position of the object (approximation, assuming parent is at 0 or close)
    // A more robust way is to get the object's world position, but here we assume the camera moves relative to 0,0,0
    const dist = camera.position.distanceTo(new THREE.Vector3(0, 0, 0)); // Simplified

    // Thresholds: Far > 2.0 (No Detail), Close < 1.5 (Full Detail)
    let targetScale = 0;
    if (dist < 1.5) {
       // Closer -> More bump detail
       targetScale = config.displacementScale * 0.5; // Base intensity
       if (fabricType === 'denim' || fabricType === 'wool') targetScale *= 2.0;
       if (fabricType === 'silk') targetScale *= 0.5;
    } else {
       targetScale = 0.001; // Fade out
    }

    // Smooth transition
    materialRef.current.bumpScale = THREE.MathUtils.lerp(materialRef.current.bumpScale, targetScale, 0.1);
  });

  return (
    <meshPhysicalMaterial
      ref={materialRef}
      map={texture}
      // Physics based properties
      roughness={config.roughness}
      metalness={config.metalness}

      // 2.5D Displacement (Macro)
      displacementMap={texture}
      displacementScale={config.displacementScale}
      displacementBias={-config.displacementScale / 2}

      // Micro-surface details (Hybrid approach)
      // 1. Normal Map from Base Texture (Macro Weave)
      normalMap={texture}
      normalScale={new THREE.Vector2(config.normalScale, config.normalScale)}

      // 2. Bump Map from Procedural Noise (Micro Fiber) - Revealed on Zoom
      bumpMap={detailMap}
      bumpScale={0} // Controlled by useFrame

      // Advanced Fabric features
      sheen={config.sheen || 0}
      sheenColor={new THREE.Color(0xffffff)}
      sheenRoughness={config.sheenRoughness ?? 0.5}

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
