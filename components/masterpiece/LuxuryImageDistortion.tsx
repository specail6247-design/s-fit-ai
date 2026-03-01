import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
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
uniform float uHover;
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

  // Calculate distortion based on noise and hover state
  float noise = snoise(uv * 3.0 + uTime * 0.5) * 0.05 * uHover;
  float noise2 = snoise(uv * 5.0 - uTime * 0.3) * 0.03 * uHover;

  vec2 distortedUv = uv + vec2(noise, noise2);

  // Sample texture with distorted UVs
  vec4 color = texture2D(uTexture, distortedUv);

  // Apply a subtle color shift on hover for "silk" feeling
  color.rgb += vec3(noise * 0.5, noise2 * 0.5, (noise + noise2) * 0.5) * uHover;

  gl_FragColor = color;
}
`;

interface DistortionMaterialProps {
  texture: THREE.Texture;
  isHovered: boolean;
}

const DistortionMaterial: React.FC<DistortionMaterialProps> = ({ texture, isHovered }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uTime: { value: 0 },
    uHover: { value: 0 },
  }), [texture]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Smooth interpolation for hover state
      const targetHover = isHovered ? 1.0 : 0.0;
      materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHover.value,
        targetHover,
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
      transparent={true}
    />
  );
};

interface LuxuryImageDistortionProps {
  imageUrl: string;
  className?: string;
}

export default function LuxuryImageDistortion({ imageUrl, className = '' }: LuxuryImageDistortionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  // Load texture once
  useMemo(() => {
    if (typeof window !== 'undefined') {
      new THREE.TextureLoader().load(imageUrl, (t) => {
        t.colorSpace = THREE.SRGBColorSpace;
        // Adjust these to cover/contain the image nicely depending on aspect ratio
        // For simplicity, we just set the texture
        setTexture(t);
      });
    }
  }, [imageUrl]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Fallback image while loading or for SSR */}
      {!texture && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}

      {texture && (
        <Canvas className="absolute inset-0" camera={{ position: [0, 0, 1] }}>
          <mesh>
            <planeGeometry args={[2, 2]} />
            <DistortionMaterial texture={texture} isHovered={isHovered} />
          </mesh>
        </Canvas>
      )}
    </div>
  );
}
