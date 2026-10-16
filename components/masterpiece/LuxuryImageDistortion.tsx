import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
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
uniform sampler2D uTexture;
uniform float uTime;
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

  // Create fluid ripple effect based on hover
  float noise = snoise(vec2(uv.x * 3.0 + uTime * 0.5, uv.y * 3.0 + uTime * 0.5));
  vec2 distortedUv = uv + vec2(noise * 0.05 * uHoverState, noise * 0.05 * uHoverState);

  vec4 color = texture2D(uTexture, distortedUv);

  // Apply luxury color grading (saturate 0.9, contrast 1.1)
  // Contrast
  color.rgb = (color.rgb - 0.5) * 1.1 + 0.5;

  // Saturation
  float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  color.rgb = mix(vec3(luminance), color.rgb, 0.9);

  gl_FragColor = color;
}
`;

interface DistortionMeshProps {
  imageUrl: string;
}

const DistortionMesh = ({ imageUrl }: DistortionMeshProps) => {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const baseTexture = useTexture(imageUrl);

  const texture = useMemo(() => {
    const cloned = baseTexture.clone();
    cloned.needsUpdate = true;
    return cloned;
  }, [baseTexture]);

  const [hovered, setHover] = useState(false);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: texture },
      uHoverState: { value: 0 },
    }),
    [texture]
  );

  useFrame((state) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Smooth interpolation for hover state
      material.current.uniforms.uHoverState.value = THREE.MathUtils.lerp(
        material.current.uniforms.uHoverState.value,
        hovered ? 1 : 0,
        0.1
      );
    }
  });

  return (
    <mesh
      ref={mesh}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <planeGeometry args={[2, 3, 32, 32]} />
      <shaderMaterial
        ref={material}
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

export function LuxuryImageDistortion({ imageUrl, className = '' }: LuxuryImageDistortionProps) {
  return (
    <div className={`w-full h-full min-h-[400px] cursor-none ${className}`}>
      <Canvas camera={{ position: [0, 0, 2.5] }}>
        <React.Suspense fallback={null}>
          <DistortionMesh imageUrl={imageUrl} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}

export default LuxuryImageDistortion;
