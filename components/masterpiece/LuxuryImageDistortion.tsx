'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uPointer;
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

  // Calculate distance from pointer
  float dist = distance(uv, uPointer);

  // Create ripple effect based on hover and pointer position
  float ripple = snoise(uv * 10.0 + uTime * 2.0) * 0.05 * uHover;
  float interaction = exp(-dist * 5.0) * snoise(uv * 20.0 - uTime * 5.0) * 0.1 * uHover;

  vec2 distortedUv = uv + vec2(ripple + interaction);

  // Keep UVs within bounds
  distortedUv = clamp(distortedUv, 0.0, 1.0);

  vec4 texColor = texture2D(uTexture, distortedUv);

  // Subtle color shift based on distortion
  texColor.rgb += vec3(ripple * 2.0, interaction, ripple) * 0.5;

  gl_FragColor = texColor;
}
`;

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

function ImagePlane({ imageUrl }: { imageUrl: string }) {
  const mesh = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);
  const { size, pointer } = useThree();
  const [hovered, setHovered] = useState(false);

  // Normalize pointer coordinates to 0..1 range (UV space)
  // pointer.x is -1 to 1, pointer.y is -1 to 1 (bottom to top)
  const normalizedPointer = useMemo(() => new THREE.Vector2(0.5, 0.5), []);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uPointer: { value: normalizedPointer },
      uHover: { value: 0 },
    }),
    [texture, normalizedPointer]
  );

  useFrame((state) => {
    if (mesh.current) {
      const material = mesh.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;

      // Target hover value
      const targetHover = hovered ? 1.0 : 0.0;
      material.uniforms.uHover.value = THREE.MathUtils.lerp(
        material.uniforms.uHover.value,
        targetHover,
        0.1
      );

      if (hovered) {
         // Convert screen pointer (-1 to 1) to UV (0 to 1)
         normalizedPointer.set(
            (pointer.x + 1) / 2,
            (pointer.y + 1) / 2
         );
      }
    }
  });

  // Calculate aspect ratio covering
  const image = texture.image as HTMLImageElement | undefined;
  const imageAspect = image ? image.width / image.height : 1;
  const viewportAspect = size.width / size.height;

  let scaleX = 1;
  let scaleY = 1;

  if (imageAspect > viewportAspect) {
    scaleX = imageAspect / viewportAspect;
  } else {
    scaleY = viewportAspect / imageAspect;
  }

  return (
    <mesh
      ref={mesh}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerMove={(e) => {
        // e.uv is directly available from R3F intersection
        if (e.uv) {
          normalizedPointer.copy(e.uv);
        }
      }}
      scale={[size.width * scaleX, size.height * scaleY, 1]}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function LuxuryImageDistortion({ imageUrl, className = '' }: { imageUrl: string, className?: string }) {
  return (
    <div className={`w-full h-full relative ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 50 }}
        className="w-full h-full"
        style={{ position: 'absolute', inset: 0 }}
      >
        <React.Suspense fallback={null}>
          <ImagePlane imageUrl={imageUrl} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
