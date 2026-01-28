'use client'
import React, { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
uniform float uTime;
uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform float uHover;
varying vec2 vUv;

// Simple pseudo-random function
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// 2D Noise
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
  vec2 uv = vUv;

  // Interactive Ripple
  float dist = distance(uv, uMouse);
  float rippleArea = 1.0 - smoothstep(0.0, 0.5, dist);
  float ripple = sin(dist * 30.0 - uTime * 4.0) * 0.015 * uHover * rippleArea;

  // Liquid Silk Movement
  float n = noise(uv * 4.0 + uTime * 0.5);
  float liquid = sin(uv.y * 10.0 + uTime + n * 2.0) * 0.01 * uHover;

  vec2 distortedUv = uv + vec2(liquid + ripple, liquid);

  // Clamp UVs to prevent wrapping artifacts if needed, but for silk effect, wrapping might look okay if texture allows.
  // Ideally we use GL_CLAMP_TO_EDGE texture wrapping.

  vec4 color = texture2D(uTexture, distortedUv);

  // Highlight effect
  float highlight = smoothstep(0.4, 0.6, liquid + ripple + n * 0.1) * uHover * 0.3;
  color.rgb += vec3(highlight);

  // Contrast boost for "Luxury" feel
  color.rgb = (color.rgb - 0.5) * (1.0 + uHover * 0.1) + 0.5;

  gl_FragColor = color;
}
`

function DistortionPlane({ imageUrl }: { imageUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const texture = useTexture(imageUrl)
  const [hover, setHover] = useState(false)
  const { viewport } = useThree()

  // Fix aspect ratio
  const img = texture.image
  const aspect = img ? img.width / img.height : 1

  // Calculate plane size to cover viewport while maintaining aspect ratio (cover)
  // Or just fit into viewport. Let's try to fit/cover logic.
  // For a simple card effect, we usually want it to fill the canvas.

  const viewportAspect = viewport.width / viewport.height
  let scale: [number, number, number] = [viewport.width, viewport.height, 1]

  // Uniforms
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uHover: { value: 0 }
    }),
    [texture]
  )

  useFrame((state) => {
    if (meshRef.current) {
        const material = meshRef.current.material as THREE.ShaderMaterial
        material.uniforms.uTime.value = state.clock.getElapsedTime()

        // Lerp hover value for smooth transition
        material.uniforms.uHover.value = THREE.MathUtils.lerp(
            material.uniforms.uHover.value,
            hover ? 1 : 0,
            0.1
        )
    }
  })

  const handlePointerMove = (e: any) => {
      if (meshRef.current) {
          const material = meshRef.current.material as THREE.ShaderMaterial
          // UV coordinates are 0-1
          material.uniforms.uMouse.value.set(e.uv.x, e.uv.y)
      }
  }

  return (
    <mesh
      ref={meshRef}
      scale={scale}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onPointerMove={handlePointerMove}
    >
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  )
}

export default function LuxuryImageDistortion({ imageUrl, className }: { imageUrl: string, className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
        dpr={[1, 2]} // Support retina displays
        gl={{ antialias: true, alpha: true }}
      >
        <DistortionPlane imageUrl={imageUrl} />
      </Canvas>
    </div>
  )
}
