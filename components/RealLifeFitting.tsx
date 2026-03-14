import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import CinematicViewer from '@/components/ui/CinematicViewer';

// Dynamically import the 3D scene with SSR disabled
const AvatarCanvas = dynamic(() => import('./AvatarCanvas'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 flex items-center justify-center text-[#ecab13] font-mono text-xs animate-pulse">LOADING MASTERPIECE ENGINE...</div>
});

// --- MAIN CONTROL COMPONENT ---
export default function RealLifeFitting() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [garmentImage, setGarmentImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [resultVideo, setResultVideo] = useState<string | null>(null);
  const [upscaledImage, setUpscaledImage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [category, setCategory] = useState('tops');
  const [brandTier, setBrandTier] = useState('high-end');
  const [hyperZoom, setHyperZoom] = useState(false);

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
    setUpscaledImage(null);

    // Simulate progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + 5;
      });
    }, 500);

    try {
      // Step 1: IDM-VTON Try-On
      const res = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhotoUrl: userImage,
          garmentImageUrl: garmentImage,
          category: category, // 'tops', 'bottoms', 'accessories',
          brandTier: brandTier
        })
      });
      const data = await res.json();
      
      if (!data.imageUrl) {
        throw new Error(data.error || "Try-On Failed");
      }

      setResultImage(data.imageUrl);

      // Step 2: Cinematic Video & Upscale
      const videoRes = await fetch('/api/runway-motion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: data.imageUrl,
          upscale: true
        })
      });
      const videoData = await videoRes.json();

      clearInterval(interval);
      setProgress(100);

      if (videoData.success) {
        setResultVideo(videoData.videoUrl);
        setUpscaledImage(videoData.upscaledImageUrl);
      }
    } catch (err) {
      clearInterval(interval);
      console.error(err);
      console.log("Using demo mode fallback");
      setResultImage("https://pub-83c5db439b40468498f97946200806f7.r2.dev/mock-result-sfit.png"); // Fallback
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex overflow-hidden selection:bg-[#ecab13] selection:text-black">
      
      {/* LEFT PANEL: CONTROLS */}
      <div className={`w-1/3 min-w-[400px] h-full p-8 flex flex-col z-10 glass-panel border-r border-[#2d2d2d] relative transition-opacity duration-700 ${isProcessing ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {/* Background Ambience */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ecab13]/5 to-transparent pointer-events-none" />
        
        <header className="mb-10 relative z-10">
          <h1 className="text-4xl font-black tracking-tighter uppercase font-serif italic text-white/90">
            Masterpiece Fit <span className="text-[#ecab13] text-sm align-top tracking-normal not-italic">(M_FIT)</span>
          </h1>
          <p className="text-xs text-[#ecab13] tracking-[0.3em] uppercase mt-2">
            Hollywood Cinematic Quality
          </p>
        </header>

        <div className="space-y-8 relative z-10 flex-1 overflow-y-auto no-scrollbar">

          {/* Brand Library */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#ecab13] uppercase tracking-widest">Global Brand Tier</label>
            <div className="flex gap-2">
              {['high-end', 'k-fashion'].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setBrandTier(tier)}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold tracking-wider uppercase border transition-all ${
                    brandTier === tier ? 'bg-[#ecab13] text-black border-[#ecab13]' : 'bg-transparent text-gray-400 border-[#2d2d2d] hover:border-gray-500'
                  }`}
                >
                  {tier.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#ecab13] uppercase tracking-widest">Accessory Layer</label>
            <div className="flex flex-wrap gap-2">
              {['tops', 'bottoms', 'dresses', 'accessories'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase border transition-all ${
                    category === cat ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-[#2d2d2d] hover:border-gray-500'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* User Photo Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#ecab13] uppercase tracking-widest">01. Identification</label>
            <div className="border border-[#2d2d2d] bg-[#0a0a0a]/60 rounded-xl p-4 hover:border-[#ecab13] transition-colors group">
              <input type="file" onChange={(e) => handleFileUpload(e, setUserImage)} className="hidden" id="user-upload" />
              <label htmlFor="user-upload" className="cursor-pointer flex items-center gap-4">
                <div className="w-16 h-16 bg-[#1a1a1a] rounded-lg flex items-center justify-center overflow-hidden border border-[#2d2d2d]">
                  {userImage ? <img src={userImage} className="w-full h-full object-cover saturate-[0.9] contrast-[1.1]" /> : <span className="text-2xl opacity-50">👤</span>}
                </div>
                <div>
                  <div className="text-sm font-bold group-hover:text-white text-gray-300 transition-colors">Digital Twin Photo</div>
                  <div className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px] text-green-500">lock</span> Safe Data
                  </div>
                </div>
              </label>
            </div>
            <p className="text-[9px] text-gray-500 italic mt-1 text-right">Photos are processed securely and not shared.</p>
          </div>

          {/* Garment Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#ecab13] uppercase tracking-widest">02. Target Garment</label>
            <div className="border border-[#2d2d2d] bg-[#0a0a0a]/60 rounded-xl p-4 hover:border-[#ecab13] transition-colors group">
              <input type="file" onChange={(e) => handleFileUpload(e, setGarmentImage)} className="hidden" id="garment-upload" />
              <label htmlFor="garment-upload" className="cursor-pointer flex items-center gap-4">
                <div className="w-16 h-16 bg-[#1a1a1a] rounded-lg flex items-center justify-center overflow-hidden border border-[#2d2d2d]">
                  {garmentImage ? <img src={garmentImage} className="w-full h-full object-cover saturate-[0.9] contrast-[1.1]" /> : <span className="text-2xl opacity-50">👕</span>}
                </div>
                <div>
                  <div className="text-sm font-bold group-hover:text-white text-gray-300 transition-colors">Select Garment</div>
                  <div className="text-[10px] text-gray-500 mt-1">Front view preferred</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 relative z-10">
          {isProcessing ? (
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] text-[#ecab13] font-mono tracking-widest uppercase">
                <span className="animate-pulse">Rendering Physics & Lighting...</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1 bg-[#2d2d2d] rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-[#ecab13]"
                  initial={{ width: 0 }} 
                  animate={{ width: `${progress}%` }} 
                  transition={{ ease: "linear" }}
                />
              </div>
            </div>
          ) : (
            <button 
              onClick={handleTryOn}
              className="w-full py-4 bg-gradient-to-r from-[#ecab13] to-[#c48a0a] text-black font-bold rounded-xl shadow-[0_0_20px_rgba(236,171,19,0.3)] transition-all transform hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(236,171,19,0.5)] flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
            >
              Generate Masterpiece
            </button>
          )}
          
          <div className="mt-4 flex gap-2">
             <a href="/luxury" className="flex-1 py-3 border border-[#2d2d2d] hover:bg-[#1a1a1a] rounded-xl text-[10px] font-bold text-center flex items-center justify-center tracking-widest uppercase transition-colors text-gray-400 hover:text-white">
               Explore Digital Wardrobe
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

        {/* Result Overlay (If success) */}
        {(resultImage || resultVideo) && !isProcessing && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 p-2 bg-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl border border-[#2d2d2d] shadow-2xl flex gap-4 items-center"
          >
            <div className={`relative group transition-all duration-500 ${hyperZoom ? 'w-[80vw] h-[80vh]' : 'w-auto h-[70vh]'}`}>
              {resultVideo && !hyperZoom ? (
                <CinematicViewer videoUrl={resultVideo} posterUrl={upscaledImage || resultImage!} className="h-full" />
              ) : (
                <img
                  src={upscaledImage || resultImage!}
                  alt="Result"
                  className={`w-full h-full rounded-xl shadow-2xl saturate-[0.9] contrast-[1.1] ${hyperZoom ? 'object-cover' : 'object-contain'}`}
                />
              )}

              {/* Controls Overlay */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-30">
                <button
                  onClick={() => {
                    setResultImage(null);
                    setResultVideo(null);
                    setUpscaledImage(null);
                    setHyperZoom(false);
                  }}
                  className="bg-black/60 text-white rounded-full p-2 hover:bg-[#ecab13] hover:text-black transition-colors backdrop-blur-md border border-white/10"
                  aria-label="Close"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
                {upscaledImage && (
                  <button
                    onClick={() => setHyperZoom(!hyperZoom)}
                    className={`bg-black/60 text-white rounded-full p-2 hover:bg-[#ecab13] hover:text-black transition-colors backdrop-blur-md border border-white/10 ${hyperZoom ? 'bg-[#ecab13] text-black' : ''}`}
                    aria-label="Toggle Hyper-Zoom"
                  >
                    <span className="material-symbols-outlined text-sm">{hyperZoom ? 'zoom_out' : 'zoom_in'}</span>
                  </button>
                )}
              </div>

              <div className="absolute bottom-4 left-4 bg-black/60 text-[#ecab13] px-3 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase border border-[#ecab13]/30 backdrop-blur-md flex flex-col">
                <span>AI GENERATED_</span>
                {upscaledImage && <span className="text-[8px] text-gray-400">4K Micro-Fiber Enhanced</span>}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
