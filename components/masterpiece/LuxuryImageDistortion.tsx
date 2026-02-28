"use client";

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
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
uniform float uTime;
uniform sampler2D uTexture;
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

  // Fluid distortion based on noise
  float noise = snoise(uv * 3.0 + uTime * 0.2);
  float distortionStrength = mix(0.01, 0.05, uHover);

  // Subtle wave distortion
  uv.x += noise * distortionStrength;
  uv.y += snoise(uv * 2.0 - uTime * 0.1) * distortionStrength;

  // Create a slight chromatic aberration effect on hover
  float ca = uHover * 0.01;
  vec4 colorTexR = texture2D(uTexture, uv + vec2(ca, 0.0));
  vec4 colorTexG = texture2D(uTexture, uv);
  vec4 colorTexB = texture2D(uTexture, uv - vec2(ca, 0.0));

  vec4 color = vec4(colorTexR.r, colorTexG.g, colorTexB.b, 1.0);

  // Apply vogue aesthetic (saturate and contrast)
  // Contrast
  color.rgb = (color.rgb - 0.5) * 1.1 + 0.5;
  // Saturation
  vec3 luminanceWeighting = vec3(0.2125, 0.7154, 0.0721);
  float luminance = dot(color.rgb, luminanceWeighting);
  color.rgb = mix(vec3(luminance), color.rgb, 0.9);

  gl_FragColor = color;
}
`;

function FluidDistortionMesh({ imageUrl, isHovered }: { imageUrl: string, isHovered: boolean }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(imageUrl);

  // Use memo to ensure uniforms object remains stable
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uTexture: { value: texture },
    uHover: { value: 0 }
  }), [texture]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Smoothly animate hover state
      const targetHover = isHovered ? 1.0 : 0.0;
      materialRef.current.uniforms.uHover.value += (targetHover - materialRef.current.uniforms.uHover.value) * 0.1;
    }
  });

  return (
    <mesh>
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

export function LuxuryImageDistortion({ imageUrl, className, isHovered = false }: { imageUrl: string, className?: string, isHovered?: boolean }) {
  return (
    <div className={className}>
      <Canvas style={{ width: '100%', height: '100%' }} gl={{ preserveDrawingBuffer: true }}>
         <React.Suspense fallback={null}>
           <FluidDistortionMesh imageUrl={imageUrl} isHovered={isHovered} />
         </React.Suspense>
      </Canvas>
    </div>
  );
}

export default LuxuryImageDistortion;
