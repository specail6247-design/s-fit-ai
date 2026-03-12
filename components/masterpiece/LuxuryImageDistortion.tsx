'use client';

import React, { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const fragmentShader = `
uniform sampler2D uTexture;
uniform sampler2D uDistortionMap;
uniform float uHoverState;
varying vec2 vUv;

void main() {
  vec4 displacement = texture2D(uDistortionMap, vUv);

  // Calculate distortion based on hover state
  vec2 distortedUv = vUv + vec2(
    (displacement.r - 0.5) * 0.1 * uHoverState,
    (displacement.g - 0.5) * 0.1 * uHoverState
  );

  vec4 color = texture2D(uTexture, distortedUv);

  // Optional: Add slight saturation/contrast on hover for luxury feel
  float saturation = 0.9 + (0.1 * uHoverState);
  float contrast = 1.0 + (0.1 * uHoverState);

  vec3 finalColor = color.rgb * saturation;
  finalColor = (finalColor - 0.5) * contrast + 0.5;

  gl_FragColor = vec4(finalColor, color.a);
}
`;

const vertexShader = `
varying vec2 vUv;
uniform float uHoverState;

void main() {
  vUv = uv;
  vec3 pos = position;

  // Slight z-axis pop on hover
  pos.z += uHoverState * 0.05;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

interface SceneProps {
  imageUrl: string;
  distortionTextureUrl?: string;
  aspectRatio: number;
}

function DistortionScene({ imageUrl, distortionTextureUrl, aspectRatio }: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [hovered, setHovered] = useState(false);

  const defaultDistortion = 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop';

  const [texture, distortionMap] = useTexture([
    imageUrl,
    distortionTextureUrl || defaultDistortion
  ]);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uDistortionMap: { value: distortionMap },
      uHoverState: { value: 0.0 },
    }),
    [texture, distortionMap]
  );

  useFrame(() => {
    if (materialRef.current) {
      // Smooth interpolation for hover state
      const targetHover = hovered ? 1.0 : 0.0;
      materialRef.current.uniforms.uHoverState.value += (targetHover - materialRef.current.uniforms.uHoverState.value) * 0.05;
    }
  });

  // Calculate plane dimensions to preserve aspect ratio
  // Standardize height to 2.0 (Three.js units), width scales accordingly
  const planeHeight = 2.0;
  const planeWidth = planeHeight * aspectRatio;

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[planeWidth, planeHeight, 32, 32]} />
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

interface LuxuryImageDistortionProps {
  imageUrl: string;
  distortionTextureUrl?: string;
  className?: string;
  aspectRatio?: number; // width / height
}

export function LuxuryImageDistortion({
  imageUrl,
  distortionTextureUrl,
  className = '',
  aspectRatio = 3 / 4 // Default portrait aspect ratio
}: LuxuryImageDistortionProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 1.5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <DistortionScene
            imageUrl={imageUrl}
            distortionTextureUrl={distortionTextureUrl}
            aspectRatio={aspectRatio}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
