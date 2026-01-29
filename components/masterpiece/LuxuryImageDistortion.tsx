'use client';

import React, { useRef, useState, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const FluidShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uTexture: { value: null },
    uHover: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform sampler2D uTexture;
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

      // Distortion effect
      float noise = snoise(uv * 3.0 + uTime * 0.5);
      float distortion = noise * uHover * 0.03; // Subtle distortion

      vec2 distortedUv = uv + distortion;

      vec4 color = texture2D(uTexture, distortedUv);

      // Editorial Filter: Saturate 0.9, Contrast 1.1
      // Saturation
      float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
      color.rgb = mix(vec3(gray), color.rgb, 0.9);

      // Contrast
      color.rgb = (color.rgb - 0.5) * 1.1 + 0.5;

      gl_FragColor = color;
    }
  `
};

function ImagePlane({ imageUrl, isHovered }: { imageUrl: string, isHovered: boolean }) {
  const texture = useTexture(imageUrl);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHover.value,
        isHovered ? 1 : 0,
        0.1
      );
    }
  });

  const materialArgs = useMemo(() => {
      const mat = new THREE.ShaderMaterial({
          ...FluidShaderMaterial,
          uniforms: {
              ...FluidShaderMaterial.uniforms,
              uTexture: { value: texture },
              uHover: { value: 0 }, // Reset hover for new instance
              uTime: { value: 0 }
          }
      });
      return mat;
  }, [texture]);


  return (
    <mesh scale={[2, 2, 1]}>
      <planeGeometry args={[1, 1]} />
      <primitive object={materialArgs} ref={materialRef} attach="material" />
    </mesh>
  );
}

// Fallback component while loading
function Loader() {
    return <mesh><planeGeometry args={[2, 2]} /><meshBasicMaterial color="#1a1a1a" /></mesh>;
}

export default function LuxuryImageDistortion({
  imageUrl,
  className
}: {
  imageUrl: string;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative w-full h-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 1], fov: 75 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={<Loader />}>
          <ImagePlane imageUrl={imageUrl} isHovered={isHovered} />
        </Suspense>
      </Canvas>
    </div>
  );
}
