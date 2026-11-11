'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
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
  float noise = snoise(uv * 3.0 + uTime * 0.5) * 0.05 * uHover;
  vec2 distortedUv = uv + vec2(noise);
  vec4 color = texture2D(tDiffuse, distortedUv);

  // Luxury filter: slight desaturation, increased contrast, subtle gold tint
  float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  vec3 desaturated = mix(vec3(gray), color.rgb, 0.8); // Saturate 0.8
  vec3 contrasted = (desaturated - 0.5) * 1.1 + 0.5; // Contrast 1.1

  // Subtle gold tint on hover
  vec3 goldTint = mix(contrasted, vec3(1.0, 0.9, 0.7) * gray, 0.1 * uHover);

  gl_FragColor = vec4(goldTint, color.a);
}
`;

function Scene({ imageUrl, isHovered }: { imageUrl: string, isHovered: boolean }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  React.useEffect(() => {
    new THREE.TextureLoader().load(imageUrl, (tex) => {
      setTexture(tex);
    });
  }, [imageUrl]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Smoothly interpolate hover uniform
      const targetHover = isHovered ? 1.0 : 0.0;
      materialRef.current.uniforms.uHover.value += (targetHover - materialRef.current.uniforms.uHover.value) * 0.05;
    }
  });

  if (!texture) return null;

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          tDiffuse: { value: texture },
          uTime: { value: 0 },
          uHover: { value: 0 }
        }}
        transparent={true}
      />
    </mesh>
  );
}

export default function LuxuryImageDistortion({ imageUrl, className }: { imageUrl: string, className?: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className || 'w-full h-full'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene imageUrl={imageUrl} isHovered={isHovered} />
      </Canvas>
    </div>
  );
}
