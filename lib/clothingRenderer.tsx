import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { ClothingItem } from '@/data/mockData';

const FabricMaterial = {
  uniforms: {
    map: { value: null },
    displacementMap: { value: null },
    displacementScale: { value: 0.05 },
    roughness: { value: 0.7 },
    metalness: { value: 0.1 },
    curvature: { value: 0.2 },
    time: { value: 0 },
    color: { value: new THREE.Color('white') },
    opacity: { value: 1.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    uniform float displacementScale;
    uniform sampler2D displacementMap;
    uniform float curvature;
    uniform float time;

    void main() {
      vUv = uv;
      vec3 transformed = position;

      float r = transformed.x;
      transformed.z -= (r * r) * curvature * 5.0;

      float d = texture2D(displacementMap, uv).r;
      float folds = sin(uv.x * 20.0 + time * 0.5) * 0.005;

      vec3 normalDir = normal;
      normalDir.x += r * curvature * 2.0;
      normalDir = normalize(normalDir);

      transformed += normalDir * (d * displacementScale + folds);

      vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
      vNormal = normalMatrix * normalDir;
    }
  `,
  fragmentShader: `
    uniform sampler2D map;
    uniform vec3 color;
    uniform float opacity;
    uniform float roughness;
    uniform float metalness;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vec4 texColor = texture2D(map, vUv);
      if (texColor.a < 0.1) discard;

      vec3 viewDir = normalize(vViewPosition);
      vec3 normal = normalize(vNormal);
      vec3 lightDir = normalize(vec3(5.0, 10.0, 7.5));

      float diff = max(dot(normal, lightDir), 0.0);
      vec3 reflectDir = reflect(-lightDir, normal);
      float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0 * (1.0 - roughness));

      vec3 finalColor = texColor.rgb * color * (0.2 + 0.8 * diff) + vec3(spec * metalness);
      gl_FragColor = vec4(finalColor, texColor.a * opacity);
    }
  `
};

interface ClothingBillboardProps {
  item: ClothingItem;
  position?: [number, number, number];
  widthScale?: number;
  shapeScale?: { shoulders: number; waist: number; hips: number };
  isLuxury?: boolean;
}

export function ClothingBillboard({
  item,
  position: basePosition = [0, 0, 0],
  widthScale = 1,
  shapeScale = { shoulders: 1, waist: 1, hips: 1 },
  isLuxury = false
}: ClothingBillboardProps) {
  const texture = useTexture(item.textureUrl || item.imageUrl);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const materialRef = useRef<any>(null);

  const { aspect, width, heightOffset, curvature } = useMemo(() => {
    const img = texture.image as HTMLImageElement;
    const asp = img ? img.width / img.height : 1;

    let baseWidth = 0.65;
    let hOffset = 0;
    let curve = 0.2;

    switch (item.category) {
      case 'tops':
        baseWidth = 0.65;
        hOffset = 0.95;
        curve = 0.3;
        break;
      case 'bottoms':
        baseWidth = 0.55;
        hOffset = 0.35;
        curve = 0.25;
        break;
      case 'dresses':
        baseWidth = 0.65;
        hOffset = 0.65;
        curve = 0.2;
        break;
      case 'outerwear':
        baseWidth = 0.70;
        hOffset = 0.95;
        curve = 0.4;
        break;
    }

    const finalWidth = baseWidth * widthScale * (item.category === 'bottoms' ? shapeScale.hips : shapeScale.shoulders);

    return {
      aspect: asp,
      width: finalWidth,
      heightOffset: hOffset,
      curvature: curve
    };
  }, [item, widthScale, shapeScale, texture]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <group position={[basePosition[0], basePosition[1] + heightOffset, basePosition[2]]}>
      <mesh
        renderOrder={item.category === 'outerwear' ? 3 : 2}
        castShadow
        receiveShadow
      >
        <planeGeometry args={[width, width / aspect, 64, 64]} />
        <shaderMaterial
          ref={materialRef}
          args={[FabricMaterial]}
          transparent
          side={THREE.DoubleSide}
          uniforms-map-value={texture}
          uniforms-displacementMap-value={texture}
          uniforms-displacementScale-value={item.category === 'outerwear' ? 0.05 : 0.03}
          uniforms-curvature-value={curvature}
          uniforms-roughness-value={isLuxury ? 0.4 : 0.7}
          uniforms-metalness-value={isLuxury ? 0.3 : 0.1}
        />
      </mesh>
    </group>
  );
}

export const preloadClothingTexture = (url: string) => useTexture.preload(url);
