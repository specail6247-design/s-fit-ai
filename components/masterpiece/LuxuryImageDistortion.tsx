"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { motion } from "framer-motion";

// Simplex noise displacement shader
const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uHover;
  uniform float uHoverState;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Calculate distance from hover position
    float dist = distance(uv, uHover);

    // Add wave effect based on hover
    float wave = sin(dist * 10.0 - uTime * 2.0) * 0.05 * uHoverState;
    pos.z += wave * smoothstep(0.5, 0.0, dist);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform vec2 uHover;
  uniform float uHoverState;

  void main() {
    vec2 uv = vUv;

    // Liquid distortion effect
    float dist = distance(uv, uHover);
    vec2 distortion = vec2(
      sin(uv.y * 10.0 + uTime) * 0.02,
      cos(uv.x * 10.0 + uTime) * 0.02
    ) * uHoverState * smoothstep(0.5, 0.0, dist);

    // Color grading: saturate(0.9) contrast(1.1)
    vec4 texColor = texture2D(uTexture, uv + distortion);

    // Contrast (1.1)
    texColor.rgb = ((texColor.rgb - 0.5) * 1.1) + 0.5;

    // Saturation (0.9)
    vec3 luma = vec3(0.299, 0.587, 0.114);
    float luminance = dot(texColor.rgb, luma);
    texColor.rgb = mix(vec3(luminance), texColor.rgb, 0.9);

    gl_FragColor = texColor;
  }
`;

function FluidImage({ imageUrl }: { imageUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(imageUrl);

  const [hovered, setHovered] = useState(false);
  const targetHoverState = useRef(0);
  const currentHoverState = useRef(0);
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: texture },
      uHover: { value: new THREE.Vector2(0.5, 0.5) },
      uHoverState: { value: 0 },
    }),
    [texture]
  );

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;

      // Smoothly interpolate hover state
      targetHoverState.current = hovered ? 1 : 0;
      currentHoverState.current = THREE.MathUtils.lerp(
        currentHoverState.current,
        targetHoverState.current,
        0.1
      );
      materialRef.current.uniforms.uHoverState.value = currentHoverState.current;

      // Smoothly interpolate mouse position
      mouse.current.lerp(targetMouse.current, 0.1);
      materialRef.current.uniforms.uHover.value.copy(mouse.current);
    }
  });

  const handlePointerMove = (e: import('@react-three/fiber').ThreeEvent<PointerEvent>) => {
    // Convert point to UV coordinates (0-1)
    if (e.uv) targetMouse.current.set(e.uv.x, e.uv.y);
  };

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerMove={handlePointerMove}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
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
  alt?: string;
}

export default function LuxuryImageDistortion({ imageUrl, className, alt = "Luxury Image" }: LuxuryImageDistortionProps) {
  return (
    <motion.div
      className={`relative w-full h-full overflow-hidden ${className || ''}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <Canvas
        camera={{ position: [0, 0, 1], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ alpha: true, antialias: true }}
      >
        <React.Suspense fallback={null}>
          <FluidImage imageUrl={imageUrl} />
        </React.Suspense>
      </Canvas>
      {/* Screen Reader fallback */}
      <img src={imageUrl} alt={alt} className="sr-only" />
    </motion.div>
  );
}
