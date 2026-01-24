"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { useTexture, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// Shader Definition
const FluidMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: null,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uHover: 0,
    uResolution: new THREE.Vector2(1, 1),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform sampler2D uTexture;
    uniform vec2 uMouse;
    uniform float uHover;
    varying vec2 vUv;

    // Simplex noise function
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v - i + dot(i, C.xx);
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

      // Mouse influence (assuming uMouse is normalized 0-1)
      float dist = distance(uv, uMouse);
      float decay = clamp(1.0 - dist * 3.0, 0.0, 1.0); // Tighter radius

      // Liquid effect
      float noise = snoise(uv * 8.0 - uTime * 0.5);
      float distortionStrength = (noise * 0.03 + decay * 0.1) * uHover;

      vec2 distortedUV = uv + vec2(distortionStrength * 0.5, distortionStrength);

      // Clamp UVs to avoid texture wrapping artifacts if needed,
      // but for fluid we might want wrapping or mirrored repeat.
      // Here we rely on the texture's wrapping mode or simple clamping logic in visual.

      vec4 color = texture2D(uTexture, distortedUV);

      // Chromatic aberration based on distortion
      float r = texture2D(uTexture, distortedUV + vec2(0.01 * uHover * decay, 0.0)).r;
      float b = texture2D(uTexture, distortedUV - vec2(0.01 * uHover * decay, 0.0)).b;

      // Gold tint overlay
      vec3 gold = vec3(0.788, 0.69, 0.215); // #C9B037 normalized approx
      vec3 finalColor = vec3(r, color.g, b);
      finalColor = mix(finalColor, gold * dot(finalColor, vec3(0.299, 0.587, 0.114)), 0.1 * uHover); // Slight gold tint on hover

      gl_FragColor = vec4(finalColor, color.a);
    }
  `
);

// Register the material with R3F
extend({ FluidMaterial });

// Add types for the custom material
declare global {
  namespace JSX {
    interface IntrinsicElements {
      fluidMaterial: any;
    }
  }
}

interface ImagePlaneProps {
  imageUrl: string;
}

const ImagePlane: React.FC<ImagePlaneProps> = ({ imageUrl }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(imageUrl);
  const [hover, setHover] = useState(false);

  // Handle texture aspect ratio
  // Assuming a square plane for simplicity, or we adapt based on texture.
  // For this component, we'll keep it simple: filling the canvas.

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;

      // Smooth hover transition
      materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHover.value,
        hover ? 1 : 0,
        delta * 5
      );

      // Mouse position
      // Map pointer (-1 to 1) to UV space (0 to 1)
      const uvMouse = new THREE.Vector2(
        (state.pointer.x + 1) / 2,
        (state.pointer.y + 1) / 2
      );
      materialRef.current.uniforms.uMouse.value.lerp(uvMouse, 0.1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      scale={[2, 2, 1]} // Cover the viewport roughly (viewport is 2 units high by default in ortho/perspective at specific dist)
      // Actually R3F default camera is perspective z=5. Plane size depends on that.
      // To fill the canvas, we use the viewport from useThree()
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      {/* @ts-ignore - fluidMaterial is extended but TS might complain without proper type aug in module */}
      <fluidMaterial
        ref={materialRef}
        uTexture={texture}
        transparent
      />
    </mesh>
  );
};

// Responsive wrapper
const ResponsiveImagePlane: React.FC<ImagePlaneProps> = (props) => {
  const { viewport } = useThree();
  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      {/* @ts-ignore */}
      <fluidMaterial
        uTexture={useTexture(props.imageUrl)}
        transparent
      />
    </mesh>
  );
};

// However, we need the mouse interaction to work correctly.
// A full screen quad is easier.
const FullScreenPlane: React.FC<ImagePlaneProps> = ({ imageUrl }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(imageUrl);
  const { viewport } = useThree();
  const [hover, setHover] = useState(false);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;

      materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHover.value,
        hover ? 1 : 0,
        delta * 3
      );

      // Convert pointer to UV space
      const uvMouse = new THREE.Vector2(
        (state.pointer.x * viewport.width / 2 + viewport.width / 2) / viewport.width,
        (state.pointer.y * viewport.height / 2 + viewport.height / 2) / viewport.height
      );
       // Actually simpler: pointer.x is -1..1, so (x+1)/2 is 0..1
      const simpleUvMouse = new THREE.Vector2(
        (state.pointer.x + 1) / 2,
        (state.pointer.y + 1) / 2
      );

      materialRef.current.uniforms.uMouse.value.lerp(simpleUvMouse, 0.1);
    }
  });

  return (
    <mesh
        scale={[viewport.width, viewport.height, 1]}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
    >
      <planeGeometry args={[1, 1, 64, 64]} />
      {/* @ts-ignore */}
      <fluidMaterial
        ref={materialRef}
        uTexture={texture}
        transparent
      />
    </mesh>
  );
}

interface LuxuryImageDistortionProps {
  imageUrl: string;
  className?: string;
  alt?: string;
}

export default function LuxuryImageDistortion({ imageUrl, className = "", alt = "Luxury Item" }: LuxuryImageDistortionProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
        <Canvas
            camera={{ position: [0, 0, 1], fov: 75 }}
            style={{ width: '100%', height: '100%' }}
            dpr={[1, 2]}
        >
            <React.Suspense fallback={null}>
                <FullScreenPlane imageUrl={imageUrl} />
            </React.Suspense>
        </Canvas>
        {/* Semantic hidden image for SEO/Accessibility if needed, though Canvas is visual only */}
        <img src={imageUrl} alt={alt} className="sr-only" />
    </div>
  );
}
