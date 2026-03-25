"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uHover;
  uniform vec2 uMouse;
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

    // Create ripple effect centered around mouse
    float dist = distance(uv, uMouse);
    float ripple = sin(dist * 20.0 - uTime * 2.0) * 0.02;

    // Add noise for the "silk/liquid" texture when hovered
    float noise = snoise(uv * 5.0 + uTime * 0.5) * 0.03;

    // Combine distortion based on hover state
    vec2 distortion = uv + (vec2(noise) + vec2(ripple)) * uHover;

    // Edge smoothing (clamp distortion to not sample outside texture)
    distortion = clamp(distortion, 0.0, 1.0);

    vec4 color = texture2D(uTexture, distortion);
    gl_FragColor = color;
  }
`;

function DistortionMaterial({
  imageUrl,
  hoverState,
  mousePos,
}: {
  imageUrl: string;
  hoverState: number;
  mousePos: { x: number; y: number };
}) {
  const texture = useTexture(imageUrl);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uHover: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    [texture]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();

      // Smoothly interpolate hover state
      materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHover.value,
        hoverState,
        0.1
      );

      // Smoothly interpolate mouse position
      materialRef.current.uniforms.uMouse.value.x = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uMouse.value.x,
        mousePos.x,
        0.1
      );
      materialRef.current.uniforms.uMouse.value.y = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uMouse.value.y,
        mousePos.y,
        0.1
      );
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
      transparent
    />
  );
}

export default function LuxuryImageDistortion({
  imageUrl,
  className = "",
}: {
  imageUrl: string;
  className?: string;
}) {
  const [hoverState, setHoverState] = React.useState(0);
  const [mousePos, setMousePos] = React.useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate normalized mouse coordinates (0 to 1)
      const x = (e.clientX - rect.left) / rect.width;
      // WebGL Y coordinate is inverted (bottom is 0, top is 1)
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      setMousePos({ x, y });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-hidden ${className}`}
      onPointerEnter={() => setHoverState(1)}
      onPointerLeave={() => {
        setHoverState(0);
        setMousePos({ x: 0.5, y: 0.5 }); // Reset to center
      }}
      onPointerMove={handlePointerMove}
    >
      <Canvas
        camera={{ position: [0, 0, 1], zoom: 1 }}
        orthographic
        gl={{ antialias: false, alpha: true }}
      >
        <React.Suspense fallback={null}>
          <mesh>
            {/* Plane matches the aspect ratio and covers the view */}
            <planeGeometry args={[2, 2]} />
            <DistortionMaterial
              imageUrl={imageUrl}
              hoverState={hoverState}
              mousePos={mousePos}
            />
          </mesh>
        </React.Suspense>
      </Canvas>
      {/* Gradient Overlay for the background transition effect as in the original */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]" />
    </div>
  );
}
