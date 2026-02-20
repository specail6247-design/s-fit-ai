'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Vertex Shader
const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Fragment Shader (Liquid Distortion)
const fragmentShader = `
uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform float uTime;
uniform float uHover;
varying vec2 vUv;

// Simplex noise function (simplified)
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

  // Calculate distance from mouse (normalized)
  float dist = distance(uv, uMouse);

  // Create ripple effect based on mouse distance and time
  float noise = snoise(uv * 10.0 + uTime * 0.5);

  // Distortion intensity based on hover state and proximity
  float distortion = (1.0 - smoothstep(0.0, 0.5, dist)) * uHover * 0.05;

  // Apply distortion
  uv.x += noise * distortion;
  uv.y += noise * distortion;

  vec4 color = texture2D(uTexture, uv);
  gl_FragColor = color;
}
`;

interface SceneProps {
  imageSrc: string;
}

function Scene({ imageSrc }: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageSrc);
  const { viewport, mouse } = useThree();

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 },
      uHover: { value: 0 }, // 0 to 1
    }),
    [texture]
  );

  useFrame((state) => {
    if (meshRef.current) {
      // Update time
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.getElapsedTime();

      // Update mouse position (convert from -1..1 to 0..1)
      const mouseX = (mouse.x + 1) / 2;
      const mouseY = (mouse.y + 1) / 2;

      // Target values
      const targetHover = (Math.abs(mouse.x) < 0.9 && Math.abs(mouse.y) < 0.9) ? 1 : 0;

      // Smooth interpolation for hover and mouse
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uMouse.value.lerp(new THREE.Vector2(mouseX, mouseY), 0.1);
      material.uniforms.uHover.value = THREE.MathUtils.lerp(material.uniforms.uHover.value, targetHover, 0.05);
    }
  });

  // Adjust plane size to cover viewport while maintaining aspect ratio
  // Assuming the image is roughly 3:4 or similar portrait
  const scaleX = viewport.width;
  const scaleY = viewport.height;

  return (
    <mesh ref={meshRef} scale={[scaleX, scaleY, 1]}>
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

export default function LuxuryImageDistortion({ imageSrc }: { imageSrc: string }) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <React.Suspense fallback={null}>
            <Scene imageSrc={imageSrc} />
        </React.Suspense>
      </Canvas>
      {/* Loading Fallback if needed, though Suspense handles it */}
    </div>
  );
}
