'use client';

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader, extend, useThree, ReactThreeFiber } from '@react-three/fiber';
import { TextureLoader, Vector2, Color } from 'three';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';

// Shader Material Definition
const WaveShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new Color(0.0, 0.0, 0.0),
    uTexture: new THREE.Texture(),
    uMouse: new Vector2(0.5, 0.5),
    uHover: 0,
    uResolution: new Vector2(1, 1),
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

    // Simplex noise
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

      float noise = snoise(uv * 3.0 + uTime * 0.2);

      // Calculate distance from mouse (uMouse is 0..1, uv is 0..1)
      float dist = distance(uv, uMouse);

      // Ripple effect
      float ripple = sin(dist * 20.0 - uTime * 2.0) * 0.01;

      // Combine noise and ripple based on hover
      float distortion = noise * 0.02 * uHover + ripple * smoothstep(0.5, 0.0, dist) * uHover * 2.0;

      vec2 distortedUV = uv + vec2(distortion);

      vec4 color = texture2D(uTexture, distortedUV);

      // Slight chromatic aberration on edges
      float r = texture2D(uTexture, distortedUV + vec2(0.002 * uHover, 0.0)).r;
      float g = texture2D(uTexture, distortedUV).g;
      float b = texture2D(uTexture, distortedUV - vec2(0.002 * uHover, 0.0)).b;

      gl_FragColor = vec4(r, g, b, color.a);
    }
  `
);

extend({ WaveMaterial: WaveShaderMaterial });

// Add type definition to intrinsic elements
declare module '@react-three/fiber' {
  interface ThreeElements {
    waveMaterial: any;
  }
}

function ImagePlane({ imageUrl }: { imageUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null); // Using any to avoid strict type issues with custom shader material props
  const texture = useLoader(TextureLoader, imageUrl);
  const { viewport } = useThree();
  const hoverValue = useRef(0);

  // Calculate aspect ratio to cover (object-fit: cover equivalent)
  const imageAspect = texture.image.width / texture.image.height;
  const viewportAspect = viewport.width / viewport.height;

  let scaleX = viewport.width;
  let scaleY = viewport.height;

  if (imageAspect > viewportAspect) {
     // Image is wider than viewport
     // scaleX = viewport.height * imageAspect;
  } else {
     // Image is taller than viewport
     // scaleY = viewport.width / imageAspect;
  }
  // Actually, for a simple plane filling the canvas, we just use viewport size and let the texture stretch or UV map handle it.
  // But to simulate "cover", we should adjust UVs or scale the plane.
  // For simplicity here, we'll stretch the plane to viewport and let the distortion happen.

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.getElapsedTime();

      // Mouse position (0 to 1)
      const targetX = (state.pointer.x + 1) / 2;
      const targetY = (state.pointer.y + 1) / 2;

      materialRef.current.uMouse.x += (targetX - materialRef.current.uMouse.x) * 0.1;
      materialRef.current.uMouse.y += (targetY - materialRef.current.uMouse.y) * 0.1;

      // Smooth hover transition
      materialRef.current.uHover += (hoverValue.current - materialRef.current.uHover) * 0.1;
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => (hoverValue.current = 1)}
      onPointerOut={() => (hoverValue.current = 0)}
    >
      <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
      <waveMaterial
        ref={materialRef}
        key={WaveShaderMaterial.key}
        uTexture={texture}
        transparent
      />
    </mesh>
  );
}

export default function LuxuryImageDistortion({ imageUrl, className }: { imageUrl: string, className?: string }) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <ImagePlane imageUrl={imageUrl} />
        </Suspense>
      </Canvas>
    </div>
  );
}
