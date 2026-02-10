"use client";

import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

function Scene({ imageUrl }: { imageUrl: string }) {
  const { viewport } = useThree();
  // Load texture
  const texture = useTexture(imageUrl);
  const meshRef = useRef<THREE.Mesh>(null);

  // Explicitly cast texture.image to HTMLImageElement to access dimensions
  const img = texture.image as HTMLImageElement;
  const imgAspect = img && img.width && img.height ? img.width / img.height : 1;

  // Calculate size to fit viewport while maintaining aspect ratio (contain)
  let width = viewport.width;
  let height = width / imgAspect;

  if (height > viewport.height) {
    height = viewport.height;
    width = height * imgAspect;
  }

  // Add some padding (90% of viewport max)
  width *= 0.9;
  height *= 0.9;

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uIntensity: { value: 0.1 }, // Distortion intensity
    }),
    [texture]
  );

  useFrame((state) => {
    if (meshRef.current) {
       const material = meshRef.current.material as THREE.ShaderMaterial;
       material.uniforms.uTime.value = state.clock.elapsedTime;
       // Subtle float effect
       meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uIntensity;

    void main() {
      vUv = uv;
      vec3 pos = position;
      // Gentle sine wave distortion on Z-axis based on Y-position and Time
      pos.z += sin(pos.y * 3.0 + uTime) * uIntensity;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform sampler2D uTexture;
    varying vec2 vUv;

    void main() {
      gl_FragColor = texture2D(uTexture, vUv);
    }
  `;

  return (
    <mesh ref={meshRef} scale={[width, height, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
}

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ecab13" wireframe />
    </mesh>
  );
}

export default function LuxuryImageDistortion({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={1} />
        <Suspense fallback={<Loader />}>
           {/* Key forces remount on image change to reset state/texture */}
          <Scene key={imageUrl} imageUrl={imageUrl} />
        </Suspense>
      </Canvas>
    </div>
  );
}
