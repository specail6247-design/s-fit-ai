'use client';
import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const LuxuryDistortionShader = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uHover: { value: 0 },
    uTexture: { value: null },
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
    uniform vec2 uMouse;
    uniform float uHover;
    uniform sampler2D uTexture;
    varying vec2 vUv;

    // Simplex noise function
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                          0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                         -0.577350269189626,  // -1.0 + 2.0 * C.x
                          0.024390243902439); // 1.0 / 41.0
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i); // Avoid truncation effects in permutation
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
            + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      return 105.0 * dot( m*m, vec3( dot(p.x,x0), dot(p.y,x12.xy), dot(p.z,x12.zw) ) );
    }

    void main() {
      vec2 uv = vUv;

      float noise = snoise(uv * 3.0 + uTime * 0.1);
      float dist = distance(uv, uMouse);

      // Ripple effect
      float ripple = sin(dist * 20.0 - uTime * 2.0) * 0.02 * uHover;

      // Liquid distortion
      vec2 distortedUV = uv + vec2(noise * 0.05 * uHover, noise * 0.05 * uHover) + ripple;

      vec4 color = texture2D(uTexture, distortedUV);

      // Add a slight gold tint on hover
      if(uHover > 0.0) {
        color.rgb = mix(color.rgb, vec3(0.92, 0.67, 0.07), uHover * 0.1);
      }

      gl_FragColor = color;
    }
  `
};

function FullScreenPlane({ imageUrl }: { imageUrl: string }) {
  const { viewport } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(imageUrl);
  const hoverState = useRef(0);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHover.value,
        hoverState.current,
        0.05
      );

      const uvMouse = new THREE.Vector2(
        (state.mouse.x + 1) / 2,
        (state.mouse.y + 1) / 2
      );
      materialRef.current.uniforms.uMouse.value.lerp(uvMouse, 0.1);
    }
  });

  // Clone texture to avoid global mutation issues if settings change
  const clonedTexture = useMemo(() => texture.clone(), [texture]);

  return (
    <mesh
      scale={[viewport.width, viewport.height, 1]}
      onPointerOver={() => (hoverState.current = 1)}
      onPointerOut={() => (hoverState.current = 0)}
    >
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        args={[LuxuryDistortionShader]}
        uniforms-uTexture-value={clonedTexture}
        transparent
      />
    </mesh>
  );
}

export default function LuxuryImageDistortion({ imageUrl, className }: { imageUrl: string, className?: string }) {
  return (
    <div className={className}>
      <Canvas style={{ width: '100%', height: '100%' }}>
        <Suspense fallback={null}>
          <FullScreenPlane imageUrl={imageUrl} />
        </Suspense>
      </Canvas>
    </div>
  );
}
