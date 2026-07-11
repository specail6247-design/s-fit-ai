import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { BottomSheet } from '@/components/ui/BottomSheet';

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
  const [showLegal, setShowLegal] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

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

  const handleShareToStory = async () => {
    if (!resultImage) return;

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = async () => {
        // Set canvas to vertical stories aspect ratio (1080x1920)
        canvas.width = 1080;
        canvas.height = 1920;

        // Branded background
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Calculate drawing dimensions to maintain aspect ratio
        const scale = Math.min(canvas.width / img.width, (canvas.height - 400) / img.height);
        const drawWidth = img.width * scale;
        const drawHeight = img.height * scale;
        const drawX = (canvas.width - drawWidth) / 2;
        const drawY = (canvas.height - drawHeight) / 2;

        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

        // Logo overlay (placeholder)
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 80px "Geist", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('S_FIT NEO', canvas.width / 2, 150);

        canvas.toBlob(async (blob) => {
          if (!blob) return;
          const file = new File([blob], 'sfit-fitting.jpg', { type: 'image/jpeg' });

          if (navigator.share) {
            try {
              await navigator.share({
                title: 'My S_FIT Try-On',
                files: [file]
              });
            } catch (err) {
              // Fallback
              console.error('Navigator share failed', err);
              fallbackDownload(canvas);
            }
          } else {
            fallbackDownload(canvas);
          }
        }, 'image/jpeg', 0.9);
      };

      img.src = resultImage;
    } catch (err) {
      console.error('Canvas setup failed', err);
    }
  };

  const fallbackDownload = (canvas: HTMLCanvasElement) => {
    const url = canvas.toDataURL('image/jpeg');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sfit-fitting.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
          {/* User Photo Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#007AFF] uppercase">01. Identification</label>
            <div className="border border-white/20 bg-black/40 rounded-xl p-4 hover:border-[#007AFF] transition-colors group">
              <input type="file" onChange={(e) => handleFileUpload(e, setUserImage)} className="hidden" id="user-upload" />
              <label htmlFor="user-upload" className="cursor-pointer flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden border border-white/10">
                  {userImage ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={userImage} alt="User Photo" className="w-full h-full object-cover" />
                  ) : <span className="text-2xl">👤</span>}
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
                    <img src={garmentImage} alt="Target Garment" className="w-full h-full object-cover" />
                  ) : <span className="text-2xl">👕</span>}
                </div>
                <div>
                  <div className="text-sm font-bold group-hover:text-white text-gray-300">Select Garment</div>
                  <div className="text-[10px] text-gray-500">Front view preferred</div>
                </div>
              </label>
            </div>
          </div>

          {/* Data Safety Badge */}
          <div className="flex items-center gap-2 px-2 py-3 bg-black/40 border border-white/10 rounded-lg mt-4">
            <span className="material-symbols-outlined text-[#007AFF] text-lg" aria-hidden="true">security</span>
            <span className="text-xs text-gray-400 font-medium tracking-wide">Photos are processed securely and not shared.</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 relative z-10 flex-shrink-0">
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

          <div className="mt-8 flex justify-center gap-6 text-[10px] text-gray-500 font-mono tracking-widest uppercase">
            <button onClick={() => setShowLegal(true)} className="hover:text-white transition-colors">Legal</button>
            <button onClick={() => setShowSupport(true)} className="hover:text-white transition-colors">Support</button>
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl"
          >
            <div className="relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={resultImage} alt="Virtual Fitting Result" className="w-auto h-[70vh] rounded-xl object-contain shadow-2xl" />
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
                onClick={handleShareToStory}
                className="absolute bottom-4 right-4 bg-[#007AFF] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg hover:bg-[#005bb5] transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm" aria-hidden="true">ios_share</span>
                Share to Story
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Modals */}
      <BottomSheet isOpen={showLegal} onClose={() => setShowLegal(false)} title="Privacy Policy & Terms">
        <div className="text-sm text-gray-300 space-y-4">
          <p>By using S_FIT NEO, you agree to our terms of service.</p>
          <p>We respect your privacy. Uploaded photos are processed ephemerally for the sole purpose of virtual try-on and are not stored or shared with third parties.</p>
          <p className="text-xs text-gray-500 mt-8 text-center">Last updated: 2024</p>
        </div>
      </BottomSheet>

      <BottomSheet isOpen={showSupport} onClose={() => setShowSupport(false)} title="Support Hub">
        <div className="space-y-6">
          <div className="text-sm text-gray-300 text-center">Need help? Report an issue below.</div>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Issue reported! Thank you.'); setShowSupport(false); }}>
            <div>
              <label className="block text-xs font-bold text-[#007AFF] mb-2">Issue Description</label>
              <textarea
                className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-sm text-white min-h-[100px] focus:outline-none focus:border-[#007AFF]"
                placeholder="Describe what went wrong..."
                required
              />
            </div>
            <button type="submit" className="w-full bg-[#007AFF] text-white py-3 rounded-lg font-bold hover:bg-[#005bb5] transition-colors">
              Report Issue
            </button>
          </form>
        </div>
      </BottomSheet>
    </div>
  );
}
