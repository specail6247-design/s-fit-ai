'use client';

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useRef } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { useTexture, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

const LuxuryDistortionMaterial = shaderMaterial(
  { time: 0, uTexture: new THREE.Texture(), intensity: 1.0 },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float time;
    uniform float intensity;
    uniform sampler2D uTexture;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;

      // Slow liquid distortion
      float wave = sin(uv.y * 5.0 + time * 0.5) * 0.005 * intensity;
      float wave2 = cos(uv.x * 6.0 + time * 0.3) * 0.005 * intensity;

      uv.x += wave;
      uv.y += wave2;

      vec4 color = texture2D(uTexture, uv);

      // Subtle chromatic aberration
      float r = texture2D(uTexture, uv + vec2(0.003 * intensity, 0.0)).r;
      float b = texture2D(uTexture, uv - vec2(0.003 * intensity, 0.0)).b;

      gl_FragColor = vec4(r, color.g, b, color.a);
    }
  `
);

extend({ LuxuryDistortionMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      luxuryDistortionMaterial: any;
    }
  }
}

function DistortionMesh({ imageUrl, intensity }: { imageUrl: string, intensity: number }) {
  const ref = useRef<any>();
  const texture = useTexture(imageUrl);
  const { viewport } = useThree();

  const imgAspect = texture.image.width / texture.image.height;
  const viewportAspect = viewport.width / viewport.height;

  // Cover logic (similar to object-fit: cover)
  let scaleX, scaleY;
  if (imgAspect > viewportAspect) {
      scaleY = viewport.height;
      scaleX = viewport.height * imgAspect;
  } else {
      scaleX = viewport.width;
      scaleY = viewport.width / imgAspect;
  }

  useFrame((state) => {
    if (ref.current) {
      ref.current.time = state.clock.getElapsedTime();
      ref.current.intensity = THREE.MathUtils.lerp(ref.current.intensity, intensity, 0.05);
    }
  });

  return (
    <mesh scale={[scaleX, scaleY, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      {/* @ts-expect-error - extend adds this to JSX */}
      <luxuryDistortionMaterial ref={ref} uTexture={texture} intensity={intensity} transparent />
    </mesh>
  );
}

export default function LuxuryImageDistortion({ imageUrl, className, intensity = 1.0 }: { imageUrl: string, className?: string, intensity?: number }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <React.Suspense fallback={null}>
           <DistortionMesh imageUrl={imageUrl} intensity={intensity} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
