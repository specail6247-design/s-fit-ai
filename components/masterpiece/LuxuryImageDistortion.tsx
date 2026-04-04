'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
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
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
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

  // Calculate distance to mouse
  float dist = distance(uv, uMouse);

  // Create ripple effect using noise
  float noise = snoise(uv * 10.0 + uTime * 0.5) * 0.02 * uHover;

  // Ripple strength based on mouse distance
  float strength = smoothstep(0.5, 0.0, dist);

  // Distort UVs
  vec2 distortedUv = uv + noise * strength;

  vec4 color = texture2D(uTexture, distortedUv);
  gl_FragColor = color;
}
`;

function DistortedImage({ imageUrl }: { imageUrl: string }) {
  const texture = useTexture(imageUrl);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  // Store target values for smooth interpolation
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const currentMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const targetHover = useRef(0);
  const currentHover = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 },
      uHover: { value: 0 },
    }),
    [texture]
  );

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;

      // Interpolate mouse position for smoothness
      currentMouse.current.lerp(targetMouse.current, 0.1);
      materialRef.current.uniforms.uMouse.value.copy(currentMouse.current);

      // Interpolate hover state for smooth transition
      currentHover.current = THREE.MathUtils.lerp(currentHover.current, targetHover.current, 0.1);
      materialRef.current.uniforms.uHover.value = currentHover.current;
    }
  });

  const handlePointerMove = (e: { uv?: THREE.Vector2 }) => {
    // Convert uv coordinates (0,1) to mouse uniforms
    if (e.uv) {
      targetMouse.current.set(e.uv.x, e.uv.y);
    }
  };

  const handlePointerOver = () => {
    targetHover.current = 1;
  };

  const handlePointerOut = () => {
    targetHover.current = 0;
  };

  return (
    <mesh
      onPointerMove={handlePointerMove}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function LuxuryImageDistortion({ imageUrl, className = "" }: { imageUrl: string, className?: string }) {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`} style={{ filter: 'saturate(0.9) contrast(1.1)' }}>
      <Canvas orthographic camera={{ position: [0, 0, 1], zoom: 1 }}>
        <React.Suspense fallback={null}>
          <DistortedImage imageUrl={imageUrl} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
