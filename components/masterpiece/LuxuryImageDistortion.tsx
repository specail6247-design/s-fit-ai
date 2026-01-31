"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { MeshDistortMaterial, useTexture, Float } from "@react-three/drei";
import * as THREE from "three";

function DistortedImage({ imageUrl }: { imageUrl: string }) {
  const texture = useTexture(imageUrl);

  // Ensure texture encoding is correct for R3F
  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh>
        <planeGeometry args={[3, 4, 32, 32]} />
        <MeshDistortMaterial
          map={texture}
          speed={1.5}
          distort={0.2} // subtle distortion
          radius={1}
        />
      </mesh>
    </Float>
  );
}

export default function LuxuryImageDistortion({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="h-full w-full relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
            <DistortedImage imageUrl={imageUrl} />
        </Suspense>
      </Canvas>

      {/* Fallback/Loading overlay if needed, though Suspense handles the texture load */}
    </div>
  );
}
