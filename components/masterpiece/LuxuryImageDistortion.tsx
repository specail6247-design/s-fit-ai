"use client";
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
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
varying vec2 vUv;

void main() {
  vec2 p = vUv;
  p.x += sin(p.y * 10.0 + uTime) * 0.01;
  p.y += cos(p.x * 10.0 + uTime) * 0.01;
  gl_FragColor = texture2D(tDiffuse, p);
}
`;

const DistortionEffect = ({ image }: { image: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = new THREE.TextureLoader().load(image);

  const uniforms = {
    tDiffuse: { value: texture },
    uTime: { value: 0 },
  };

  useFrame((state) => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export const LuxuryImageDistortion = ({ image, className }: { image: string, className?: string }) => {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <DistortionEffect image={image} />
      </Canvas>
    </div>
  );
};
