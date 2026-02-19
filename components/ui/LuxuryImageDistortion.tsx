"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame, extend, ThreeElement } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Custom Shader Material Class
class WaveShaderMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: null },
        uHover: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform sampler2D uTexture;
        uniform float uHover;
        varying vec2 vUv;

        // Simplex 2D noise
        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

        void main() {
          vec2 uv = vUv;

          // Subtle fluid distortion
          float time = uTime * 0.5;

          // Create a wave effect
          float waveX = sin(uv.y * 5.0 + time) * 0.01;
          float waveY = cos(uv.x * 5.0 + time) * 0.01;

          // Apply distortion
          vec2 distortedUv = uv + vec2(waveX, waveY);

          vec4 color = texture2D(uTexture, distortedUv);

          // Add a subtle gold shimmer
          // float shimmer = sin(uv.y * 20.0 + time * 2.0) * 0.05;
          // color.rgb += vec3(1.0, 0.84, 0.0) * shimmer * 0.2;

          gl_FragColor = color;
        }
      `,
      transparent: true,
    });
  }

  // Setters for easier updates
  set uTime(v: number) { this.uniforms.uTime.value = v; }
  set uTexture(v: THREE.Texture | null) { this.uniforms.uTexture.value = v; }
  set uHover(v: number) { this.uniforms.uHover.value = v; }
}

// Extend R3F with the custom material
extend({ WaveShaderMaterial });

// Type augmentation for the custom element
/* eslint-disable @typescript-eslint/no-namespace */
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      waveShaderMaterial: ThreeElement<typeof WaveShaderMaterial>;
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

function ImagePlane({ imageUrl }: { imageUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<WaveShaderMaterial>(null);

  // Load texture with Suspense support
  const texture = useTexture(imageUrl);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.getElapsedTime();
    }
  });

  // Calculate aspect ratio to maintain image proportions
  // Default to 1 if texture not loaded yet (though Suspense prevents this)
  const img = texture.image as HTMLImageElement;
  const aspectRatio = img ? img.width / img.height : 1;

  // Scale the plane to fit within view but maintain aspect ratio
  // Base height of 4 units
  const height = 4;
  const width = height * aspectRatio;

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[width, height, 32, 32]} />
      <waveShaderMaterial ref={materialRef} uTexture={texture} transparent />
    </mesh>
  );
}

export default function LuxuryImageDistortion({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="w-full h-full relative">
      {/* Framer Motion compatible canvas container */}
      <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <React.Suspense fallback={null}>
          <ImagePlane imageUrl={imageUrl} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
