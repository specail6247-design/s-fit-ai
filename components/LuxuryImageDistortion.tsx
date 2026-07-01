"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const fragmentShader = `
uniform float uTime;
uniform sampler2D uTexture;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  // Fluid distortion effect
  float noise = sin(uv.y * 10.0 + uTime) * 0.02;
  uv.x += noise;

  vec4 color = texture2D(uTexture, uv);
  gl_FragColor = color;
}
`;

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const DistortionMaterial = ({ imageUrl }: { imageUrl: string }) => {
  const texture = useTexture(imageUrl);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: texture },
    }),
    [texture]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
    />
  );
};

export default function LuxuryImageDistortion({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <Canvas>
        <ambientLight intensity={1} />
        <mesh>
          <planeGeometry args={[15, 20]} /> {/* Make it large enough to cover viewport depending on camera, or adjust aspect ratio */}
          <React.Suspense fallback={<meshBasicMaterial color="#101922" />}>
            <DistortionMaterial imageUrl={imageUrl} />
          </React.Suspense>
        </mesh>
      </Canvas>
    </div>
  );
}
