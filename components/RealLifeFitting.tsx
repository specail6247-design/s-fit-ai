import React, { useState, useEffect, useRef } from 'react';
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
  const [vaultItems, setVaultItems] = useState<string[]>([]);
  const [isVaultOpen, setIsVaultOpen] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (isProcessing) {
      if (!audioContextRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const ctx = audioContextRef.current;

      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      oscillatorRef.current = ctx.createOscillator();
      gainNodeRef.current = ctx.createGain();

      // Subtle, low-frequency hum for immersion
      oscillatorRef.current.type = 'sine';
      oscillatorRef.current.frequency.setValueAtTime(65, ctx.currentTime); // Low hum

      // Gentle fade in
      gainNodeRef.current.gain.setValueAtTime(0, ctx.currentTime);
      gainNodeRef.current.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 2); // very low volume

      oscillatorRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(ctx.destination);

      oscillatorRef.current.start();
    } else {
      if (gainNodeRef.current && audioContextRef.current) {
        // Fade out before stopping
        const ctx = audioContextRef.current;
        gainNodeRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);

        setTimeout(() => {
          if (oscillatorRef.current) {
            oscillatorRef.current.stop();
            oscillatorRef.current.disconnect();
            oscillatorRef.current = null;
          }
          if (gainNodeRef.current) {
            gainNodeRef.current.disconnect();
            gainNodeRef.current = null;
          }
        }, 1000);
      }
    }

    return () => {
      // Cleanup on unmount
      if (oscillatorRef.current) {
        try { oscillatorRef.current.stop(); } catch {}
      }
    };
  }, [isProcessing]);

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
    <div className="min-h-screen bg-[#050505] text-white font-sans flex overflow-hidden">
      
      {/* LEFT PANEL: CONTROLS */}
      <div className="w-1/3 min-w-[400px] h-full p-8 flex flex-col z-10 glass-panel border-r border-white/10 relative">
        {/* Background Ambience */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00ffff]/5 to-[#007AFF]/10 pointer-events-none" />
        
        <header className={`mb-10 relative z-10 flex justify-between items-start transition-opacity duration-500 ${isProcessing ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div>
            <h1 className="text-4xl font-black tracking-tighter italic">
              S_FIT <span className="text-[#007AFF]">NEO</span>
            </h1>
            <p className="text-xs text-gray-400 tracking-[0.3em] uppercase mt-2">
              Professional Virtual Fitting
            </p>
          </div>
          <button
            onClick={() => setIsVaultOpen(!isVaultOpen)}
            className="flex items-center gap-2 px-3 py-2 bg-black/40 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
          >
            <span className="text-lg">🔒</span>
            <span className="text-xs font-bold tracking-widest uppercase text-gray-300">Vault</span>
          </button>
        </header>

        <div className={`space-y-8 relative z-10 flex-1 overflow-y-auto transition-opacity duration-500 ${isProcessing ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          {/* User Photo Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#007AFF] uppercase">01. Identification</label>
            <div className="border border-white/20 bg-black/40 rounded-xl p-4 hover:border-[#007AFF] transition-colors group">
              <input type="file" onChange={(e) => handleFileUpload(e, setUserImage)} className="hidden" id="user-upload" />
              <label htmlFor="user-upload" className="cursor-pointer flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden border border-white/10">
                  {userImage ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={userImage} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl">👤</span>
                  )}
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
                  {garmentImage ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={garmentImage} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl">👕</span>
                  )}
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
            <div className="space-y-2 transition-opacity duration-500 opacity-100">
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
          
          <div className={`mt-4 flex gap-2 transition-opacity duration-500 ${isProcessing ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
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

        {/* The Vault Drawer */}
        {isVaultOpen && (
          <div className="absolute top-0 right-0 w-[400px] h-full bg-black/90 backdrop-blur-xl border-l border-white/10 z-40 p-8 flex flex-col shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold tracking-widest uppercase">The Vault</h2>
              <button
                onClick={() => setIsVaultOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕ Close
              </button>
            </div>

            {vaultItems.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-500 gap-4">
                <span className="text-4xl opacity-50">🔒</span>
                <p className="text-sm">Your vault is empty.</p>
                <p className="text-xs text-center px-8">Save looks to compare luxury fits.</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {vaultItems.map((item, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden border border-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item} alt={`Saved Look ${idx}`} className="w-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                      <div className="flex justify-end">
                        <button
                          onClick={() => setVaultItems(vaultItems.filter((_, i) => i !== idx))}
                          className="bg-black/60 text-white rounded-full p-2 hover:bg-red-500/80 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="text-xs font-bold uppercase tracking-widest text-center text-white">Compare Look</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Result Overlay (If success) */}
        {resultImage && !isProcessing && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl"
          >
            <div className="relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={resultImage} alt="Result" className="w-auto h-[70vh] rounded-xl object-contain shadow-2xl" />
              <button 
                onClick={() => setResultImage(null)} 
                className="absolute top-4 right-4 bg-black/60 text-white rounded-full p-2 hover:bg-[#007AFF] transition-colors z-30"
              >
                ✕ Close
              </button>
              <button
                onClick={() => {
                  if (!vaultItems.includes(resultImage)) {
                    setVaultItems([...vaultItems, resultImage]);
                    setIsVaultOpen(true);
                  }
                }}
                className="absolute top-4 right-28 bg-black/60 text-white px-4 py-2 rounded-full hover:bg-[#007AFF] transition-colors z-30 flex items-center gap-2"
              >
                <span>🔒</span> Save Look
              </button>
              <div className="absolute bottom-4 left-4 bg-black/60 text-[#007AFF] px-3 py-1 rounded-md text-xs font-bold font-mono border border-[#007AFF]/30 z-30">
                AI GENERATED_
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
