'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { shaderMaterial, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Define Shader Material
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

      // Calculate distance from mouse
      // uMouse is in UV coords (0-1)
      float dist = distance(uv, uMouse);

      // Create ripple effect
      float noise = snoise(uv * 10.0 + uTime * 0.5);

      // Distortion strength based on hover
      // Stronger interaction near mouse, but globally active on hover
      float interaction = 1.0 - smoothstep(0.0, 0.8, dist);
      float strength = uHover * (0.02 * interaction + 0.005);

      // Apply distortion
      vec2 distortedUv = uv + vec2(noise * strength, noise * strength);

      // Fetch texture color
      vec4 color = texture2D(uTexture, distortedUv);

      // Add slight shimmer/highlight
      float shimmer = uHover * 0.1 * noise * interaction;

      gl_FragColor = color + vec4(shimmer);
    }
  `
);

extend({ ImageDistortionMaterial });

function Scene({ imageUrl }: { imageUrl: string }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(imageUrl);
  const { viewport } = useThree();
  const hoverRef = useRef(0);

  // Update uniforms on every frame
  useFrame((state, delta) => {
     if (materialRef.current) {
        materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();

        // Convert mouse from normalized device coords (-1 to 1) to UV coords (0 to 1)
        const mouseX = (state.mouse.x + 1) / 2;
        const mouseY = (state.mouse.y + 1) / 2;

        materialRef.current.uniforms.uMouse.value.set(mouseX, mouseY);

        // Smoothly interpolate hover value
        // We use a ref for target value to allow instant updates from events but smooth uniform transition
        materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
            materialRef.current.uniforms.uHover.value,
            hoverRef.current,
            delta * 5
        );
     }
  });

  return (
    <mesh
        onPointerOver={() => { hoverRef.current = 1; }}
        onPointerOut={() => { hoverRef.current = 0; }}
    >
      <planeGeometry args={[viewport.width, viewport.height]} />
      {/* @ts-expect-error: Custom shader material not in JSX types */}
      <imageDistortionMaterial ref={materialRef} uTexture={texture} toneMapped={false} transparent />
    </mesh>
  );
}

export default function LuxuryImageDistortion({ imageUrl, className }: { imageUrl: string; className?: string }) {
  return (
    <div className={`relative w-full h-full ${className}`}>
        <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
            <React.Suspense fallback={null}>
                 <Scene imageUrl={imageUrl} />
            </React.Suspense>
        </Canvas>
    </div>
  );
}
