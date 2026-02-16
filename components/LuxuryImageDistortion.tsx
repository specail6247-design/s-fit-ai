'use client';

import React, { useRef, Suspense } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { shaderMaterial, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const WaveShaderMaterial = shaderMaterial(
  { uTime: 0, uTexture: new THREE.Texture(), uHover: 0 },
  // vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  `
    precision mediump float;
    varying vec2 vUv;
    uniform float uTime;
    uniform sampler2D uTexture;
    uniform float uHover;

    void main() {
      vec2 uv = vUv;

      // Fluid distortion effect
      float wave = sin(uv.y * 10.0 + uTime) * 0.005 * uHover;
      float wave2 = cos(uv.x * 12.0 + uTime) * 0.005 * uHover;

      // Add some noise-like distortion for "heat haze" feel
      float noise = sin(uv.x * 20.0 + uTime * 2.0) * cos(uv.y * 20.0 + uTime * 2.0) * 0.002 * uHover;

      vec2 distortedUv = uv + vec2(wave + noise, wave2 + noise);

      vec4 color = texture2D(uTexture, distortedUv);

      // Add slight chromatic aberration on edges if hovering
      if (uHover > 0.0) {
        float r = texture2D(uTexture, distortedUv + vec2(0.002 * uHover, 0.0)).r;
        float b = texture2D(uTexture, distortedUv - vec2(0.002 * uHover, 0.0)).b;
        color.r = r;
        color.b = b;
      }

      gl_FragColor = color;
    }
  `
);

extend({ WaveShaderMaterial });

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      waveShaderMaterial: any;
    }
  }
}

function Scene({ image, hover }: { image: string; hover: boolean }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  const texture = useTexture(image);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.uTime += delta;
      ref.current.uHover = THREE.MathUtils.lerp(ref.current.uHover, hover ? 1 : 0, 0.1);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <waveShaderMaterial ref={ref} uTexture={texture} transparent />
    </mesh>
  );
}

export default function LuxuryImageDistortion({ image, hover = false }: { image: string; hover?: boolean }) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 1.5] }}>
        <Suspense fallback={null}>
          <Scene image={image} hover={hover} />
        </Suspense>
      </Canvas>
    </div>
  );
}
