'use client';

import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

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
  uniform vec2 uMouse;
  uniform float uHoverState;
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

    // Adjust aspect ratio for mouse distance calculation
    // Assuming 3:4 portrait image aspect ratio (0.75) based on original CSS classes (aspect-[3/4])
    // The geometry is 1:1, so we need to stretch the UVs internally for accurate distance.
    vec2 aspectUV = uv;
    aspectUV.x *= 0.75;
    vec2 aspectMouse = uMouse;
    aspectMouse.x *= 0.75;

    // Mouse interaction distance
    float dist = distance(aspectUV, aspectMouse);
    float force = smoothstep(0.4, 0.0, dist);

    // Apply noise distortion based on hover and mouse proximity
    float noise = snoise(uv * 4.0 + uTime * 0.5) * 0.05 * uHoverState * force;

    vec2 distortedUV = uv + noise;

    vec4 texColor = texture2D(tDiffuse, distortedUV);

    // Apply editorial color grading: saturated & contrasted slightly
    // S_FIT AI color grading requested: saturate(0.9) contrast(1.1)

    // Contrast
    texColor.rgb = (texColor.rgb - 0.5) * 1.1 + 0.5;

    // Saturation
    float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
    texColor.rgb = mix(vec3(luma), texColor.rgb, 0.9);

    gl_FragColor = texColor;
  }
`;

function Scene({ imageUrl, isHovered, mousePos }: { imageUrl: string, isHovered: boolean, mousePos: { x: number, y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);
  const { viewport } = useThree();

  const uniforms = useMemo(() => ({
    tDiffuse: { value: texture },
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uHoverState: { value: 0 }
  }), [texture]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value += delta;

      // Target hover state
      const targetHover = isHovered ? 1 : 0;
      material.uniforms.uHoverState.value += (targetHover - material.uniforms.uHoverState.value) * 0.1;

      // Update mouse position (lerped for smoothness)
      material.uniforms.uMouse.value.x += (mousePos.x - material.uniforms.uMouse.value.x) * 0.1;
      material.uniforms.uMouse.value.y += (mousePos.y - material.uniforms.uMouse.value.y) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
}

interface LuxuryImageDistortionProps {
  imageUrl: string;
  className?: string;
}

export function LuxuryImageDistortion({ imageUrl, className }: LuxuryImageDistortionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);
  const [mousePos, setMousePos] = React.useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - ((e.clientY - rect.top) / rect.height); // WebGL y is inverted
      setMousePos({ x, y });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`w-full h-full relative ${className || ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 1], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <Scene imageUrl={imageUrl} isHovered={isHovered} mousePos={mousePos} />
        </Suspense>
      </Canvas>
    </div>
  );
}
