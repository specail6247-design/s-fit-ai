'use client';

import React, { useRef, useMemo, Suspense } from 'react';
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
uniform vec2 uMouse;
uniform float uTime;
uniform float uHover;
varying vec2 vUv;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;

  // Distortion effect based on mouse and noise
  float noise = snoise(uv * 3.0 + uTime * 0.2);
  float dist = distance(uv, uMouse);
  // Only distort near mouse
  float strength = uHover * (1.0 - smoothstep(0.0, 0.4, dist));

  uv.x += noise * strength * 0.02;
  uv.y += noise * strength * 0.02;

  vec4 color = texture2D(uTexture, uv);
  gl_FragColor = color;
}
`;

function Scene({ image }: { image: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(image);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 },
      uHover: { value: 0 },
    }),
    [texture]
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();

      // Interpolate hover value towards 1.0 if mouse is active (simple heuristic)
      // In a real app we might pass hover state from parent, but here we use pointer activity
      // Or we can assume 'hover' is when the mouse is over the canvas, which R3F handles
      // But let's just use constant subtle motion + mouse interaction

      const isHovering = state.pointer.x > -0.9 && state.pointer.x < 0.9 && state.pointer.y > -0.9 && state.pointer.y < 0.9;

      material.uniforms.uHover.value = THREE.MathUtils.lerp(
        material.uniforms.uHover.value,
        isHovering ? 1.0 : 0.0,
        0.1
      );

      // Convert R3F pointer (-1 to 1) to UV space (0 to 1)
      const x = (state.pointer.x + 1) / 2;
      const y = (state.pointer.y + 1) / 2;
      material.uniforms.uMouse.value.set(x, y);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[4, 5, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

export default function LuxuryImageDistortion({ image, className }: { image: string; className?: string }) {
  return (
    <div className={`relative w-full h-full ${className}`}>
        <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }}>
          <Suspense fallback={null}>
            <Scene image={image} />
          </Suspense>
        </Canvas>
    </div>
  );
}
