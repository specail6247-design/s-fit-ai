import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uTime;
uniform float uHoverState;
varying vec2 vUv;

// Simplex 2D noise
// ...
// Add standard noise function here for brevity I'll just use a sine wave

void main() {
  vec2 uv = vUv;

  // distortion
  float distortion = sin(uv.y * 10.0 + uTime * 2.0) * 0.05 * uHoverState;
  uv.x += distortion;

  vec4 color = texture2D(uTexture, uv);
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

const ShaderPlane = ({ imageUrl, hoverState }: { imageUrl: string; hoverState: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uHoverState: { value: 0 },
    }),
    [texture]
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      // Smoothly interpolate hover state
      material.uniforms.uHoverState.value = THREE.MathUtils.lerp(
        material.uniforms.uHoverState.value,
        hoverState,
        0.1
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 3, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export const LuxuryImageDistortion = ({ imageUrl }: { imageUrl: string }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      className="w-full h-full aspect-[2/3] cursor-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <React.Suspense fallback={null}>
          <ShaderPlane imageUrl={imageUrl} hoverState={hovered ? 1 : 0} />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

export default LuxuryImageDistortion;
