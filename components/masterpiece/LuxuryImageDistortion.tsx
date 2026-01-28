import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const fragmentShader = `
uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform float uTime;
varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    float dist = distance(uv, uMouse);
    float strength = 0.1 * smoothstep(0.5, 0.0, dist);

    // Liquid effect
    float wave = sin(uv.y * 10.0 + uTime) * 0.01 + sin(uv.x * 10.0 + uTime * 0.5) * 0.01;

    vec2 distortedUv = uv + (uv - uMouse) * strength + vec2(wave);

    vec4 color = texture2D(uTexture, distortedUv);
    gl_FragColor = color;
}
`;

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

function DistortionPlane({ imageUrl }: { imageUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 },
    }),
    [texture]
  );

  useFrame((state) => {
    if (meshRef.current) {
        const material = meshRef.current.material as THREE.ShaderMaterial;
        material.uniforms.uTime.value = state.clock.getElapsedTime();
        const mouse = state.mouse;
        material.uniforms.uMouse.value.lerp(new THREE.Vector2((mouse.x + 1) / 2, (mouse.y + 1) / 2), 0.1);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[4, 5]} /> {/* Aspect ratio approx 4:5 */}
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
    <div className="w-full h-full min-h-[400px]">
      <Canvas camera={{ position: [0, 0, 3.5] }} gl={{ alpha: true }}>
        <Suspense fallback={null}>
            <DistortionPlane imageUrl={imageUrl} />
        </Suspense>
      </Canvas>
    </div>
  );
}
