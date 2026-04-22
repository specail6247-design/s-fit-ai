"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ImageDistortionProps {
  imageUrl: string;
}

function DistortionMesh({ imageUrl }: ImageDistortionProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const texture = useMemo(() => {
    return new THREE.TextureLoader().load(imageUrl);
  }, [imageUrl]);

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
      material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[5, 7, 32, 32]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          uniform float uTime;
          void main() {
            vUv = uv;
            vec3 pos = position;
            pos.z += sin(pos.x * 2.0 + uTime) * 0.1;
            pos.z += cos(pos.y * 2.0 + uTime) * 0.1;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform sampler2D uTexture;
          void main() {
            vec4 texColor = texture2D(uTexture, vUv);
            gl_FragColor = texColor;
          }
        `}
      />
    </mesh>
  );
}

export default function LuxuryImageDistortion({ imageUrl }: ImageDistortionProps) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <DistortionMesh imageUrl={imageUrl} />
      </Canvas>
    </div>
  );
}
