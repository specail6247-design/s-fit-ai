"use client";

import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uTime;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  float wave = sin(uv.y * 5.0 + uTime * 0.5) * 0.002;
  float wave2 = cos(uv.x * 4.0 + uTime * 0.3) * 0.002;

  uv.x += wave;
  uv.y += wave2;

  vec4 color = texture2D(uTexture, uv);
  gl_FragColor = color;
}
`;

const FullScreenPlane = ({ imageUrl }: { imageUrl: string }) => {
  const { viewport } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);
  const textureOriginal = useTexture(imageUrl);

  const texture = useMemo(() => {
    const t = textureOriginal.clone();
    t.wrapS = THREE.MirroredRepeatWrapping;
    t.wrapT = THREE.MirroredRepeatWrapping;
    // Ensure linear encoding/filtering for best look
    t.minFilter = THREE.LinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.needsUpdate = true;
    return t;
  }, [textureOriginal]);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
    }),
    [texture]
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
};

export default function LuxuryImageDistortion({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="absolute inset-0 h-full w-full pointer-events-none">
      <Canvas orthographic camera={{ zoom: 1, position: [0, 0, 100] }}>
        <Suspense fallback={null}>
          <FullScreenPlane imageUrl={imageUrl} />
        </Suspense>
      </Canvas>
    </div>
  );
}
