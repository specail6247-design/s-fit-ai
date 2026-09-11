'use client';
import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { FabricMaterial } from './FabricMaterial';
import { StudioStage } from './StudioStage';
import { FabricType } from './types';
import * as THREE from 'three';

export default function MasterpieceFit() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [garmentImage, setGarmentImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [fabric, setFabric] = useState<FabricType>('silk');

  // Lens (Hyper-Zoom) Tracking
  const lensX = useMotionValue(0);
  const lensY = useMotionValue(0);
  const springX = useSpring(lensX, { stiffness: 100, damping: 20 });
  const springY = useSpring(lensY, { stiffness: 100, damping: 20 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    // Normalize to -1 to 1 for 3D interaction if needed, or just pixels
    lensX.set(x - 50); // 50 is half the lens width
    lensY.set(y - 50);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setter(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = async () => {
    if (!userImage || !garmentImage) return alert("Please upload both User Photo and Garment.");

    setIsProcessing(true);
    setResultImage(null);
    setVideoUrl(null);

    try {
      // 1. Static VTON
      const vtonRes = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userPhotoUrl: userImage, garmentImageUrl: garmentImage, category: 'upper_body' })
      });
      const vtonData = await vtonRes.json();
      if (!vtonData.imageUrl) throw new Error(vtonData.error || "VTON failed");

      setResultImage(vtonData.imageUrl);

      // 2. Motion Synthesis
      const motionRes = await fetch('/api/cinematic-try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: vtonData.imageUrl })
      });
      const motionData = await motionRes.json();
      if (motionData.videoUrl) {
         setVideoUrl(motionData.videoUrl);
      }
    } catch (err) {
      console.error(err);
      alert("Virtual try-on failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleShare = async () => {
     const url = videoUrl || resultImage;
     if (!url) return;
     if (navigator.share) {
         try {
             await navigator.share({ url: url });
         } catch (err) {
             console.error("Share failed", err);
         }
     } else {
         const a = document.createElement('a');
         a.href = url;
         a.download = "masterpiece_fit";
         a.click();
     }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col overflow-hidden">
        <header className="p-8 border-b border-white/10 flex justify-between items-center z-20">
            <div>
              <h1 className="text-4xl font-bold tracking-widest font-[Cinzel]">M_FIT</h1>
              <p className="text-xs text-luxury-gold tracking-[0.3em] uppercase mt-2 font-[Space_Grotesk]">Masterpiece Try-On</p>
            </div>
            <div className="flex gap-4">
                <button className="px-4 py-2 border border-white/20 text-xs tracking-widest hover:bg-white/10 transition-colors uppercase">High-End Luxury</button>
                <button className="px-4 py-2 border border-white/20 text-xs tracking-widest hover:bg-white/10 transition-colors uppercase">K-Fashion</button>
            </div>
        </header>

        <div className="flex-1 flex relative">
            {/* Left Controls */}
            <div className="w-1/3 p-8 border-r border-white/10 flex flex-col gap-8 z-20 bg-black/50 backdrop-blur-md">
                 {/* Uploads */}
                 <div className="space-y-4">
                     <label className="text-xs font-bold text-luxury-gold uppercase tracking-widest">1. Your Canvas</label>
                     <input type="file" onChange={(e) => handleFileUpload(e, setUserImage)} className="text-xs w-full" />
                     {userImage && <img src={userImage} className="h-20 object-cover opacity-50" />}

                     <label className="text-xs font-bold text-luxury-gold uppercase tracking-widest mt-4 block">2. Garment & Accessory</label>
                     <input type="file" onChange={(e) => handleFileUpload(e, setGarmentImage)} className="text-xs w-full" />
                     {garmentImage && <img src={garmentImage} className="h-20 object-cover opacity-50" />}

                     <label className="text-xs font-bold text-luxury-gold uppercase tracking-widest mt-4 block">3. Material Texture</label>
                     <select className="bg-black border border-white/20 text-white text-xs p-2 w-full uppercase" value={fabric} onChange={(e)=>setFabric(e.target.value as FabricType)}>
                        <option value="silk">Silk</option>
                        <option value="denim">Denim</option>
                        <option value="wool">Wool</option>
                        <option value="leather">Leather</option>
                     </select>
                 </div>

                 <button
                   onClick={handleTryOn}
                   className="mt-auto py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-luxury-gold transition-colors"
                   disabled={isProcessing}
                 >
                   {isProcessing ? 'Synthesizing...' : 'Render Masterpiece'}
                 </button>
            </div>

            {/* Right Display Area */}
            <div
              className="flex-1 relative cursor-crosshair overflow-hidden"
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
               {/* 3D Texture Engine Base Layer */}
               <div className="absolute inset-0 opacity-30 pointer-events-none">
                 {resultImage && (
                   <ErrorBoundary fallback={<div>3D Failed</div>}>
                      <Canvas shadows camera={{ position: [0, 0, 5] }}>
                          <StudioStage fabricType={fabric} />
                          <mesh>
                               <planeGeometry args={[10, 10, 128, 128]} />
                               <FabricMaterial
                                  textureUrl={resultImage}
                                  fabricType={fabric}
                                  transparent={false}
                               />
                          </mesh>
                      </Canvas>
                   </ErrorBoundary>
                 )}
               </div>

               {/* Render Result Overlay */}
               {videoUrl ? (
                   <video src={videoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover relative z-10" />
               ) : resultImage ? (
                   <img src={resultImage} className="w-full h-full object-cover relative z-10" />
               ) : null}

               {/* Hyper-Zoom Lens */}
               {isHovering && resultImage && (
                   <motion.div
                     style={{ x: springX, y: springY }}
                     className="absolute w-[100px] h-[100px] border-2 border-luxury-gold rounded-full pointer-events-none z-20 overflow-hidden shadow-[0_0_20px_rgba(201,176,55,0.5)] backdrop-blur-sm bg-no-repeat bg-center"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                   >
                        <div className="w-full h-full" style={{
                            backgroundImage: `url(${resultImage})`,
                            backgroundSize: '1000%', // extreme zoom
                            backgroundPosition: 'center'
                        }} />
                   </motion.div>
               )}

               {/* Cinematic Share */}
               {(videoUrl || resultImage) && (
                   <button
                     onClick={handleShare}
                     className="absolute bottom-8 right-8 z-30 bg-black/80 border border-luxury-gold text-luxury-gold px-6 py-3 uppercase tracking-widest text-xs hover:bg-luxury-gold hover:text-black transition-all"
                   >
                       Cinematic Share
                   </button>
               )}
            </div>
        </div>
    </div>
  );
}
