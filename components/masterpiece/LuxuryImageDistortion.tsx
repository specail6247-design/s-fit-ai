'use client';

import React, { useRef } from 'react';
import { useFrame, extend, ReactThreeFiber } from '@react-three/fiber';
import { useTexture, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Shader Material
const ImageDistortionMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: null,
    uHover: 0,
    uMouse: new THREE.Vector2(0.5, 0.5),
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
    uniform float uHover;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
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

      // Liquid effect on hover
      float noise = snoise(uv * 3.0 + uTime * 0.5);
      vec2 distortedUv = uv + vec2(noise * 0.05 * uHover, noise * 0.05 * uHover);

      // Ripple effect from mouse interaction
      float dist = distance(uv, uMouse);
      float ripple = sin(dist * 20.0 - uTime * 2.0) * 0.02 * uHover;
      distortedUv += ripple;

      vec4 color = texture2D(uTexture, distortedUv);

      // Add slight shimmer
      color.rgb += vec3(noise * 0.1 * uHover);

      gl_FragColor = color;
    }
  `
);

extend({ ImageDistortionMaterial });

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      imageDistortionMaterial: ReactThreeFiber.Object3DNode<THREE.ShaderMaterial, typeof ImageDistortionMaterial>;
    }
  }
}

interface LuxuryImageDistortionProps {
  imageUrl: string;
  width?: number;
  height?: number;
}

export default function LuxuryImageDistortion({ imageUrl, width = 3, height = 4 }: LuxuryImageDistortionProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(imageUrl);
  const hoverValue = useRef(0);
  const isHovered = useRef(false);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();

      // Smooth lerp for hover effect
      const targetHover = isHovered.current ? 1.0 : 0.0;
      hoverValue.current = THREE.MathUtils.lerp(hoverValue.current, targetHover, delta * 5);
      materialRef.current.uniforms.uHover.value = hoverValue.current;
    }
  });

  return (
    <mesh
      onPointerMove={(e) => {
        isHovered.current = true;
        if (materialRef.current) {
           materialRef.current.uniforms.uMouse.value.set(e.uv?.x ?? 0.5, e.uv?.y ?? 0.5);
        }
      }}
      onPointerLeave={() => {
         isHovered.current = false;
      }}
    >
      <planeGeometry args={[width, height, 32, 32]} />
      <imageDistortionMaterial
        ref={materialRef}
        uTexture={texture}
        transparent
      />
    </mesh>
  );
}
