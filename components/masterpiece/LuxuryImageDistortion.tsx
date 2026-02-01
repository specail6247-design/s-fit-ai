"use client";

import React, { Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useTexture, MeshDistortMaterial } from "@react-three/drei";


interface LuxuryImageDistortionProps {
  imageUrl: string;
}

function DistortedImage({ imageUrl }: { imageUrl: string }) {
  const texture = useTexture(imageUrl);
  const { viewport } = useThree();

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <MeshDistortMaterial
        map={texture}
        speed={1.5}
        distort={0.15}
        radius={1}
      />
    </mesh>
  );
}

export default function LuxuryImageDistortion({ imageUrl }: LuxuryImageDistortionProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.5} />
        <Suspense fallback={null}>
          <DistortedImage imageUrl={imageUrl} />
        </Suspense>
      </Canvas>
    </div>
  );
}
