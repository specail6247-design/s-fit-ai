'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
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
  uniform float uTime;
  uniform sampler2D uTexture;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    // Gentle fluid distortion
    float noise = sin(uv.y * 10.0 + uTime) * 0.002 + cos(uv.x * 10.0 + uTime * 0.5) * 0.002;
    uv.x += noise;
    uv.y += noise;

    gl_FragColor = texture2D(uTexture, uv);
  }
`;

const FluidImage = ({ imageUrl }: { imageUrl: string }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: texture },
    }),
    [texture]
  );

  useFrame((state) => {
    if (mesh.current) {
      const material = mesh.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  // Calculate cover scale
  const imageAspect = texture.image.width / texture.image.height;
  const viewportAspect = viewport.width / viewport.height;

  let scale: [number, number, number] = [1, 1, 1];
  if (imageAspect > viewportAspect) {
    scale = [viewport.height * imageAspect, viewport.height, 1];
  } else {
    scale = [viewport.width, viewport.width / imageAspect, 1];
  }

  return (
    <mesh ref={mesh} scale={scale}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
};

export default function LuxuryImageDistortion({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="h-full w-full bg-black">
      <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 2]}>
        <React.Suspense fallback={null}>
          <FluidImage imageUrl={imageUrl} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
