"use client";

import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
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
uniform vec2 uMouse;
uniform float uTime;
varying vec2 vUv;

// Simplex noise or just sine waves for fluid distortion
void main() {
  vec2 uv = vUv;

  // Calculate distance from mouse pointer (mapped to UV space approx)
  // uMouse is -1 to 1. UV is 0 to 1.
  vec2 mouseUV = uMouse * 0.5 + 0.5;

  float dist = distance(uv, mouseUV);

  // Create a ripple/fluid effect
  // Strength decays with distance from mouse
  float hoverStrength = 0.05 * smoothstep(0.5, 0.0, dist);

  // Gentle ambient movement
  float ambientStrength = 0.005;

  float wave = sin(uv.y * 10.0 + uTime) * cos(uv.x * 10.0 + uTime);

  // Combine effects
  uv.x += wave * ambientStrength;
  uv.y += wave * ambientStrength;

  // Add interactive distortion
  uv += (uv - mouseUV) * hoverStrength * sin(uTime * 3.0);

  vec4 color = texture2D(uTexture, uv);

  // Add a subtle gold tint/vignette for luxury feel
  float vignette = smoothstep(1.5, 0.5, distance(vUv, vec2(0.5)));
  color.rgb = mix(color.rgb, color.rgb * vec3(1.0, 0.95, 0.8), 0.2); // Warm tint

  gl_FragColor = color;
}
`;

const DistortionMesh = ({ imageUrl }: { imageUrl: string }) => {
  const mesh = useRef<THREE.Mesh>(null);

  // Handle texture loading safely
  const texture = useTexture(imageUrl);

  // Fix aspect ratio of texture
  React.useEffect(() => {
    const t = texture as THREE.Texture;
    // eslint-disable-next-line react-hooks/immutability
    t.wrapS = THREE.ClampToEdgeWrapping;
    // eslint-disable-next-line react-hooks/immutability
    t.wrapT = THREE.ClampToEdgeWrapping;
    // eslint-disable-next-line react-hooks/immutability
    t.needsUpdate = true;
  }, [texture]);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uTime: { value: 0 },
    }),
    [texture]
  );

  useFrame((state) => {
    if (mesh.current) {
      const material = mesh.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();

      // Smoothly interpolate mouse position
      material.uniforms.uMouse.value.lerp(state.pointer, 0.1);
    }
  });

  return (
    <mesh ref={mesh}>
      {/* 4:5 Aspect Ratio Plane */}
      <planeGeometry args={[4, 5, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
};

export default function LuxuryImageDistortion({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="relative h-full w-full">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <Suspense fallback={null}>
          <DistortionMesh imageUrl={imageUrl} />
        </Suspense>
      </Canvas>
    </div>
  );
}
