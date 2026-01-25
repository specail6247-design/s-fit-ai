'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame, extend, ReactThreeFiber, useThree } from '@react-three/fiber';
import { shaderMaterial, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Simplex noise function (glsl)
const noiseGLSL = `
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

const ImageDistortionMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
    uMouse: new THREE.Vector2(0, 0),
    uHover: 0,
    uResolution: new THREE.Vector2(1, 1),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform sampler2D uTexture;
    uniform vec2 uMouse;
    uniform float uHover;
    varying vec2 vUv;

    ${noiseGLSL}

    void main() {
      vec2 uv = vUv;

      // Calculate distance from mouse
      float dist = distance(uv, uMouse);

      // Ripple effect
      float noise = snoise(uv * 10.0 + uTime * 0.5);
      float ripple = sin(dist * 20.0 - uTime * 2.0) * 0.05 * uHover;

      // Liquid distortion
      vec2 distortedUV = uv + vec2(noise * 0.02 * uHover + ripple, noise * 0.02 * uHover + ripple);

      vec4 color = texture2D(uTexture, distortedUV);

      // Add slight shimmer
      float shimmer = snoise(uv * 20.0 - uTime) * 0.1 * uHover;
      color.rgb += shimmer;

      gl_FragColor = color;
    }
  `
);

extend({ ImageDistortionMaterial });

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      imageDistortionMaterial: ReactThreeFiber.Object3DNode<THREE.ShaderMaterial, typeof ImageDistortionMaterial>;
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

function Scene({ imageUrl, active }: { imageUrl: string; active: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(imageUrl);
  const { viewport } = useThree();

  useFrame(({ clock, pointer }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();

      const targetHover = active ? 1.0 : 0.0;
      materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHover.value,
        targetHover,
        0.1
      );

      // Map pointer to UV space (0-1) - pointer is -1 to 1
      const x = (pointer.x * 0.5) + 0.5;
      const y = (pointer.y * 0.5) + 0.5;

      materialRef.current.uniforms.uMouse.value.set(x, y);
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <imageDistortionMaterial
        ref={materialRef}
        uTexture={texture}
        transparent
      />
    </mesh>
  );
}

export default function LuxuryImageDistortion({ imageUrl, className }: { imageUrl: string; className?: string }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
        className={`relative w-full h-full overflow-hidden ${className}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
    >
      <Canvas camera={{ position: [0, 0, 1] }} gl={{ alpha: true }}>
        <React.Suspense fallback={null}>
            <Scene imageUrl={imageUrl} active={hovered} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
