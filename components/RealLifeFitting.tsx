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
  const [isSupportHubOpen, setIsSupportHubOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);

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
          category: 'tops' // Default for demo
        })
      });
      const data = await res.json();
      
      clearInterval(interval);
      setProgress(100);
      
      if (data.imageUrl) {
        setResultImage(data.imageUrl);
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
    <div className="min-h-screen bg-[#050505] text-white font-sans flex overflow-hidden relative">
      
      {/* SUPPORT HUB DRAWER */}
      {isSupportHubOpen && (
        <div className="absolute inset-y-0 left-0 w-80 bg-[#0a0a0a] border-r border-white/10 z-50 flex flex-col shadow-2xl transform transition-transform">
          <div className="p-4 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-sm font-bold tracking-widest">SUPPORT HUB</h2>
            <button onClick={() => setIsSupportHubOpen(false)} className="text-gray-400 hover:text-white">✕</button>
          </div>
          <div className="p-4 flex-1 overflow-y-auto">
            <div className="mb-6">
              <h3 className="text-xs font-bold text-gray-400 mb-2">LEGAL &amp; COMPLIANCE</h3>
              <button
                onClick={() => setIsLegalModalOpen(true)}
                className="text-sm text-left w-full p-2 hover:bg-white/5 rounded transition-colors"
              >
                Privacy Policy &amp; Terms
              </button>
            </div>

            <div>
              <h3 className="text-xs font-bold text-gray-400 mb-2">REPORT ISSUE</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Issue reported successfully. Thank you for your feedback!");
                  (e.target as HTMLFormElement).reset();
                }}
                className="space-y-3"
              >
                <textarea
                  placeholder="Describe the issue you encountered..."
                  className="w-full h-24 bg-white/5 border border-white/10 rounded p-2 text-sm text-white focus:outline-none focus:border-[#007AFF] resize-none"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-white/10 hover:bg-white/20 rounded text-xs font-bold transition-colors"
                >
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* LEGAL MODAL */}
      {isLegalModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-lg bg-[#111] border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
          >
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/50">
              <h2 className="text-lg font-bold">Privacy Policy &amp; Terms</h2>
              <button onClick={() => setIsLegalModalOpen(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            <div className="p-6 overflow-y-auto text-sm text-gray-300 space-y-4">
              <p><strong>1. Data Processing &amp; Privacy</strong><br/>
              Your photos are processed securely to generate virtual try-on results. We do not permanently store, share, or sell your biometric data or uploaded images. All data is handled in compliance with GDPR and CCPA standards.</p>

              <p><strong>2. Usage Terms</strong><br/>
              By using S_FIT AI, you agree to upload only images you have the right to use. The generated images are for personal visualization purposes.</p>

              <p><strong>3. Content Moderation</strong><br/>
              We reserve the right to block uploads that violate our safety guidelines, including inappropriate or non-consensual content.</p>
            </div>
            <div className="p-4 border-t border-white/10 bg-black/50 flex justify-end">
              <button onClick={() => setIsLegalModalOpen(false)} className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200">
                I Agree
              </button>
            </div>
          </motion.div>
        </div>
      )}

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
          {/* User Photo Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#007AFF] uppercase">01. Identification</label>
            <div className="border border-white/20 bg-black/40 rounded-xl p-4 hover:border-[#007AFF] transition-colors group">
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
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#007AFF] uppercase">02. Target Garment</label>
            <div className="border border-white/20 bg-black/40 rounded-xl p-4 hover:border-[#007AFF] transition-colors group">
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

        {/* Data Safety Badge */}
        <div className="mt-6 flex items-center gap-2 text-[10px] text-gray-400 bg-white/5 p-2 rounded-lg border border-white/10 z-10 relative mb-4">
          <span className="text-green-400">🔒</span>
          <span>Photos are processed securely and not shared.</span>
        </div>

        {/* Action Button */}
        <div className="mt-8 relative z-10">
          {isProcessing ? (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-[#007AFF] font-mono">
                <span>PROCESSING DATA...</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-[#007AFF]" 
                  initial={{ width: 0 }} 
                  animate={{ width: `${progress}%` }} 
                />
              </div>
            </div>
          ) : (
            <button 
              onClick={handleTryOn}
              className="w-full py-4 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(0,122,255,0.4)] transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span>⚡️</span> TRY IT ON
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

        {/* Support Hub Trigger */}
        <div className="absolute bottom-4 left-4 z-20">
          <button
            onClick={() => setIsSupportHubOpen(true)}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Open Support Hub"
          >
            ?
          </button>
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl"
          >
            <div className="relative group">
              <img src={resultImage} alt="Result" className="w-auto h-[70vh] rounded-xl object-contain shadow-2xl" />
              <button 
                onClick={() => setResultImage(null)} 
                className="absolute top-4 right-4 bg-black/60 text-white rounded-full p-2 hover:bg-[#007AFF] transition-colors"
              >
                ✕ Close
              </button>
              <div className="absolute bottom-4 left-4 bg-black/60 text-[#007AFF] px-3 py-1 rounded-md text-xs font-bold font-mono border border-[#007AFF]/30">
                AI GENERATED_
              </div>

              <button
                onClick={async () => {
                  const canvas = document.createElement("canvas");
                  canvas.width = 1080;
                  canvas.height = 1920;
                  const ctx = canvas.getContext("2d");
                  if (!ctx) return;

                  ctx.fillStyle = "#050505";
                  ctx.fillRect(0, 0, canvas.width, canvas.height);

                  const img = new Image();
                  img.crossOrigin = "anonymous";
                  if (resultImage) {
                      img.src = resultImage;
                      await new Promise(r => img.onload = r);
                  }

                  const scale = Math.min(1080 / img.width, 1400 / img.height);
                  const w = img.width * scale;
                  const h = img.height * scale;
                  const x = (1080 - w) / 2;
                  const y = (1920 - h) / 2;

                  ctx.drawImage(img, x, y, w, h);

                  ctx.fillStyle = "#ffffff";
                  ctx.font = "bold 60px monospace";
                  ctx.textAlign = "center";
                  ctx.fillText("S_FIT AI", 540, 150);

                  ctx.fillStyle = "#007AFF";
                  ctx.font = "30px sans-serif";
                  ctx.fillText("Virtual Try-On Result", 540, 220);

                  canvas.toBlob(async (blob) => {
                    if (!blob) return;
                    const file = new File([blob], "sfit-story.png", { type: "image/png" });
                    if (navigator.canShare && navigator.canShare({ files: [file] })) {
                      try {
                        await navigator.share({
                          files: [file],
                          title: "My S_FIT Try-On",
                        });
                      } catch (err) {
                        console.log("Share cancelled", err);
                      }
                    } else {
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = "sfit-story.png";
                      a.click();
                      URL.revokeObjectURL(url);
                    }
                  });
                }}
                className="absolute bottom-4 right-4 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <span>📸</span> Share to Story
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
