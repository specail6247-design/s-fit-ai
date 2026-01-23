'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { useTexture, shaderMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { masterpieceVertexShader, masterpieceFragmentShader } from '@/components/three/shaders/masterpiece';
import { ClothingStyleAnalysis } from '@/lib/visionService';

// Define the custom shader material
const MasterpieceMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
    uFabricType: 0,
    uZoom: 1.0,
    uLightPos: new THREE.Vector3(1, 1, 2),
    uLightColor: new THREE.Color(1, 1, 1),
    uAmbientColor: new THREE.Color(0.2, 0.2, 0.2),
    uRimColor: new THREE.Color(1, 1, 1),
    uRimIntensity: 0.5,
    uSpecularStrength: 0.5,
    uMotionIntensity: 1.0,
  },
  masterpieceVertexShader,
  masterpieceFragmentShader
);

extend({ MasterpieceMaterial });

// Add types for the custom material
declare global {
  namespace JSX {
    interface IntrinsicElements {
      masterpieceMaterial: any;
    }
  }
}

interface LightingPreset {
  name: string;
  lightPos: [number, number, number];
  lightColor: string;
  ambientColor: string;
  rimColor: string;
  rimIntensity: number;
  specularStrength: number;
}

export const LIGHTING_PRESETS: Record<string, LightingPreset> = {
  studio: {
    name: 'Studio',
    lightPos: [0.5, 0.5, 2],
    lightColor: '#ffffff',
    ambientColor: '#808080',
    rimColor: '#ffffff',
    rimIntensity: 0.3,
    specularStrength: 0.4,
  },
  dramatic: {
    name: 'Dramatic',
    lightPos: [2, 0, 1],
    lightColor: '#ffeebb',
    ambientColor: '#101010',
    rimColor: '#00ffff', // Cyan rim for modern look
    rimIntensity: 1.0,
    specularStrength: 0.9,
  },
  natural: {
    name: 'Natural',
    lightPos: [-1, 2, 2],
    lightColor: '#fff0d0', // Warm sun
    ambientColor: '#606060',
    rimColor: '#ffddaa',
    rimIntensity: 0.2,
    specularStrength: 0.2,
  }
};

function MasterpiecePlane({
  imageUrl,
  analysis,
  lightingKey,
  zoomLevel
}: {
  imageUrl: string;
  analysis?: ClothingStyleAnalysis | null;
  lightingKey: string;
  zoomLevel: number;
}) {
  const materialRef = useRef<any>(null);
  const texture = useTexture(imageUrl);
  const { viewport } = useThree();

  // Adjust plane size to match image aspect ratio while fitting in viewport
  const img = texture.image;
  const aspect = img ? img.width / img.height : 1;

  // Fit logic: contain within viewport with margin
  const margin = 0.9;
  let width = viewport.width * margin;
  let height = width / aspect;

  if (height > viewport.height * margin) {
    height = viewport.height * margin;
    width = height * aspect;
  }

  const fabricType = useMemo(() => {
    const type = analysis?.materialType;
    switch(type) {
      case 'silk': case 'polyester': return 1.0;
      case 'denim': return 2.0;
      case 'knit': return 3.0; // Wool/Knit
      case 'leather': return 4.0;
      case 'cotton': case 'linen': default: return 0.0;
    }
  }, [analysis]);

  const preset = LIGHTING_PRESETS[lightingKey] || LIGHTING_PRESETS.studio;

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      // Smoothly interpolate zoom
      materialRef.current.uZoom = THREE.MathUtils.lerp(materialRef.current.uZoom, zoomLevel, 0.1);

      // Interpolate lighting values for smooth transitions
      // We use a dummy vector/color for lerping to avoid creating new objects every frame
      // Ideally we should store current values in refs but for this demo standard lerp on material uniforms works if we update them manually

      const currentLightPos = materialRef.current.uLightPos;
      currentLightPos.lerp(new THREE.Vector3(...preset.lightPos), 0.05);

      const currentLightColor = materialRef.current.uLightColor;
      currentLightColor.lerp(new THREE.Color(preset.lightColor), 0.05);

      const currentAmbient = materialRef.current.uAmbientColor;
      currentAmbient.lerp(new THREE.Color(preset.ambientColor), 0.05);

      const currentRim = materialRef.current.uRimColor;
      currentRim.lerp(new THREE.Color(preset.rimColor), 0.05);

      materialRef.current.uRimIntensity = THREE.MathUtils.lerp(materialRef.current.uRimIntensity, preset.rimIntensity, 0.05);
      materialRef.current.uSpecularStrength = THREE.MathUtils.lerp(materialRef.current.uSpecularStrength, preset.specularStrength, 0.05);
    }
  });

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[width, height, 128, 128]} />
      {/* @ts-ignore */}
      <masterpieceMaterial
        ref={materialRef}
        uTexture={texture}
        uFabricType={fabricType}
        transparent
      />
    </mesh>
  );
}

export function MasterpieceViewer({
  imageUrl,
  clothingAnalysis,
  lightingPreset,
  isMacroMode,
}: {
  imageUrl: string;
  clothingAnalysis?: ClothingStyleAnalysis | null;
  lightingPreset: string;
  isMacroMode: boolean;
}) {
  return (
    <div className="w-full h-full relative bg-void-black overflow-hidden rounded-lg">
       <Canvas
         camera={{ position: [0, 0, 2.5], fov: 45 }}
         gl={{
           antialias: true,
           alpha: true,
           preserveDrawingBuffer: true
         }}
         dpr={[1, 2]}
       >
         <React.Suspense fallback={null}>
            <MasterpiecePlane
              imageUrl={imageUrl}
              analysis={clothingAnalysis}
              lightingKey={lightingPreset}
              zoomLevel={isMacroMode ? 2.5 : 1.0}
            />
         </React.Suspense>
         <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={false} // Keep it 2.5D, no rotation
            minZoom={1}
            maxZoom={4}
         />
       </Canvas>

       {/* Overlay info */}
       <div className="absolute top-4 right-4 bg-black/60 text-soft-gray text-[10px] px-3 py-2 rounded-lg backdrop-blur-md pointer-events-none border border-white/10">
          <p className="font-bold text-white mb-1">Masterpiece Engine Active</p>
          <div className="space-y-0.5">
             <p>Material: <span className="text-cyber-lime">{clothingAnalysis?.materialType || 'Standard'}</span></p>
             <p>Texture: <span className="text-cyber-lime">2.5D Displacement</span></p>
             <p>Lighting: <span className="text-cyber-lime">{LIGHTING_PRESETS[lightingPreset]?.name || 'Custom'}</span></p>
          </div>
       </div>
    </div>
  );
}
