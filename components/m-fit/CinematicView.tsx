'use client';

import React, { useState } from 'react';
import { FabricType } from '@/components/masterpiece/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { FabricMaterial } from '@/components/masterpiece/FabricMaterial';
import { StudioStage } from '@/components/masterpiece/StudioStage';
import * as THREE from 'three';

interface Props {
  videoUrl: string;
  materialType: FabricType;
}

export function CinematicView({ videoUrl, materialType }: Props) {
  const [showHyperZoom, setShowHyperZoom] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Masterpiece Fit',
          text: 'Check out my new cinematic look!',
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: download video or copy link
      alert('Sharing is not supported on this browser. You can download the video directly.');
    }
  };

  // Mock texture for the Hyper-Zoom view
  // In a real app, this would be a high-res normal map / texture map based on the specific material
  const mockTextureUrl = '/accessories/chanel_bag.png'; // Fallback texture

  return (
    <div className="relative w-full h-full group">
      {/* Main Video Layer */}
      <video
        src={videoUrl}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay Controls */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-20">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setShowHyperZoom(!showHyperZoom)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-full backdrop-blur-md transition-all duration-500 ${
              showHyperZoom
                ? 'border-[#C9B037] bg-[#C9B037]/20 text-[#C9B037]'
                : 'border-white/20 bg-black/40 text-white hover:border-[#C9B037]/50'
            }`}
          >
            <span className="material-symbols-outlined text-sm">macro_auto</span>
            <span className="text-[10px] font-bold tracking-widest uppercase">Hyper-Zoom</span>
          </button>
        </div>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-6 py-3 bg-[#C9B037] text-black font-bold tracking-[0.2em] text-xs uppercase hover:bg-white transition-colors duration-500 rounded-sm"
        >
          <span className="material-symbols-outlined text-sm">ios_share</span>
          Cinematic Share
        </button>
      </div>

      {/* Hyper-Zoom Micro-Fiber Overlay */}
      <AnimatePresence>
        {showHyperZoom && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="absolute top-6 left-6 w-64 h-64 border border-[#C9B037]/50 rounded-full overflow-hidden bg-black z-30 shadow-[0_0_40px_rgba(201,176,55,0.2)] backdrop-blur-xl"
          >
            {/* Crosshair indicator */}
            <div className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center">
               <div className="w-12 h-12 border border-[#C9B037]/50 rounded-full"></div>
               <div className="absolute w-full h-px bg-[#C9B037]/20"></div>
               <div className="absolute h-full w-px bg-[#C9B037]/20"></div>
            </div>

            {/* Real 3D Material View */}
            <Canvas camera={{ position: [0, 0, 2], fov: 45 }}>
              <StudioStage fabricType={materialType} />
              <mesh>
                <sphereGeometry args={[1, 64, 64]} />
                <FabricMaterial
                  textureUrl={mockTextureUrl}
                  fabricType={materialType}
                />
              </mesh>
            </Canvas>

            <div className="absolute bottom-4 w-full text-center z-40">
               <p className="text-[#C9B037] text-[9px] font-bold tracking-[0.3em] uppercase bg-black/50 inline-block px-2 py-1 rounded backdrop-blur-sm">
                 Micro-Fiber View: {materialType}
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
