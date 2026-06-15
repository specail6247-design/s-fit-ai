'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    vec2 uv = vUv;
    // Luxury fluid distortion
    uv.y += sin(uv.x * 4.0 + uTime * 0.5) * 0.01;
    uv.x += cos(uv.y * 3.0 + uTime * 0.5) * 0.01;
    vec4 color = texture2D(uTexture, uv);
    gl_FragColor = color;
  }
`;

function DistortedImage({ imageUrl }: { imageUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const baseTexture = useLoader(THREE.TextureLoader, imageUrl);
  const texture = useMemo(() => {
    const cloned = baseTexture.clone();
    cloned.colorSpace = THREE.SRGBColorSpace;
    cloned.minFilter = THREE.LinearFilter;
    cloned.magFilter = THREE.LinearFilter;
    cloned.needsUpdate = true;
    return cloned;
  }, [baseTexture]);

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uTime: { value: 0 }
  }), [texture]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* We make the plane large enough to cover the view, adjust scaling as needed or use object-fit logic */}
      <planeGeometry args={[2, 2, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
}

export function LuxuryImageDistortion({ imageUrl, className }: { imageUrl: string, className?: string }) {
  return (
    <div className={className} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      {/* We use OrthographicCamera to make the 2x2 plane fill the screen exactly without perspective distortion */}
      <Canvas orthographic camera={{ position: [0, 0, 1], zoom: 1, left: -1, right: 1, top: 1, bottom: -1 }}>
        <React.Suspense fallback={null}>
          <DistortedImage imageUrl={imageUrl} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
