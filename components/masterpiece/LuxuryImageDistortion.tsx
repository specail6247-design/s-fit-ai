"use client";

import React, { useRef, useMemo, useState } from "react";
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
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uHover;
  varying vec2 vUv;

  // Simplex 2D noise
  //
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

    // Create a fluid/silk distortion effect based on hover and mouse position
    float noise = snoise(uv * 3.0 + uTime * 0.5) * 0.05 * uHover;

    // Distance from mouse
    float dist = distance(uv, uMouse);
    float mouseEffect = smoothstep(0.5, 0.0, dist) * uHover;

    vec2 distortedUv = uv + noise * mouseEffect;

    vec4 tex = texture2D(uTexture, distortedUv);

    // Add subtle shadow/highlight to emphasize the ripples
    float light = snoise(uv * 5.0 + uTime) * 0.1 * mouseEffect;

    // Darken edge gradient
    float edge = 1.0 - smoothstep(0.0, 0.5, uv.y) * 0.5;

    gl_FragColor = vec4(tex.rgb + light, tex.a) * edge;
  }
`;

const ImagePlane = ({ imageUrl }: { imageUrl: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState(new THREE.Vector2(0.5, 0.5));
  const targetHover = useRef(0);
  const currentHover = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 },
      uHover: { value: 0 },
    }),
    [texture]
  );

  useFrame((state, delta) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value += delta;

      // Smooth hover transition
      targetHover.current = hovered ? 1 : 0;
      currentHover.current = THREE.MathUtils.lerp(currentHover.current, targetHover.current, 0.1);
      material.uniforms.uHover.value = currentHover.current;

      // Smooth mouse transition
      material.uniforms.uMouse.value.lerp(mouse, 0.1);
    }
  });

  const handlePointerMove = (e: any) => {
    setMouse(new THREE.Vector2(e.uv.x, e.uv.y));
  };

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerMove={handlePointerMove}
    >
      <planeGeometry args={[2, 2.66]} /> {/* 3/4 aspect ratio */}
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default function LuxuryImageDistortion({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="absolute inset-0 z-0 h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 2], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ImagePlane imageUrl={imageUrl} />
      </Canvas>
    </div>
  );
}
