"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";

const DistortionShaderMaterial = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uHoverState: { value: 0 },
    uResolution: { value: new THREE.Vector2() },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uHoverState;
    uniform vec2 uResolution;

    varying vec2 vUv;

    // Simplex noise function
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m;
      m = m*m;
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

      // Calculate aspect ratio correction
      float aspect = uResolution.x / uResolution.y;

      // Basic noise distortion
      float noise = snoise(vec2(uv.x * 2.0 * aspect + uTime * 0.1, uv.y * 2.0 + uTime * 0.1));

      // Apply distortion only when hovered
      vec2 distortedUv = uv + noise * 0.05 * uHoverState;

      // Sample the texture
      vec4 color = texture2D(tDiffuse, distortedUv);

      // Add a slight golden tint based on hover and noise
      vec3 gold = vec3(0.85, 0.65, 0.13); // #D4AF37 approximate
      vec3 tinted = mix(color.rgb, gold * color.rgb, uHoverState * 0.2 * (noise * 0.5 + 0.5));

      gl_FragColor = vec4(tinted, color.a);
    }
  `
};

function ImageMesh({ url, isHovered }: { url: string; isHovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useLoader(TextureLoader, url);

  // Set up uniforms
  const [uniforms] = useState({
    ...DistortionShaderMaterial.uniforms,
    tDiffuse: { value: texture },
    uResolution: { value: new THREE.Vector2(1, 1) }
  });

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

      // Smoothly interpolate hover state
      const targetHover = isHovered ? 1 : 0;
      materialRef.current.uniforms.uHoverState.value +=
        (targetHover - materialRef.current.uniforms.uHoverState.value) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        args={[DistortionShaderMaterial]}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function LuxuryImageDistortion({
  imageUrl,
  alt = "",
  className = ""
}: {
  imageUrl: string;
  alt?: string;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative w-full h-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={alt}
    >
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ImageMesh url={imageUrl} isHovered={isHovered} />
      </Canvas>
    </div>
  );
}
