"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D tDiffuse;
  uniform float uTime;
  uniform float uHover;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv;
    float x = uHover * 0.05 * sin(p.y * 10.0 + uTime);
    float y = uHover * 0.05 * cos(p.x * 10.0 + uTime);
    vec2 distortedPosition = vec2(p.x + x, p.y + y);
    vec4 color = texture2D(tDiffuse, distortedPosition);
    gl_FragColor = color;
  }
`;

function DistortionMaterial({ imageSrc, hoverValue }: { imageSrc: string, hoverValue: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(imageSrc);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Smoothly interpolate hover value
      materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHover.value,
        hoverValue,
        0.1
      );
    }
  });

  return (
    <mesh>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          tDiffuse: { value: texture },
          uTime: { value: 0 },
          uHover: { value: 0 },
        }}
      />
    </mesh>
  );
}

export function LuxuryImageDistortion({ src, className }: { src: string, alt?: string, className?: string }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas orthographic camera={{ position: [0, 0, 1], zoom: 1 }}>
        <React.Suspense fallback={null}>
          <DistortionMaterial imageSrc={src} hoverValue={hovered ? 1 : 0} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}

export default LuxuryImageDistortion;
