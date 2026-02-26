'use client';

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { useTexture, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Define the shader material
const FluidDistortionMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uTexture: new THREE.Texture(), // Placeholder
    uHover: 0,
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
    uniform vec2 uMouse;
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

      // Calculate distance from mouse (in UV space)
      float dist = distance(uv, uMouse);

      // Create a wave effect based on time and noise
      float noise = snoise(uv * 5.0 + uTime * 0.5);

      // Distortion strength is highest near mouse
      // uHover will transition from 0 to 1
      float distortion = uHover * noise * 0.02 * (1.0 - smoothstep(0.0, 0.4, dist));

      vec2 distortedUv = uv + vec2(distortion);

      vec4 color = texture2D(uTexture, distortedUv);

      // --- VOGUE AESTHETIC GRADING ---
      // Saturation (0.9) - slightly desaturated
      // Standard Rec.709 luma coefficients
      float gray = dot(color.rgb, vec3(0.2126, 0.7152, 0.0722));
      color.rgb = mix(vec3(gray), color.rgb, 0.9);

      // Contrast (1.1)
      color.rgb = (color.rgb - 0.5) * 1.1 + 0.5;

      gl_FragColor = color;
    }
  `
);

// Register the custom material
extend({ FluidDistortionMaterial });

// Add type definition for the custom element to avoid TS errors
declare module '@react-three/fiber' {
  interface ThreeElements {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fluidDistortionMaterial: any;
  }
}

interface ImageMeshProps {
  imageSrc: string;
}

function ImageMesh({ imageSrc }: ImageMeshProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const materialRef = useRef<any>(null);
  const texture = useTexture(imageSrc);

  // Use refs for animation state to avoid re-renders
  const hoverState = useRef(0); // 0 = out, 1 = hover
  const mousePos = useRef(new THREE.Vector2(0.5, 0.5));
  const targetMousePos = useRef(new THREE.Vector2(0.5, 0.5));

  // Animate uniforms
  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;

      // Smoothly interpolate hover intensity
      // If we are hovering (hoverState.current is 1), approach 1
      // If not, approach 0
      // simple lerp: current = current + (target - current) * factor
      const targetHover = hoverState.current;
      materialRef.current.uHover = THREE.MathUtils.lerp(
        materialRef.current.uHover,
        targetHover,
        delta * 5
      );

      // Smoothly interpolate mouse position
      mousePos.current.lerp(targetMousePos.current, delta * 5);
      materialRef.current.uMouse.copy(mousePos.current);
    }
  });

  return (
    <mesh
      onPointerOver={() => { hoverState.current = 1; }}
      onPointerOut={() => { hoverState.current = 0; }}
      onPointerMove={(e) => {
        // e.uv contains the UV coordinates of the intersection [0, 1]
        if (e.uv) {
          targetMousePos.current.copy(e.uv);
        }
      }}
    >
      <planeGeometry args={[3, 4, 32, 32]} /> {/* Aspect ratio approx 3:4 */}
      {/*
        // @ts-ignore - Custom shader material
      */}
      <fluidDistortionMaterial
        ref={materialRef}
        uTexture={texture}
        transparent
      />
    </mesh>
  );
}

export default function LuxuryImageDistortion({ imageSrc }: { imageSrc: string }) {
  return (
    <div className="w-full h-full relative bg-transparent">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <ImageMesh imageSrc={imageSrc} />
        </Suspense>
      </Canvas>
    </div>
  );
}
