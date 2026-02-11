'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Simplex Noise GLSL function
const simplexNoise = `
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
`;

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform float uHover;
uniform sampler2D uTexture;
varying vec2 vUv;

${simplexNoise}

void main() {
  vec2 uv = vUv;

  // Create a ripple effect based on time
  float noise = snoise(uv * 3.0 + uTime * 0.2);

  // Distortion strength
  float strength = 0.02 * uHover + 0.005; // Base subtle movement + hover intensity

  // Apply distortion
  vec2 distortedUv = uv + vec2(noise * strength);

  // Sample texture
  vec4 color = texture2D(uTexture, distortedUv);

  // Apply cinematic color grading (saturate 0.9, contrast 1.1)
  // Contrast
  color.rgb = (color.rgb - 0.5) * 1.1 + 0.5;
  // Saturation
  vec3 gray = vec3(dot(color.rgb, vec3(0.299, 0.587, 0.114)));
  color.rgb = mix(gray, color.rgb, 0.9);

  gl_FragColor = color;
}
`;

interface ImageMeshProps {
  imageUrl: string;
}

const ImageMesh: React.FC<ImageMeshProps> = ({ imageUrl }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  // Load texture
  const texture = useTexture(imageUrl);

  // Calculate scale to "cover" the viewport
  // We assume the plane is 1x1 initially.
  // We stretch it to match viewport dimensions.
  // Then we might need to adjust UVs if we cared about aspect ratio preservation of the image content inside the shader,
  // but for "cover" in WebGL usually we scale the mesh to cover the screen.
  // However, simple scaling here stretches the image.
  // To do proper "object-fit: cover", we need to know image aspect and viewport aspect.

  // If we want to cover the viewport with the image without distortion of the image content itself (UV mapping),
  // we usually modify UVs in shader or scale the mesh.
  // For simplicity here, we'll scale the mesh to fill the viewport (stretching)
  // OR we can try to respect aspect.
  // Given the "Fluid Distortion" is the goal, slight stretching might be acceptable,
  // but let's try to be nice.

  // Actually, standard behavior for a background image is often 'cover'.
  // Let's just fill the viewport for now.
  const scale: [number, number, number] = [viewport.width, viewport.height, 1];

  // Uniforms
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHover: { value: 0 },
      uTexture: { value: texture },
    }),
    [texture]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  const [hovered, setHover] = React.useState(false);

  // Animate uHover
  useFrame(() => {
      if (materialRef.current) {
          materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
              materialRef.current.uniforms.uHover.value,
              hovered ? 1 : 0,
              0.1
          );
      }
  });

  return (
    <mesh
      ref={meshRef}
      scale={scale}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
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
};

interface LuxuryImageDistortionProps {
  imageUrl: string;
}

export default function LuxuryImageDistortion({ imageUrl }: LuxuryImageDistortionProps) {
  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }} // Orthographic might be better for 2D, but perspective is fine at z=1 looking at z=0 if sized right.
        // Actually, for full screen plane, we often fit the camera or plane.
        // R3F default camera is Perspective.
        // Let's rely on useThree viewport to size the mesh to fill the view.
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <React.Suspense fallback={null}>
          <ImageMesh imageUrl={imageUrl} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
