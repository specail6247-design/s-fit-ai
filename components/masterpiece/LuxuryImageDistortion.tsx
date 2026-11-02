"use client"

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

const fragmentShader = `
uniform float uTime;
uniform sampler2D uTexture;
uniform vec2 uHover;
uniform float uHoverIntensity;
varying vec2 vUv;

// Simplex 2D noise
// Source: https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
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

  // Basic ripple based on distance to hover
  float dist = distance(uv, uHover);

  // Fluid distortion
  float noise = snoise(vec2(uv.x * 3.0 + uTime * 0.2, uv.y * 3.0 + uTime * 0.2));

  float ripple = sin(dist * 20.0 - uTime * 5.0) * 0.05 * uHoverIntensity;

  // Combine noise and ripple
  vec2 distortedUv = uv + vec2(noise * 0.05 * uHoverIntensity, ripple + noise * 0.05 * uHoverIntensity);

  // Keep within bounds
  distortedUv = clamp(distortedUv, 0.0, 1.0);

  // Color grading: saturate(0.9) contrast(1.1)
  vec4 color = texture2D(uTexture, distortedUv);

  // Contrast
  color.rgb = (color.rgb - 0.5) * 1.1 + 0.5;

  // Saturation
  float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  color.rgb = mix(vec3(luminance), color.rgb, 0.9);

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

function Scene({ imageUrl, isHovered, mousePos }: { imageUrl: string, isHovered: boolean, mousePos: {x: number, y: number} }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(imageUrl);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uTexture: { value: texture },
    uHover: { value: new THREE.Vector2(0.5, 0.5) },
    uHoverIntensity: { value: 0.0 }
  }), [texture]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

      // Target intensity based on hover state
      const targetIntensity = isHovered ? 1.0 : 0.0;
      materialRef.current.uniforms.uHoverIntensity.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHoverIntensity.value,
        targetIntensity,
        0.05
      );

      // Update hover position if hovered
      if (isHovered) {
         materialRef.current.uniforms.uHover.value.lerp(new THREE.Vector2(mousePos.x, mousePos.y), 0.1);
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function LuxuryImageDistortion({ imageUrl }: { imageUrl: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Normalize to 0-1
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1.0 - ((e.clientY - rect.top) / rect.height); // WebGL y is inverted
    setMousePos({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden rounded-xl"
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onPointerMove={handlePointerMove}
    >
       <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <React.Suspense fallback={null}>
            <Scene imageUrl={imageUrl} isHovered={isHovered} mousePos={mousePos} />
          </React.Suspense>
       </Canvas>
    </div>
  )
}
