import * as React from 'react';
import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;
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
  vUv = uv;
  vec3 pos = position;

  // Calculate distance from mouse
  float dist = distance(uv, uMouse);
  float radius = 0.5;
  float intensity = smoothstep(radius, 0.0, dist) * uHover;

  // Fluid ripple distortion using noise
  float noiseFreq = 3.0;
  float noiseAmp = 0.1;
  vec2 noisePos = vec2(pos.x * noiseFreq + uTime * 0.5, pos.y * noiseFreq + uTime * 0.5);
  float n = snoise(noisePos) * noiseAmp;

  // Slight distortion on z
  pos.z += n * intensity;

  // Also distort x and y based on noise
  pos.x += n * intensity * 0.5;
  pos.y += n * intensity * 0.5;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uHover;
uniform vec2 uResolution;
uniform vec2 uImageResolution;
varying vec2 vUv;

void main() {
  // Aspect ratio calculation for background-size: cover equivalent
  vec2 ratio = vec2(
    min((uResolution.x / uResolution.y) / (uImageResolution.x / uImageResolution.y), 1.0),
    min((uResolution.y / uResolution.x) / (uImageResolution.y / uImageResolution.x), 1.0)
  );

  vec2 uv = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  // Apply a subtle distortion to UV on hover
  vec2 distortedUv = uv;
  vec4 color = texture2D(uTexture, distortedUv);

  // Color grading: saturate(0.9) and contrast(1.1)
  vec3 lumWeights = vec3(0.299, 0.587, 0.114);
  float luminance = dot(color.rgb, lumWeights);
  vec3 grayscale = vec3(luminance);

  // Saturation 0.9
  vec3 satColor = mix(grayscale, color.rgb, 0.9);

  // Contrast 1.1
  vec3 finalColor = (satColor - 0.5) * 1.1 + 0.5;

  gl_FragColor = vec4(finalColor, color.a);
}
`;

interface FluidImageProps {
  imageUrl: string;
}

const FluidImage = ({ imageUrl }: FluidImageProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [hovered, setHover] = useState(false);
  const { viewport } = useThree();

  const texture = useTexture(imageUrl);

  const uniforms = useMemo(() => {
    // Determine the underlying image to calculate aspect ratio properly
    const img = texture && texture.image ? (texture.image as { width: number, height: number }) : { width: 1, height: 1 };

    return {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uHover: { value: 0 },
      uTexture: { value: texture },
      uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) },
      uImageResolution: { value: new THREE.Vector2(img.width, img.height) }
    };
  }, [texture, viewport]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

      const targetHover = hovered ? 1 : 0;
      materialRef.current.uniforms.uHover.value += (targetHover - materialRef.current.uniforms.uHover.value) * 0.1;

      // Map pointer coordinates correctly
      const pointerX = (state.pointer.x + 1) / 2;
      const pointerY = (state.pointer.y + 1) / 2;

      materialRef.current.uniforms.uMouse.value.x += (pointerX - materialRef.current.uniforms.uMouse.value.x) * 0.1;
      materialRef.current.uniforms.uMouse.value.y += (pointerY - materialRef.current.uniforms.uMouse.value.y) * 0.1;

      // Update resolution uniform if viewport changes
      materialRef.current.uniforms.uResolution.value.set(state.viewport.width, state.viewport.height);
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      scale={[viewport.width, viewport.height, 1]}
    >
      <planeGeometry args={[1, 1, 64, 64]} />
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
  className?: string;
}

export default function LuxuryImageDistortion({ imageUrl, className = "" }: LuxuryImageDistortionProps) {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <Canvas orthographic camera={{ position: [0, 0, 1], zoom: 1 }}>
        <React.Suspense fallback={null}>
          <FluidImage imageUrl={imageUrl} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
