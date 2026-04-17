"use client";

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

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
  uniform float uHover;
  varying vec2 vUv;

  float random (in vec2 _st) { return fract(sin(dot(_st.xy, vec2(12.9898,78.233))) * 43758.5453123); }
  float noise (in vec2 _st) {
      vec2 i = floor(_st); vec2 f = fract(_st);
      float a = random(i); float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0)); float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 uv = vUv;
    vec2 noiseVec = vec2(noise(uv * 10.0 + uTime * 0.5), noise(uv * 10.0 - uTime * 0.5));
    uv += noiseVec * 0.05 * uHover;
    vec4 texColor = texture2D(uTexture, uv);
    texColor.rgb = (texColor.rgb - 0.5) * 1.1 + 0.5;
    float lum = dot(texColor.rgb, vec3(0.2126, 0.7152, 0.0722));
    texColor.rgb = mix(vec3(lum), texColor.rgb, 0.9);
    gl_FragColor = texColor;
  }
`;

const Scene = ({ imageUrl }: { imageUrl: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(imageUrl);
  const [hovered, setHover] = useState(false);
  const targetHover = useRef(0);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      targetHover.current = THREE.MathUtils.lerp(targetHover.current, hovered ? 1 : 0, 0.05);
      materialRef.current.uniforms.uHover.value = targetHover.current;
    }
  });

  const uniforms = useMemo(() => ({
    uTexture: { value: texture }, uTime: { value: 0 }, uHover: { value: 0 }
  }), [texture]);

  return (
    <mesh ref={meshRef} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
      <planeGeometry args={[2, 2.5]} />
      <shaderMaterial ref={materialRef} vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
    </mesh>
  );
};

export default function LuxuryImageDistortion({ imageUrl, className }: { imageUrl: string; className?: string }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
        <Scene imageUrl={imageUrl} />
      </Canvas>
    </div>
  );
}
