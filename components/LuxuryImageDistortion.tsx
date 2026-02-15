"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Define the shader material
class DistortionMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
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
        uniform vec2 uMouse;
        uniform sampler2D uTexture;
        uniform float uHover;
        varying vec2 vUv;

        void main() {
          vec2 p = vUv;

          // Luxury distortion: subtle wave + slight chromatic aberration
          float wave = sin(p.y * 10.0 + uTime) * 0.005;
          float dist = distance(p, uMouse);
          float mouseWave = sin(dist * 20.0 - uTime * 2.0) * 0.01 * uHover;

          vec2 distortedUv = p + vec2(wave + mouseWave, 0.0);

          // Chromatic aberration
          float r = texture2D(uTexture, distortedUv + vec2(0.002, 0.0)).r;
          float g = texture2D(uTexture, distortedUv).g;
          float b = texture2D(uTexture, distortedUv - vec2(0.002, 0.0)).b;

          gl_FragColor = vec4(r, g, b, 1.0);
        }
      `,
    });
  }

  get uTime() { return this.uniforms.uTime.value; }
  set uTime(v) { this.uniforms.uTime.value = v; }

  get uMouse() { return this.uniforms.uMouse.value; }
  set uMouse(v) { this.uniforms.uMouse.value = v; }

  get uTexture() { return this.uniforms.uTexture.value; }
  set uTexture(v) { this.uniforms.uTexture.value = v; }

  get uHover() { return this.uniforms.uHover.value; }
  set uHover(v) { this.uniforms.uHover.value = v; }
}

extend({ DistortionMaterial });

// Add type definition for the custom element
declare module '@react-three/fiber' {
  interface ThreeElements {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    distortionMaterial: any;
  }
}

function DistortionMesh({ imageUrl }: { imageUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<DistortionMaterial>(null);
  const texture = useTexture(imageUrl) as THREE.Texture;
  const { viewport } = useThree();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.getElapsedTime();

      const x = (state.pointer.x + 1) / 2;
      const y = (state.pointer.y + 1) / 2;

      materialRef.current.uMouse.set(x, y);
      materialRef.current.uHover = THREE.MathUtils.lerp(materialRef.current.uHover, 1, 0.05);
    }
  });

  const img = texture.image;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const aspect = (img as any).width / (img as any).height;
  const viewportAspect = viewport.width / viewport.height;

  let width, height;
  // "Cover" logic
  if (aspect > viewportAspect) {
     height = viewport.height;
     width = height * aspect;
  } else {
     width = viewport.width;
     height = width / aspect;
  }

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[width, height, 32, 32]} />
      <distortionMaterial ref={materialRef} uTexture={texture} />
    </mesh>
  );
}

export default function LuxuryImageDistortion({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="w-full h-full relative bg-[#0a0a0a]">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <React.Suspense fallback={null}>
          <DistortionMesh imageUrl={imageUrl} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
