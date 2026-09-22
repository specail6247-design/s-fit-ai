import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ErrorBoundary } from '@/components/ErrorBoundary';

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

    // Simulate progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + 10;
      });
    }, 500);

    try {
      // API call to our backend (which calls Replicate/Fashn.ai)
      const res = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhotoUrl: userImage,
          garmentImageUrl: garmentImage,
          category: 'tops', // Default for demo
          is_cinematic: true
        })
      });
      const data = await res.json();
      
      clearInterval(interval);
      setProgress(100);
      
      if (data.imageUrl || data.videoUrl) {
        setResultImage(data.videoUrl || data.imageUrl);
      } else {
        throw new Error(data.error || "Try-On Failed");
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
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFFFF] font-sans flex overflow-hidden transition-all duration-1000">
      
      {/* LEFT PANEL: CONTROLS */}
      <div className="w-1/3 min-w-[400px] h-full p-8 flex flex-col z-10 glass-panel border-r border-[#C9B037]/20 relative">
        {/* Background Ambience */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#C9B037]/5 to-black pointer-events-none" />
        
        <header className="mb-10 relative z-10">
          <h1 className="text-4xl font-serif tracking-widest text-[#C9B037]" style={{ fontFamily: 'Cinzel, serif' }}>
            M_FIT
          </h1>
          <p className="text-xs text-gray-400 tracking-[0.3em] uppercase mt-2 font-mono">
            Personal Digital Atelier
          </p>
        </header>

        <div className="space-y-8 relative z-10 flex-1 overflow-y-auto">
          {/* User Photo Input */}
          <div className="space-y-2 transition-all duration-700">
            <label className="text-xs font-bold text-[#C9B037] uppercase">01. Identification</label>
            <div className="border border-white/20 bg-black/40 rounded-xl p-4 hover:border-[#C9B037] transition-colors duration-700 group">
              <input type="file" onChange={(e) => handleFileUpload(e, setUserImage)} className="hidden" id="user-upload" />
              <label htmlFor="user-upload" className="cursor-pointer flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden border border-white/10">
                  {userImage ? <img src={userImage} className="w-full h-full object-cover" /> : <span className="text-2xl">👤</span>}
                </div>
                <div>
                  <div className="text-sm font-bold group-hover:text-white text-gray-300">Upload User Photo</div>
                  <div className="text-[10px] text-gray-500">Supports JPG, PNG (Max 5MB)</div>
                </div>
              </label>
            </div>
          </div>

          {/* Garment Input */}
          <div className="space-y-2 transition-all duration-700">
            <label className="text-xs font-bold text-[#C9B037] uppercase">02. Target Garment</label>
            <div className="border border-white/20 bg-black/40 rounded-xl p-4 hover:border-[#C9B037] transition-colors duration-700 group">
              <input type="file" onChange={(e) => handleFileUpload(e, setGarmentImage)} className="hidden" id="garment-upload" />
              <label htmlFor="garment-upload" className="cursor-pointer flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden border border-white/10">
                  {garmentImage ? <img src={garmentImage} className="w-full h-full object-cover" /> : <span className="text-2xl">👕</span>}
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
            <div className="space-y-4 flex flex-col items-center transition-all duration-1000 opacity-100">
              <svg className="w-12 h-12 text-[#C9B037] animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
              </svg>
              <div className="w-full flex justify-between text-xs text-[#C9B037] font-mono tracking-widest">
                <span>ORCHESTRATING AI PIPELINE...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-1 bg-gray-900 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#C9B037] to-[#F4E4BC]"
                  initial={{ width: 0 }} 
                  animate={{ width: `${progress}%` }} 
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
            </div>
          ) : (
            <button 
              onClick={handleTryOn}
              className="w-full py-4 bg-transparent border border-[#C9B037] hover:bg-[#C9B037] hover:text-black text-[#C9B037] font-serif tracking-widest rounded-none shadow-[0_0_20px_rgba(201,176,55,0.1)] transition-all duration-700 transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span>✨</span> MASTERPIECE FIT
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

        {/* Result Overlay (If success) */}
        {resultImage && !isProcessing && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 p-2 bg-black/40 backdrop-blur-xl rounded-none border border-[#C9B037]/30 shadow-2xl"
          >
            <div className="relative group overflow-hidden cursor-zoom-in">
              {resultImage.endsWith('.mp4') ? (
                <video src={resultImage} autoPlay loop muted className="w-auto h-[70vh] object-contain shadow-2xl saturate-[0.9] contrast-[1.1] transition-transform duration-[2000ms] hover:scale-150 hover:duration-[5000ms]" />
              ) : (
                <img src={resultImage} alt="Result" className="w-auto h-[70vh] object-contain shadow-2xl saturate-[0.9] contrast-[1.1] transition-transform duration-[2000ms] hover:scale-150 hover:duration-[5000ms]" />
              )}

              {/* Hyper-Zoom Indicator Overlay */}
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-[3000ms] pointer-events-none opacity-0 group-hover:opacity-100 flex items-center justify-center">
                <div className="border border-[#C9B037]/50 rounded-full w-32 h-32 flex items-center justify-center backdrop-blur-sm animate-pulse">
                  <span className="text-[#C9B037] text-[10px] font-mono tracking-widest bg-black/60 px-2 py-1">HYPER-ZOOM ENGINE</span>
                </div>
              </div>

              <button 
                onClick={() => setResultImage(null)} 
                className="absolute top-4 right-4 bg-black/60 text-white rounded-full p-2 hover:bg-[#C9B037] hover:text-black transition-colors duration-700 z-30"
              >
                ✕ Close
              </button>
              <div className="absolute bottom-4 left-4 bg-black/80 text-[#C9B037] px-3 py-1 text-xs font-serif tracking-widest border border-[#C9B037]/30 z-30">
                M_FIT CINEMATIC 4K
              </div>

              <button
                onClick={async () => {
                  if (!resultImage) return;
                  try {
                    const response = await fetch(resultImage);
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = resultImage.endsWith('.mp4') ? 'M_FIT_Cinematic_Share.mp4' : 'M_FIT_Share.png';
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                  } catch (e) {
                     alert("Failed to export. Please try again.");
                  }
                }}
                className="absolute bottom-4 right-4 bg-[#C9B037] text-black px-4 py-2 text-xs font-serif tracking-widest hover:bg-white transition-colors duration-700 flex items-center gap-2 z-30"
              >
                <span>🎥</span> CINEMATIC SHARE
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
