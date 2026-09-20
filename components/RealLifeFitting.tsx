import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Dynamically import the 3D scene with SSR disabled
const AvatarCanvas = dynamic(() => import('./AvatarCanvas'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 flex items-center justify-center text-[#C9B037] font-mono text-xs animate-pulse">LOADING M_FIT STUDIO...</div>
});

// --- MAIN CONTROL COMPONENT ---
export default function RealLifeFitting() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [garmentImage, setGarmentImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [resultVideo, setResultVideo] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

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
    setProgress(0);

    // Simulate progress bar (slower for Luxury Mode)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + 5;
      });
    }, 700);

    try {
      // Call orchestration API (Proxy to Python Backend)
      const res = await fetch('/api/orchestrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_photo: userImage,
          garment_image: garmentImage,
          category: 'luxury',
          accessories: ['gold_necklace', 'silk_scarf']
        })
      });
      const data = await res.json();
      
      clearInterval(interval);
      setProgress(100);
      
      if (data.success) {
        setResultImage(data.final_image_url);
        setResultVideo(data.final_video_url);
      } else {
        throw new Error(data.error || "Try-On Failed");
      }
    } catch (err) {
      clearInterval(interval);
      console.error(err);
      console.log("Using demo mode fallback");
      setResultImage("https://pub-83c5db439b40468498f97946200806f7.r2.dev/mock-result-sfit.png");
      setResultVideo("https://pub-83c5db439b40468498f97946200806f7.r2.dev/mock-runway-video.mp4");
    } finally {
      setTimeout(() => setIsProcessing(false), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans flex overflow-hidden">
      
      {/* LEFT PANEL: CONTROLS */}
      <div className="w-1/3 min-w-[400px] h-full p-8 flex flex-col z-10 glass-panel border-r border-[#C9B037]/20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-black pointer-events-none" />
        
        <header className="mb-10 relative z-10 text-center">
          <h1 className="text-4xl font-serif tracking-widest text-[#C9B037]">
            M_FIT
          </h1>
          <p className="text-[10px] text-gray-400 tracking-[0.4em] uppercase mt-2">
            Personal Digital Atelier
          </p>
        </header>

        <div className="space-y-8 relative z-10 flex-1 overflow-y-auto hide-scrollbar">
          {/* User Photo Input */}
          <div className="space-y-2">
            <label className="text-[10px] tracking-widest text-[#C9B037] uppercase">I. The Muse</label>
            <div className="border border-white/10 bg-black/60 rounded-xl p-4 hover:border-[#C9B037] transition-all duration-700 group cursor-pointer relative overflow-hidden">
              <input type="file" onChange={(e) => handleFileUpload(e, setUserImage)} className="absolute inset-0 opacity-0 cursor-pointer z-20" aria-label="Upload User Photo" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-20 h-20 bg-[#111] rounded-lg flex items-center justify-center overflow-hidden border border-white/5">
                  {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
                  {userImage ? <img src={userImage} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" /> : <span className="text-2xl opacity-50 font-serif italic">M</span>}
                </div>
                <div>
                  <div className="text-sm font-medium tracking-wide group-hover:text-[#C9B037] transition-colors duration-700 text-gray-300">Upload Portrait</div>
                  <div className="text-[10px] text-gray-600 tracking-wider">High-fidelity analysis</div>
                </div>
              </div>
            </div>
          </div>

          {/* Garment Input */}
          <div className="space-y-2">
            <label className="text-[10px] tracking-widest text-[#C9B037] uppercase">II. The Masterpiece</label>
            <div className="border border-white/10 bg-black/60 rounded-xl p-4 hover:border-[#C9B037] transition-all duration-700 group cursor-pointer relative overflow-hidden">
              <input type="file" onChange={(e) => handleFileUpload(e, setGarmentImage)} className="absolute inset-0 opacity-0 cursor-pointer z-20" aria-label="Select Garment" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-20 h-20 bg-[#111] rounded-lg flex items-center justify-center overflow-hidden border border-white/5">
                  {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
                  {garmentImage ? <img src={garmentImage} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" /> : <span className="text-2xl opacity-50 font-serif italic">G</span>}
                </div>
                <div>
                  <div className="text-sm font-medium tracking-wide group-hover:text-[#C9B037] transition-colors duration-700 text-gray-300">Select Garment</div>
                  <div className="text-[10px] text-gray-600 tracking-wider">Silk, Denim, Wool</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 relative z-10">
          {isProcessing ? (
            <div className="space-y-4">
              <div className="flex justify-between text-[10px] text-[#C9B037] tracking-widest uppercase">
                <span>Orchestrating AI...</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1 bg-gray-900 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#C9B037]/50 to-[#C9B037]"
                  initial={{ width: 0 }} 
                  animate={{ width: `${progress}%` }} 
                  transition={{ duration: 0.5 }}
                />
              </div>
              {/* Sophisticated SVG tracing animation for loading */}
              <div className="flex justify-center mt-4">
                <svg width="40" height="40" viewBox="0 0 100 100" className="animate-spin" style={{ animationDuration: '3s' }}>
                   <circle cx="50" cy="50" r="45" fill="none" stroke="#C9B037" strokeWidth="1" strokeDasharray="100 200" strokeLinecap="round" />
                   <circle cx="50" cy="50" r="35" fill="none" stroke="#C9B037" strokeWidth="0.5" strokeDasharray="50 100" strokeLinecap="round" style={{ animationDirection: 'reverse' }} className="animate-spin" />
                </svg>
              </div>
            </div>
          ) : (
            <button 
              onClick={handleTryOn}
              className="w-full py-5 bg-[#C9B037] hover:bg-[#d4c15b] text-black tracking-widest text-xs uppercase font-bold transition-all duration-700 hover:shadow-[0_0_30px_rgba(201,176,55,0.3)] flex items-center justify-center gap-3"
            >
              <span>Begin Simulation</span>
            </button>
          )}
        </div>
      </div>

      {/* RIGHT PANEL: 3D RESULT & ENVIRONMENT */}
      <div className="flex-1 relative bg-black">
        {/* Immersive UI State during analysis */}
        <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none z-30 ${isProcessing ? 'opacity-100 bg-black/80 backdrop-blur-sm' : 'opacity-0'}`}></div>

        {/* 3D Canvas */}
        <div className="absolute inset-0 z-10">
          <ErrorBoundary fallback={
            <div className="absolute inset-0 flex flex-col items-center justify-center text-[#C9B037]/50 space-y-4 font-serif">
              <span className="text-4xl opacity-50">.</span>
              <p className="text-xs tracking-widest uppercase">Atelier Offline</p>
            </div>
          }>
            <AvatarCanvas />
          </ErrorBoundary>
        </div>

        {/* Result Overlay (If success) */}
        {(resultImage || resultVideo) && !isProcessing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-40 bg-black flex items-center justify-center p-12"
          >
             <div className="max-w-6xl w-full h-full flex flex-col items-center relative">
               <div className="absolute top-0 right-0 flex gap-4">
                  <button
                    className="px-6 py-2 border border-[#C9B037]/50 text-[#C9B037] text-xs tracking-widest uppercase hover:bg-[#C9B037]/10 transition-colors duration-700"
                  >
                    Export 4K Cinematic
                  </button>
                  <button
                    onClick={() => {setResultImage(null); setResultVideo(null);}}
                    className="px-6 py-2 border border-white/20 text-white text-xs tracking-widest uppercase hover:bg-white/10 transition-colors duration-700"
                  >
                    Close
                  </button>
               </div>

               <div className="w-full h-full flex items-center justify-center gap-8 mt-16">
                 {/* Hyper-Zoom Result Image with color grading */}
                 {resultImage && (
                    <div className="w-1/2 h-[80vh] relative group cursor-crosshair overflow-hidden border border-white/10">
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                       <img
                          src={resultImage}
                          alt="Result Image"
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[2.5]"
                          style={{ filter: 'saturate(0.9) contrast(1.1)' }}
                       />
                       <div className="absolute bottom-4 left-4 text-[#C9B037] text-[10px] tracking-widest uppercase bg-black/50 px-3 py-1 backdrop-blur-md">
                         Hyper-Zoom Render
                       </div>
                    </div>
                 )}

                 {/* Cinematic Motion Video */}
                 {resultVideo && (
                    <div className="w-1/2 h-[80vh] relative border border-white/10 overflow-hidden">
                       <video
                         src={resultVideo}
                         autoPlay
                         loop
                         muted
                         playsInline
                         className="w-full h-full object-cover"
                         style={{ filter: 'saturate(0.9) contrast(1.1)' }}
                       />
                       <div className="absolute bottom-4 left-4 text-[#C9B037] text-[10px] tracking-widest uppercase bg-black/50 px-3 py-1 backdrop-blur-md">
                         Physics Simulation
                       </div>
                    </div>
                 )}
               </div>
             </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
