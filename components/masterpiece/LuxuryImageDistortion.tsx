"use client";
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const DistortionShaderMaterial = {
  uniforms: {
    uTexture: { value: null },
    uTime: { value: 0 },
    uHoverState: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform float uHoverState;
    varying vec2 vUv;

    void main() {
      vec2 p = vUv;
      float x = uHoverState;
      x = smoothstep(0.0, 1.0, (x * 2.0 + p.y - 1.0));
      vec4 f = mix(
        texture2D(uTexture, (p - 0.5) * (1.0 - x * 0.1) + 0.5),
        texture2D(uTexture, (p - 0.5) * x + 0.5),
        x
      );

      vec2 waveUv = vUv;
      waveUv.y += sin(waveUv.x * 10.0 + uTime) * 0.01 * uHoverState;
      vec4 waveTex = texture2D(uTexture, waveUv);

      gl_FragColor = mix(f, waveTex, uHoverState * 0.5);
    }
  `
};

function DistortionMesh({ imageUrl }: { imageUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [texture] = useLoader(THREE.TextureLoader, [imageUrl]);
  const [hovered, setHover] = React.useState(false);

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uTime: { value: 0 },
    uHoverState: { value: 0 }
  }), [texture]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uHoverState.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHoverState.value,
        hovered ? 1 : 0,
        0.05
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <planeGeometry args={[5, 7, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={DistortionShaderMaterial.vertexShader}
        fragmentShader={DistortionShaderMaterial.fragmentShader}
      />
    </mesh>
  );
}

export default function LuxuryImageDistortion({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <Canvas camera={{ position: [0, 0, 4], fov: 75 }}>
        <React.Suspense fallback={null}>
          <DistortionMesh imageUrl={imageUrl} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
