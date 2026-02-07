'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Simplex Noise Shader Chunk
const snoise = `
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
`;

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

${snoise}

void main() {
  vec2 uv = vUv;

  // Liquid effect based on mouse distance
  float dist = distance(uv, uMouse);
  float decay = smoothstep(0.5, 0.0, dist);

  // Ripple effect
  float noise = snoise(uv * 10.0 + uTime * 0.5);
  vec2 distortion = vec2(noise * 0.02 * uHover * decay, noise * 0.02 * uHover * decay);

  vec4 color = texture2D(uTexture, uv + distortion);

  // Slight chromatic aberration on hover
  if(uHover > 0.0) {
      float r = texture2D(uTexture, uv + distortion + vec2(0.005 * uHover * decay, 0.0)).r;
      float b = texture2D(uTexture, uv + distortion - vec2(0.005 * uHover * decay, 0.0)).b;
      color.r = r;
      color.b = b;
  }

  gl_FragColor = color;
}
`;

function ImagePlane({ imageUrl }: { imageUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);
  const { viewport } = useThree();

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
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();

      // Smooth hover transition
      material.uniforms.uHover.value = THREE.MathUtils.lerp(
        material.uniforms.uHover.value,
        meshRef.current.userData.hover ? 1 : 0,
        0.1
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      scale={[viewport.width, viewport.height, 1]}
      onPointerMove={(e) => {
          if (meshRef.current) {
              const material = meshRef.current.material as THREE.ShaderMaterial;
              // Map UV coordinates (0-1)
              material.uniforms.uMouse.value.set(e.uv?.x ?? 0.5, e.uv?.y ?? 0.5);
          }
      }}
      onPointerOver={() => {
          if(meshRef.current) meshRef.current.userData.hover = true;
      }}
      onPointerOut={() => {
          if(meshRef.current) meshRef.current.userData.hover = false;
      }}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

export default function LuxuryImageDistortion({ imageUrl, className }: { imageUrl: string; className?: string }) {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ preserveDrawingBuffer: true, alpha: true }}
      >
        <React.Suspense fallback={null}>
            <ImagePlane imageUrl={imageUrl} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
