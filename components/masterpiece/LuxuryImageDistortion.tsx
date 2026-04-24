'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D tDiffuse;
uniform float uTime;
uniform vec2 uHover;
uniform float uHoverState;
varying vec2 vUv;

// Simplex 2D noise
// https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
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

  // Calculate distance from hover position
  float dist = distance(uv, uHover);

  // Apply distortion only when hovering
  float distortionStrength = uHoverState * smoothstep(0.5, 0.0, dist) * 0.05;

  // Create flowing silk/liquid effect using simplex noise
  float noise = snoise(vec2(uv.x * 5.0, uv.y * 5.0 - uTime * 0.5));

  uv.x += noise * distortionStrength;
  uv.y += noise * distortionStrength;

  vec4 color = texture2D(tDiffuse, uv);

  // Color grading: saturate(0.9) contrast(1.1)
  // Approximate color grading in shader
  const vec3 W = vec3(0.2125, 0.7154, 0.0721);
  vec3 intensity = vec3(dot(color.rgb, W));

  // Contrast (1.1)
  color.rgb = ((color.rgb - 0.5) * 1.1) + 0.5;

  // Saturation (0.9)
  color.rgb = mix(intensity, color.rgb, 0.9);

  gl_FragColor = color;
}
`;

function FluidImage({ imageUrl }: { imageUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Create a placeholder texture while loading
  const placeholderCanvas = document.createElement('canvas');
  placeholderCanvas.width = 2;
  placeholderCanvas.height = 2;
  const ctx = placeholderCanvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, 2, 2);
  }
  const defaultTexture = new THREE.CanvasTexture(placeholderCanvas);

  // useTexture handles suspense natively
  const texture = useTexture(imageUrl);

  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState(new THREE.Vector2(0.5, 0.5));
  const targetHoverState = useRef(0);

  const uniforms = useMemo(
    () => ({
      tDiffuse: { value: texture },
      uTime: { value: 0 },
      uHover: { value: new THREE.Vector2(0.5, 0.5) },
      uHoverState: { value: 0 },
    }),
    [texture]
  );

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;

      // Smoothly interpolate hover state
      targetHoverState.current = THREE.MathUtils.lerp(
        targetHoverState.current,
        hovered ? 1 : 0,
        0.1
      );
      materialRef.current.uniforms.uHoverState.value = targetHoverState.current;

      // Smoothly interpolate mouse position
      materialRef.current.uniforms.uHover.value.lerp(mousePos, 0.1);
    }
  });

  const handlePointerMove = (e: import('@react-three/fiber').ThreeEvent<PointerEvent>) => {
    // Convert pointer coords to 0-1 range for shader
    if (!e.uv) return;
    const x = e.uv.x;
    const y = e.uv.y;
    setMousePos(new THREE.Vector2(x, y));
  };

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerMove={handlePointerMove}
    >
      <planeGeometry args={[2, 2, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

interface LuxuryImageDistortionProps {
  imageUrl: string;
  className?: string;
  alt?: string;
}

export default function LuxuryImageDistortion({ imageUrl, className = '' }: LuxuryImageDistortionProps) {
  return (
    <div className={`relative w-full h-full overflow-hidden bg-zinc-900 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <FluidImage imageUrl={imageUrl} />
      </Canvas>
      {/* Fallback image to set aspect ratio or for non-WebGL environments */}
      {/* The pointer-events-none ensures mouse events go to the canvas */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-0"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
    </div>
  );
}
