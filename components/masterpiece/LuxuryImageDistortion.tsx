import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface LuxuryImageDistortionProps {
  imageUrl: string;
  isHovered: boolean;
}

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

    // Calculate noise based distortion based on hover state
    float noise = snoise(uv * 3.0 + uTime * 0.5) * 0.05 * uHover;
    uv += noise;

    // Sample texture with distorted UVs
    vec4 texColor = texture2D(uTexture, uv);

    // Apply editorial color grading: saturate(0.9) contrast(1.1)

    // Desaturate slightly (saturate 0.9)
    float luminance = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
    vec3 desaturated = mix(vec3(luminance), texColor.rgb, 0.9);

    // Apply contrast 1.1
    vec3 finalColor = (desaturated - 0.5) * 1.1 + 0.5;

    gl_FragColor = vec4(finalColor, texColor.a);
  }
`;

export default function LuxuryImageDistortion({ imageUrl, isHovered }: LuxuryImageDistortionProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Load texture
  const texture = useTexture(imageUrl);

  // Store cloned texture
  const clonedTexture = useMemo(() => {
    const cloned = texture.clone();
    cloned.colorSpace = THREE.SRGBColorSpace;
    return cloned;
  }, [texture]);

  // Set up uniforms
  const uniforms = useMemo(
    () => ({
      uTexture: { value: clonedTexture },
      uTime: { value: 0 },
      uHover: { value: 0 },
    }),
    [clonedTexture]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

      // Smoothly animate hover state
      const targetHover = isHovered ? 1.0 : 0.0;
      materialRef.current.uniforms.uHover.value +=
        (targetHover - materialRef.current.uniforms.uHover.value) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2, 32, 32]} />
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

useTexture.preload("https://lh3.googleusercontent.com/aida-public/AB6AXuC5m1trvvOgtFQZrHz7J1_8YKjIyJFwuTm6b_C9mQJtDJDsOl_xtHZHfLA3MDVgFSQv4zos6OnEPUwen36ZcXZRERoj4Bj3o87kdcXjQWJ8YNc33SLIAqJUET6o0yOwx_pVzx0OswcPQw2ivo6sLma8xEumxoFQDfDsbpY-obuXwXx9h6QOzOhEDJvrFuPoRkbJEz-kJUE5bbVxawyJiFfEmGOi47n8Jrh8-zVHq14XQL_snfcQ2Ia117Mk5S2bn_rRht21zxTm58E")
