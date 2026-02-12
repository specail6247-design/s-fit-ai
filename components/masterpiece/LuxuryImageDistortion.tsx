'use client';

import React, { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform float uHover;
uniform float uResolution;

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

  // Calculate noise
  float noise = snoise(uv * 4.0 + uTime * 0.3);

  // Calculate distance from mouse (uMouse is 0..1)
  float dist = distance(uv, uMouse);

  // Effect strength based on hover and distance
  // Only distort near mouse
  float mouseEffect = smoothstep(0.4, 0.0, dist);
  float strength = uHover * mouseEffect;

  // Apply distortion
  vec2 distortedUv = uv + vec2(
    noise * 0.03 * strength,
    noise * 0.03 * strength
  );

  // Fetch texture color
  vec4 color = texture2D(uTexture, distortedUv);

  // Add silk/liquid sheen
  // Highlight peaks of the noise
  float sheen = smoothstep(0.4, 0.6, noise) * 0.15 * strength;
  color.rgb += sheen;

  // Apply saturation/contrast filter directly in shader (as requested for asset curation)
  // contrast 1.1, saturate 0.9

  // Contrast
  color.rgb = (color.rgb - 0.5) * 1.1 + 0.5;

  // Saturation
  float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  color.rgb = mix(vec3(gray), color.rgb, 0.9);

  gl_FragColor = color;
}
`;

function ImagePlane({ imageUrl }: { imageUrl: string }) {
  const mesh = useRef<THREE.Mesh>(null);

  // Load texture
  const texture = useTexture(imageUrl);

  // Get viewport to size the plane
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uHover: { value: 0 },
      uResolution: { value: 1.0 },
    }),
    [texture]
  );

  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (mesh.current) {
      const material = mesh.current.material as THREE.ShaderMaterial;

      // Update time
      material.uniforms.uTime.value = state.clock.getElapsedTime();

      // Smoothly interpolate hover state
      material.uniforms.uHover.value = THREE.MathUtils.lerp(
        material.uniforms.uHover.value,
        hovered ? 1 : 0,
        0.1
      );

      // Update mouse position (convert -1..1 to 0..1)
      material.uniforms.uMouse.value.x = (state.pointer.x + 1) / 2;
      material.uniforms.uMouse.value.y = (state.pointer.y + 1) / 2;
    }
  });

  // Calculate aspect ratio of the image vs viewport to cover it properly
  // Since we don't know image dimensions until loaded and texture has them...
  // We can use texture.image.width/height if available

  // For now, simply fill the viewport (like object-cover)
  return (
    <mesh
      ref={mesh}
      scale={[viewport.width, viewport.height, 1]}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
}

export default function LuxuryImageDistortion({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="w-full h-full cursor-pointer">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={null}>
          <ImagePlane imageUrl={imageUrl} />
        </Suspense>
      </Canvas>
    </div>
  );
}
