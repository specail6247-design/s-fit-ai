'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { XR, createXRStore, useXRHitTest } from '@react-three/xr';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';
import { getAllItems } from '@/data/mockData';

// Create the XR store
const store = createXRStore();

// --- SUB-COMPONENTS ---

function ShadowCatcher() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[10, 10]} />
      <shadowMaterial transparent opacity={0.4} />
    </mesh>
  );
}

function OcclusionLeg() {
  // A cylinder representing the leg/ankle, used to mask out the back of the shoe
  // Positioned relative to the shoe
  return (
    <mesh position={[0, 0.15, -0.08]} renderOrder={-1} rotation={[0.2, 0, 0]}>
      <cylinderGeometry args={[0.06, 0.05, 0.3, 32]} />
      <meshBasicMaterial colorWrite={false} />
    </mesh>
  );
}

interface ShoeModelProps {
  url: string;
}

function ShoeModel({ url }: ShoeModelProps) {
  const { scene } = useGLTF(url);
  const clone = React.useMemo(() => {
    const c = scene.clone();
    c.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
    return c;
  }, [scene]);

  return (
    <group>
      <primitive object={clone} scale={1} />
      <OcclusionLeg />
      <ShadowCatcher />
    </group>
  );
}

function ARSceneContent({ onPlace, isPlaced }: { onPlace: (matrix: THREE.Matrix4) => void, isPlaced: boolean }) {
  const reticleRef = useRef<THREE.Mesh>(null);
  const [isHovering, setIsHovering] = useState(false);
  const matrixHelper = useRef(new THREE.Matrix4());

  useXRHitTest((results, getWorldMatrix) => {
    if (isPlaced) return;

    if (results.length > 0 && reticleRef.current) {
      const hit = results[0];
      // Get the matrix for this hit
      getWorldMatrix(matrixHelper.current, hit);

      // Decompose to apply to reticle
      matrixHelper.current.decompose(reticleRef.current.position, reticleRef.current.quaternion, reticleRef.current.scale);

      setIsHovering(true);
    } else {
      setIsHovering(false);
    }
  }, 'viewer');

  useEffect(() => {
    if (isPlaced) return;
    const handleTap = () => {
      if (isHovering && reticleRef.current) {
         const matrix = new THREE.Matrix4();
         matrix.compose(reticleRef.current.position, reticleRef.current.quaternion, reticleRef.current.scale);
         onPlace(matrix);
      }
    };

    // In @react-three/xr v6 with DOM overlay, clicks pass through to the overlay element (body)
    window.addEventListener('click', handleTap);
    return () => window.removeEventListener('click', handleTap);
  }, [isHovering, isPlaced, onPlace]);

  if (isPlaced) return null;

  return (
    <group>
      <mesh ref={reticleRef} rotation={[-Math.PI / 2, 0, 0]} visible={isHovering}>
        <ringGeometry args={[0.1, 0.12, 32]} />
        <meshBasicMaterial color="#CCFF00" />
      </mesh>
      {/* Light coming from top-ish */}
      <directionalLight position={[0, 5, 2]} intensity={1.5} castShadow />
      <ambientLight intensity={0.5} />
    </group>
  );
}

// --- MAIN COMPONENT ---

export default function ARFootwearMode() {
  const { selectedItem } = useStore();
  const [placedItem, setPlacedItem] = useState<{ matrix: THREE.Matrix4, url: string } | null>(null);

  // Fallback to the first shoe if none selected
  const activeItem = selectedItem?.category === 'shoes'
    ? selectedItem
    : getAllItems().find(i => i.category === 'shoes');

  const handlePlace = (matrix: THREE.Matrix4) => {
     if (activeItem?.modelUrl) {
       setPlacedItem({ matrix, url: activeItem.modelUrl });
     }
  };

  const handleReset = () => {
    setPlacedItem(null);
  };

  const handleStartAR = () => {
    store.enterAR('immersive-ar', {
        requiredFeatures: ['hit-test'],
        optionalFeatures: ['dom-overlay'],
        domOverlay: { root: document.body }
    });
  };

  return (
    <div className="w-full h-screen bg-black relative">
      <button
        onClick={handleStartAR}
        className="ar-button"
        style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#CCFF00',
            color: 'black',
            fontWeight: 'bold',
            padding: '12px 24px',
            borderRadius: '24px',
            border: 'none',
            zIndex: 50,
        }}
      >
        START AR SNEAKER DROP
      </button>

      <Canvas>
        <XR store={store}>
          <ARSceneContent onPlace={handlePlace} isPlaced={!!placedItem} />

          {placedItem && (
            <group>
               {/* Apply the matrix to position/rotate the shoe */}
               <primitive object={new THREE.Group()} >
                  <group
                    position={new THREE.Vector3().setFromMatrixPosition(placedItem.matrix)}
                    quaternion={new THREE.Quaternion().setFromRotationMatrix(placedItem.matrix)}
                  >
                     <ShoeModel url={placedItem.url} />
                  </group>
               </primitive>

               {/* Lights for the model */}
               <directionalLight position={[2, 4, 2]} intensity={2} castShadow />
               <ambientLight intensity={1} />
            </group>
          )}
        </XR>
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-0 left-0 w-full p-4 pointer-events-none z-40">
        <div className="flex justify-between items-start">
            <div>
                <h1 className="text-white font-bold text-xl italic drop-shadow-md">S_FIT <span className="text-cyber-lime">DROP</span></h1>
                <p className="text-xs text-soft-gray">WebXR Footwear Edition</p>
            </div>

            {activeItem && (
                <div className="bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 max-w-[150px]">
                    <p className="text-cyber-lime font-bold text-xs">{activeItem.brand}</p>
                    <p className="text-white text-xs truncate">{activeItem.name}</p>
                    <p className="text-soft-gray text-[10px]">${activeItem.price}</p>
                </div>
            )}
        </div>
      </div>

      {placedItem && (
          <div className="absolute bottom-32 left-0 w-full flex justify-center pointer-events-auto z-40">
             <button
               onClick={handleReset}
               className="bg-red-500/80 text-white px-6 py-2 rounded-full font-bold text-sm backdrop-blur-md"
             >
               RESET POSITION
             </button>
          </div>
      )}

      {!placedItem && (
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-white/50 text-sm font-bold animate-pulse z-30">
            SCAN FLOOR & TAP TO PLACE
         </div>
      )}
    </div>
  );
}
