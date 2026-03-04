'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
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
  vec2 uv = vUv;

  // Create liquid/silk ripple distortion
  float noise = snoise(uv * 5.0 + uTime * 0.5) * 0.05 * uHover;
  uv.x += noise;
  uv.y += noise;

  vec4 color = texture2D(tDiffuse, uv);
  gl_FragColor = color;
}
`;

interface ImagePlaneProps {
  imageUrl: string;
}

const ImagePlane: React.FC<ImagePlaneProps> = ({ imageUrl }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useLoader(THREE.TextureLoader, imageUrl);
  const [hovered, setHover] = useState(false);

  const uniforms = useMemo(() => ({
    tDiffuse: { value: texture },
    uTime: { value: 0 },
    uHover: { value: 0 }
  }), [texture]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Smooth interpolation for hover state
      const targetHover = hovered ? 1 : 0;
      materialRef.current.uniforms.uHover.value += (targetHover - materialRef.current.uniforms.uHover.value) * 0.1;
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
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

interface LuxuryImageDistortionProps {
  imageUrl: string;
  className?: string;
}

export const LuxuryImageDistortion: React.FC<LuxuryImageDistortionProps> = ({ imageUrl, className }) => {
  return (
    <div className={className} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        // Keep pixelRatio bounded for performance
        dpr={[1, 2]}
      >
        <ImagePlane imageUrl={imageUrl} />
      </Canvas>
    </div>
  );
};

export default LuxuryImageDistortion;
