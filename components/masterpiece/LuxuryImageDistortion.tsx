"use client";

import React, { useRef } from "react";
import { Canvas, useFrame, extend, ThreeElement } from "@react-three/fiber";
import { shaderMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";

// Shader Material Definition
const LuxuryDistortionMaterial = shaderMaterial(
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
  // Fragment Shader (Fluid/Silk Distortion)
  `
    uniform float uTime;
    uniform sampler2D uTexture;
    uniform vec2 uMouse;
    uniform float uHover;
    uniform vec2 uResolution;
    varying vec2 vUv;

    // Simplex noise function
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

      // Mouse interaction
      vec2 mouseDist = uv - uMouse;
      float dist = length(mouseDist);

      // Ripple/Liquid effect
      float noise = snoise(uv * 10.0 - uTime * 0.5);
      float distortion = uHover * 0.05 * noise * smoothstep(0.5, 0.0, dist);

      // Apply distortion to UV
      vec2 distortedUV = uv + vec2(distortion);

      // Color grading (Saturate 0.9, Contrast 1.1)
      vec4 color = texture2D(uTexture, distortedUV);

      // Saturation
      float luminance = dot(color.rgb, vec3(0.2126, 0.7152, 0.0722));
      vec3 gray = vec3(luminance);
      color.rgb = mix(gray, color.rgb, 0.9); // Saturate 0.9

      // Contrast
      color.rgb = (color.rgb - 0.5) * 1.1 + 0.5; // Contrast 1.1

      gl_FragColor = color;
    }
  `
);

extend({ LuxuryDistortionMaterial });

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      luxuryDistortionMaterial: ThreeElement<typeof LuxuryDistortionMaterial>;
    }
  }
}

const ImageMesh = ({ imageUrl }: { imageUrl: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Load texture
  const texture = useTexture(imageUrl);

  // Mouse state
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const hoverState = useRef(0);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();

      // Smoothly interpolate hover state
      materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHover.value,
        hoverState.current,
        0.1
      );

      // Smoothly interpolate mouse position
      materialRef.current.uniforms.uMouse.value.lerp(mouse.current, 0.1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => (hoverState.current = 1)}
      onPointerOut={() => (hoverState.current = 0)}
      onPointerMove={(e) => {
        mouse.current.set(e.uv!.x, e.uv!.y);
      }}
    >
      <planeGeometry args={[2, 2, 32, 32]} />
      <luxuryDistortionMaterial
        ref={materialRef}
        uTexture={texture}
        transparent
      />
    </mesh>
  );
};

export default function LuxuryImageDistortion({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="relative h-full w-full cursor-none">
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
        <React.Suspense fallback={null}>
          <ImageMesh imageUrl={imageUrl} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
