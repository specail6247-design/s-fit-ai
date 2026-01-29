"use client";

import React, { useRef, useMemo } from "react";
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

  // Gentle fluid distortion
  float wave = sin(uv.y * 5.0 + uTime) * 0.002 + sin(uv.x * 5.0 + uTime * 0.5) * 0.002;
  uv.x += wave;
  uv.y += wave;

  vec4 color = texture2D(uTexture, uv);

  // Slight gold tint vignette for luxury feel
  float dist = distance(uv, vec2(0.5));
  vec3 gold = vec3(0.83, 0.68, 0.21);
  color.rgb = mix(color.rgb, gold, dist * 0.15);

  // Increase contrast slightly
  color.rgb = (color.rgb - 0.5) * 1.1 + 0.5;

  gl_FragColor = color;
}
`;

function DistortionPlane({ imageUrl }: { imageUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);
  const { viewport } = useThree();

  const imgRatio = texture.image ? texture.image.width / texture.image.height : 1;
  const viewportRatio = viewport.width / viewport.height;

  // "Contain" logic to ensure the whole garment is visible without cropping too much,
  // or "Cover" if we want immersive. Let's go with a balanced approach (Cover-ish but safe).
  // Actually for product view, "Contain" might be safer, but "Cover" looks more immersive.
  // Let's use logic to fit within viewport with some padding if needed, or fill.
  // The prompt asked for "Product cards should be larger... main product visual".
  // Assuming this component takes the full screen or a large container.

  let width, height;
  // Cover logic
  if (imgRatio > viewportRatio) {
     height = viewport.height;
     width = height * imgRatio;
  } else {
     width = viewport.width;
     height = width / imgRatio;
  }
  // If we want to ensure it's not too zoomed in, we can scale down slightly
  const scale = 0.95;

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
    }),
    [texture]
  );

  useFrame((state) => {
    if (meshRef.current) {
       // @ts-expect-error - Uniforms are added dynamically to the shader material
       meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} scale={[scale, scale, 1]}>
      <planeGeometry args={[width, height]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
}

export default function LuxuryImageDistortion({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="h-full w-full bg-gradient-to-b from-[#1a1a1a] to-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
          <React.Suspense fallback={null}>
             <DistortionPlane imageUrl={imageUrl} />
          </React.Suspense>
      </Canvas>
    </div>
  );
}
