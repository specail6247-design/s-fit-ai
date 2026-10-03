'use client';
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform vec2 uHover;
  varying vec2 vUv;

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
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
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
    float noise = snoise(uv * 3.0 + uTime * 0.5);

    float dist = distance(uv, uHover);
    float effect = smoothstep(0.5, 0.0, dist);

    uv.y += noise * 0.05 * effect;
    uv.x += noise * 0.05 * effect;

    vec4 color = texture2D(uTexture, uv);
    gl_FragColor = color;
  }
`;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ImagePlane = ({ imageUrl }: { imageUrl: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(imageUrl);

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uTime: { value: 0 },
    uHover: { value: new THREE.Vector2(0.5, 0.5) }
  }), [texture]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      const targetX = (state.pointer.x + 1) / 2;
      const targetY = (state.pointer.y + 1) / 2;
      materialRef.current.uniforms.uHover.value.x += (targetX - materialRef.current.uniforms.uHover.value.x) * 0.1;
      materialRef.current.uniforms.uHover.value.y += (targetY - materialRef.current.uniforms.uHover.value.y) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[4, 5.33]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

export default function LuxuryImageDistortion({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="w-full h-full relative" style={{ filter: "saturate(0.9) contrast(1.1)" }}>
      <Canvas camera={{ position: [0, 0, 4.3], fov: 45 }}>
         <React.Suspense fallback={null}>
           <ImagePlane imageUrl={imageUrl} />
         </React.Suspense>
      </Canvas>
    </div>
  );
}