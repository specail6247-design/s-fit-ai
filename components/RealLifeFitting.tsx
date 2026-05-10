import Image from 'next/image';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import CinematicViewer from './CinematicViewer';

// Dynamically import the 3D scene with SSR disabled
const AvatarCanvas = dynamic(() => import('./AvatarCanvas'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 flex items-center justify-center text-[#007AFF] font-mono text-xs animate-pulse">LOADING 3D ENGINE...</div>
});

// --- MAIN CONTROL COMPONENT ---
export default function RealLifeFitting() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [garmentImage, setGarmentImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [resultVideo, setResultVideo] = useState<string | null>(null);
  const [showCinematic, setShowCinematic] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mode, setMode] = useState<'standard' | 'cinematic'>('cinematic');

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
    setResultImage(null);
    setResultVideo(null);

    // Simulate progress bar (longer for video)
    const totalTime = mode === 'cinematic' ? 30000 : 10000;
    const intervalTime = 500;
    const step = 100 / (totalTime / intervalTime);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + step;
      });
    }, intervalTime);

    try {
      const endpoint = mode === 'cinematic' ? '/api/cinematic-try-on' : '/api/try-on';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhotoUrl: userImage,
          garmentImageUrl: garmentImage,
          category: 'tops' // Default for demo
        })
      });

      const data = await res.json();
      
      clearInterval(interval);
      setProgress(100);
      
      if (data.imageUrl) {
        setResultImage(data.imageUrl);
      }

      if (data.videoUrl && mode === 'cinematic') {
         setResultVideo(data.videoUrl);
         setShowCinematic(true);
      } else if (data.imageUrl && mode === 'cinematic') {
          // Fallback to showing image in cinematic viewer if video fails but image works
         setShowCinematic(true);
      }

      if (!data.imageUrl && !data.videoUrl) {
         throw new Error(data.error || "Try-On Failed");
      }
    } catch (err) {
      clearInterval(interval);
      console.error(err);
      console.log("Using demo mode fallback");
      setResultImage("https://pub-83c5db439b40468498f97946200806f7.r2.dev/mock-result-sfit.png"); // Fallback
      if (mode === 'cinematic') {
         // Add a mock video fallback
         setResultVideo("https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4");
         setShowCinematic(true);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex overflow-hidden">
      
      {/* LEFT PANEL: CONTROLS */}
      <div className="w-1/3 min-w-[400px] h-full p-8 flex flex-col z-10 glass-panel border-r border-white/10 relative">
        {/* Background Ambience */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00ffff]/5 to-[#007AFF]/10 pointer-events-none" />
        
        <header className="mb-10 relative z-10">
          <h1 className="text-4xl font-black tracking-tighter italic">
            S_FIT <span className="text-[#007AFF]">NEO</span>
          </h1>
          <p className="text-xs text-gray-400 tracking-[0.3em] uppercase mt-2">
            Professional Virtual Fitting
          </p>
        </header>

        <div className="space-y-8 relative z-10 flex-1 overflow-y-auto">
          {/* Mode Selector */}
          <div className="flex bg-black/40 p-1 rounded-xl border border-white/10">
             <button
               onClick={() => setMode('standard')}
               className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${mode === 'standard' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
             >
               STANDARD (FAST)
             </button>
             <button
               onClick={() => setMode('cinematic')}
               className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${mode === 'cinematic' ? 'bg-gradient-to-r from-[#007AFF]/20 to-purple-500/20 text-white border border-[#007AFF]/30' : 'text-gray-500 hover:text-gray-300'}`}
             >
               <span>🎬</span> CINEMATIC
             </button>
          </div>

          {/* User Photo Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#007AFF] uppercase">01. Identification</label>
            <div className="border border-white/20 bg-black/40 rounded-xl p-4 hover:border-[#007AFF] transition-colors group">
              <input type="file" onChange={(e) => handleFileUpload(e, setUserImage)} className="hidden" id="user-upload" />
              <label htmlFor="user-upload" className="cursor-pointer flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden border border-white/10 relative">
                  {userImage ? <Image src={userImage} alt="User" fill className="object-cover" unoptimized /> : <span className="text-2xl">👤</span>}
                </div>
                <div>
                  <div className="text-sm font-bold group-hover:text-white text-gray-300">Upload User Photo</div>
                  <div className="text-[10px] text-gray-500">Supports JPG, PNG (Max 5MB)</div>
                </div>
              </label>
            </div>
          </div>

          {/* Garment Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#007AFF] uppercase">02. Target Garment</label>
            <div className="border border-white/20 bg-black/40 rounded-xl p-4 hover:border-[#007AFF] transition-colors group">
              <input type="file" onChange={(e) => handleFileUpload(e, setGarmentImage)} className="hidden" id="garment-upload" />
              <label htmlFor="garment-upload" className="cursor-pointer flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden border border-white/10 relative">
                  {garmentImage ? <Image src={garmentImage} alt="Garment" fill className="object-cover" unoptimized /> : <span className="text-2xl">👕</span>}
                </div>
                <div>
                  <div className="text-sm font-bold group-hover:text-white text-gray-300">Select Garment</div>
                  <div className="text-[10px] text-gray-500">Front view preferred</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 relative z-10">
          {isProcessing ? (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-[#007AFF] font-mono">
                <span>{mode === 'cinematic' ? 'GENERATING HOLLYWOOD PHYSICS...' : 'PROCESSING DATA...'}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full ${mode === 'cinematic' ? 'bg-gradient-to-r from-[#007AFF] to-purple-500' : 'bg-[#007AFF]'}`}
                  initial={{ width: 0 }} 
                  animate={{ width: `${progress}%` }} 
                />
              </div>
              {mode === 'cinematic' && progress > 50 && (
                <div className="text-center text-[10px] text-purple-400 font-mono animate-pulse mt-2">
                   Synthesizing motion vectors...
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={handleTryOn}
              className={`w-full py-4 font-bold rounded-xl shadow-[0_0_20px_rgba(0,122,255,0.4)] transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 ${mode === 'cinematic' ? 'bg-gradient-to-r from-[#007AFF] to-purple-600 hover:from-[#005bb5] hover:to-purple-700 text-white' : 'bg-[#007AFF] hover:bg-[#005bb5] text-white'}`}
            >
              <span>{mode === 'cinematic' ? '🎬' : '⚡️'}</span> {mode === 'cinematic' ? 'GENERATE CINEMATIC TRY-ON' : 'TRY IT ON'}
            </button>
          )}
          
          <div className="mt-4 flex gap-2">
             <a href="/spa" className="flex-1 py-3 border border-white/20 hover:bg-white/10 rounded-xl text-xs font-bold text-center flex items-center justify-center tracking-widest uppercase transition-colors">
               SPA Line
             </a>
             <a href="/luxury" className="flex-1 py-3 border border-white/20 hover:bg-white/10 rounded-xl text-xs font-bold text-center flex items-center justify-center tracking-widest uppercase transition-colors">
               Luxury Line
             </a>
          </div>

        </div>
      </div>

      {/* RIGHT PANEL: 3D RESULT & ENVIRONMENT */}
      <div className="flex-1 relative bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        {/* Background Image (Night City Vibe) */}
        <div className="absolute inset-0 opacity-40 z-0">
           {/* Placeholder for Night City HDRI background visual */}
           <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black"></div>
        </div>

        {/* 3D Canvas (Safe Load) */}
        <div className="absolute inset-0 z-10">
          <ErrorBoundary fallback={
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 space-y-4">
              <span className="text-4xl opacity-50">🤖</span>
              <p className="text-xs font-mono">3D VISUALIZATION UNAVAILABLE</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 text-xs"
              >
                RELOAD ENGINE
              </button>
            </div>
          }>
            <AvatarCanvas />
          </ErrorBoundary>
        </div>

        {/* Result Overlay (If success and not cinematic) */}
        {resultImage && !isProcessing && !showCinematic && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl"
          >
            <div className="relative group">
              <div className="relative w-full h-[70vh]"><Image src={resultImage} alt="Result" fill className="rounded-xl object-contain shadow-2xl" unoptimized /></div>
              <button 
                onClick={() => setResultImage(null)} 
                className="absolute top-4 right-4 bg-black/60 text-white rounded-full p-2 hover:bg-[#007AFF] transition-colors"
              >
                ✕ Close
              </button>

              {resultVideo && (
                 <button
                    onClick={() => setShowCinematic(true)}
                    className="absolute top-4 left-4 bg-purple-600/80 text-white px-4 py-2 rounded-lg text-xs font-bold font-mono border border-purple-400 hover:bg-purple-500 transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                 >
                    🎬 VIEW CINEMATIC
                 </button>
              )}

              <div className="absolute bottom-4 left-4 bg-black/60 text-[#007AFF] px-3 py-1 rounded-md text-xs font-bold font-mono border border-[#007AFF]/30">
                AI GENERATED_
              </div>
            </div>
          </motion.div>
        )}

        {/* Cinematic Viewer */}
        {showCinematic && (
           <CinematicViewer
              videoUrl={resultVideo}
              imageUrl={resultImage}
              onClose={() => setShowCinematic(false)}
           />
        )}
      </div>
    </div>
  );
}
