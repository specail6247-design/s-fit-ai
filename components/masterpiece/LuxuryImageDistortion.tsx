"use client";

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image } from '@react-three/drei';
import * as THREE from 'three';

interface LuxuryImageDistortionProps {
  imageUrl: string;
}

function DistortedPlane({ imageUrl }: { imageUrl: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (ref.current) {
        // Subtle floating motion
        const t = state.clock.getElapsedTime();
        ref.current.position.y = Math.sin(t * 0.5) * 0.05;

        // Tilt effect based on mouse position (normalized) could be added here
        // but sticking to simple elegance
    }
  });

  return (
    <Image
      ref={ref}
      url={imageUrl}
      alt="Luxury Item"
      transparent
      scale={hovered ? 1.05 : 1}
      zoom={hovered ? 1.1 : 1}
      grayscale={hovered ? 0 : 0.1} // Slight noir feel when not hovered
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    />
  );
}

export default function LuxuryImageDistortion({ imageUrl }: LuxuryImageDistortionProps) {
  return (
    <div className="h-full w-full relative min-h-[400px]">
      <Canvas camera={{ position: [0, 0, 4], fov: 35 }} dpr={[1, 2]}>
        <DistortedPlane imageUrl={imageUrl} />
      </Canvas>
    </div>
  );
}
