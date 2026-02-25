"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { shaderMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";

// Define the shader material
const FluidDistortionMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
    uMouse: new THREE.Vector2(0, 0),
    uHover: 0,
  },
  // vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  `
    uniform float uTime;
    uniform sampler2D uTexture;
    uniform vec2 uMouse;
    uniform float uHover;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;

      // Simple wave distortion
      float wave = sin(uv.y * 10.0 + uTime) * 0.02 * uHover;
      uv.x += wave;

      // Mouse influence
      // float dist = distance(uv, uMouse);
      // float mouseEffect = smoothstep(0.5, 0.0, dist) * 0.1 * uHover;
      // uv += (uv - uMouse) * mouseEffect;

      vec4 color = texture2D(uTexture, uv);
      gl_FragColor = color;
    }
  `
);

extend({ FluidDistortionMaterial });

// Declare the JSX intrinsic element for TypeScript
declare module "@react-three/fiber" {
  interface ThreeElements {
    fluidDistortionMaterial: any;
  }
}

interface SceneProps {
  imageUrl: string;
}

function Scene({ imageUrl }: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const texture = useTexture(imageUrl);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.getElapsedTime();
      // Mouse position normalized to 0-1, but we need to map it to UV space or clip space
      // state.pointer is -1 to 1.
      materialRef.current.uMouse = state.pointer;
    }
  });

  const [hovered, setHover] = React.useState(false);

  useFrame(() => {
     if (materialRef.current) {
        // Smoothly interpolate hover value
        materialRef.current.uHover = THREE.MathUtils.lerp(materialRef.current.uHover, hovered ? 1 : 0, 0.1);
     }
  });

  // Safe access to image dimensions
  const img = (texture as any).image;
  const aspect = img && img.width && img.height ? img.width / img.height : 3/4;

  // Adjust plane size to maintain aspect ratio within a reasonable bound
  const width = 3;
  const height = width / aspect;

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <planeGeometry args={[width, height, 32, 32]} />
      <fluidDistortionMaterial ref={materialRef} uTexture={texture} transparent />
    </mesh>
  );
}

export default function LuxuryImageDistortion({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="h-full w-full">
        <Suspense fallback={<div className="h-full w-full bg-[#101922] animate-pulse" />}>
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <Scene imageUrl={imageUrl} />
            </Canvas>
        </Suspense>
    </div>
  );
}
