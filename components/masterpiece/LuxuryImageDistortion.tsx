'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree, ThreeEvent } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

/* eslint-disable react-hooks/exhaustive-deps */

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
uniform vec2 uMouse;
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

  // Mouse influence
  float dist = distance(uv, uMouse);
  float decay = smoothstep(0.6, 0.0, dist);

  // Ripple effect
  float noise = snoise(uv * 8.0 - uTime * 0.3);

  // Distort UV
  vec2 distortedUv = uv + vec2(noise * 0.03 * uHover * decay, noise * 0.03 * uHover * decay);

  vec4 color = texture2D(uTexture, distortedUv);

  // Add slight silk sheen
  float sheen = smoothstep(0.3, 0.7, noise) * 0.15 * uHover * decay;
  color.rgb += sheen;

  gl_FragColor = color;
}
`;

function DistortionPlane({ imageUrl }: { imageUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);
  const { viewport } = useThree();
  const [hover, setHover] = useState(false);

  const imgAspect = texture.image ? texture.image.width / texture.image.height : 1;
  const viewportAspect = viewport.width / viewport.height;

  // Calculate scale to cover viewport
  let scaleX, scaleY;
  if (viewportAspect > imgAspect) {
     scaleX = viewport.width;
     scaleY = viewport.width / imgAspect;
  } else {
     scaleY = viewport.height;
     scaleX = viewport.height * imgAspect;
  }

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uHover: { value: 0 },
    }),
    [texture]
  );

  useFrame((state) => {
    if (meshRef.current) {
        uniforms.uTime.value = state.clock.getElapsedTime();
        uniforms.uHover.value = THREE.MathUtils.lerp(
            uniforms.uHover.value,
            hover ? 1 : 0,
            0.1
        );
    }
  });

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
     // UV coordinates are 0..1 on the mesh.
     if (e.uv) {
        uniforms.uMouse.value.x = e.uv.x;
        uniforms.uMouse.value.y = e.uv.y;
     }
  };

  return (
    <mesh
      ref={meshRef}
      scale={[scaleX, scaleY, 1]}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onPointerMove={handlePointerMove}
    >
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

export default function LuxuryImageDistortion({ imageUrl, className }: { imageUrl: string, className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ width: '100%', height: '100%' }}
        dpr={[1, 2]}
      >
        <React.Suspense fallback={null}>
           <DistortionPlane imageUrl={imageUrl} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
