'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D tDiffuse;
uniform float uTime;
uniform vec2 uHover;
uniform float uHoverState;
varying vec2 vUv;

// Simplex noise implementation
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i); // Avoid truncation effects in permutation
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
  vec2 p = vUv;
  float noise = snoise(p * 5.0 + uTime * 0.5);

  // Calculate distance from hover position
  float dist = distance(p, uHover);

  // Create ripple effect
  float ripple = sin(dist * 20.0 - uTime * 5.0) * 0.02;

  // Apply displacement based on hover state and distance
  float displacement = (noise * 0.05 + ripple) * uHoverState * (1.0 - smoothstep(0.0, 0.5, dist));

  vec2 distortedUv = p + displacement;

  vec4 texColor = texture2D(tDiffuse, distortedUv);

  // Apply saturate(0.9) and contrast(1.1)
  const vec3 W = vec3(0.2125, 0.7154, 0.0721);
  vec3 intensity = vec3(dot(texColor.rgb, W));
  texColor.rgb = mix(intensity, texColor.rgb, 0.9); // Saturate
  texColor.rgb = (texColor.rgb - 0.5) * 1.1 + 0.5; // Contrast

  gl_FragColor = texColor;
}
`;

const DistortionMesh = ({ imageUrl }: { imageUrl: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(imageUrl);
  const [hovered, setHover] = useState(false);
  const targetHoverState = useRef(0);
  const currentHoverState = useRef(0);
  const mousePosition = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      tDiffuse: { value: texture },
      uTime: { value: 0 },
      uHover: { value: new THREE.Vector2(0.5, 0.5) },
      uHoverState: { value: 0 },
    }),
    [texture]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

      targetHoverState.current = hovered ? 1 : 0;
      currentHoverState.current = THREE.MathUtils.lerp(
        currentHoverState.current,
        targetHoverState.current,
        0.1
      );

      materialRef.current.uniforms.uHoverState.value = currentHoverState.current;

      // Update uniform mouse position with lerp for smoothness
      materialRef.current.uniforms.uHover.value.lerp(mousePosition.current, 0.1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onPointerMove={(e) => {
        // e.uv is normalized 0-1
        if (e.uv) {
          mousePosition.current.set(e.uv.x, e.uv.y);
        }
      }}
    >
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default function LuxuryImageDistortion({ imageUrl, className = '' }: { imageUrl: string, className?: string }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ alpha: true, antialias: true }}
      >
        <DistortionMesh imageUrl={imageUrl} />
      </Canvas>
    </div>
  );
}
