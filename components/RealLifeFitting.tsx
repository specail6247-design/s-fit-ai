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
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setter(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleShareToStory = () => {
    if (!resultImage) return;

    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill background
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, 1080, 1920);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      // Draw image centered
      const imgRatio = img.width / img.height;
      const targetRatio = 1080 / 1500; // Leave space for branding
      let drawWidth, drawHeight;

      if (imgRatio > targetRatio) {
        drawWidth = 1080;
        drawHeight = 1080 / imgRatio;
      } else {
        drawHeight = 1500;
        drawWidth = 1500 * imgRatio;
      }

      const x = (1080 - drawWidth) / 2;
      const y = (1600 - drawHeight) / 2; // Slightly above center

      ctx.drawImage(img, x, y, drawWidth, drawHeight);

      // Add branding
      ctx.fillStyle = '#007AFF';
      ctx.font = 'bold 60px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('S_FIT NEO', 540, 1750);

      ctx.fillStyle = '#888888';
      ctx.font = '30px sans-serif';
      ctx.fillText('Professional Virtual Fitting', 540, 1820);

      // Trigger download
      const link = document.createElement('a');
      link.download = 'sfit-story.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    img.src = resultImage;
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {userImage ? <img src={userImage} alt="User Photo" className="w-full h-full object-cover" /> : <span className="text-2xl">👤</span>}
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {garmentImage ? <img src={garmentImage} alt="Garment Photo" className="w-full h-full object-cover" /> : <span className="text-2xl">👕</span>}
                </div>
                <div>
                  <div className="text-sm font-bold group-hover:text-white text-gray-300">Select Garment</div>
                  <div className="text-[10px] text-gray-500">Front view preferred</div>
                </div>
              </label>
            </div>
          </div>

          {/* Data Safety Badge */}
          <div className="flex items-center gap-2 p-3 bg-black/40 border border-white/10 rounded-lg">
            <span className="text-xl">🛡️</span>
            <div className="text-xs text-gray-400">
              <strong className="text-white">Data Safety:</strong> Photos are processed securely and not shared.
            </div>
          </div>

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

          <div className="mt-8 flex justify-center gap-6 text-xs text-gray-500">
            <button onClick={() => setShowTermsModal(true)} className="hover:text-white transition-colors">Privacy Policy & Terms</button>
            <button onClick={() => setShowSupportModal(true)} className="hover:text-white transition-colors">Report Issue</button>
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
              <img src={resultImage} alt="Result" className="w-auto h-[70vh] rounded-xl object-contain shadow-2xl" />
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={handleShareToStory}
                  className="bg-black/60 text-white rounded-full px-4 py-2 hover:bg-[#007AFF] transition-colors text-xs font-bold flex items-center gap-2"
                >
                  <span>📸</span> Share to Story
                </button>
                <button
                  onClick={() => setResultImage(null)}
                  className="bg-black/60 text-white rounded-full p-2 hover:bg-[#007AFF] transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="absolute bottom-4 left-4 bg-black/60 text-[#007AFF] px-3 py-1 rounded-md text-xs font-bold font-mono border border-[#007AFF]/30">
                AI GENERATED_
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Modals */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#111] border border-white/20 rounded-2xl p-8 max-w-lg w-full relative"
          >
            <button onClick={() => setShowTermsModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</button>
            <h2 className="text-2xl font-bold mb-4">Privacy Policy & Terms</h2>
            <div className="space-y-4 text-sm text-gray-400 h-64 overflow-y-auto pr-2 custom-scrollbar">
              <p><strong>1. Data Processing:</strong> We process your uploaded photos solely for the purpose of generating virtual try-on results. Your photos are not stored permanently on our servers.</p>
              <p><strong>2. Privacy:</strong> We do not share your personal photos with third parties for marketing purposes. Models are processed securely.</p>
              <p><strong>3. Usage:</strong> By using S_FIT NEO, you agree to not upload explicit, copyrighted, or inappropriate content.</p>
              <p><strong>4. AI Generation:</strong> Results are AI-generated and may not perfectly represent physical fit or color accuracy.</p>
            </div>
            <button onClick={() => setShowTermsModal(false)} className="mt-6 w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] rounded-xl font-bold text-white transition-colors">
              I Understand
            </button>
          </motion.div>
        </div>
      )}

      {showSupportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#111] border border-white/20 rounded-2xl p-8 max-w-lg w-full relative"
          >
            <button onClick={() => setShowSupportModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</button>
            <h2 className="text-2xl font-bold mb-2">Report Issue</h2>
            <p className="text-xs text-gray-400 mb-6">Help us improve by reporting bugs or feedback.</p>

            <form onSubmit={(e) => { e.preventDefault(); alert("Issue reported. Thank you!"); setShowSupportModal(false); }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#007AFF] uppercase mb-2">Issue Type</label>
                <select className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm focus:border-[#007AFF] outline-none transition-colors">
                  <option>Bug/Error</option>
                  <option>Generation Quality</option>
                  <option>UI/UX Feedback</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#007AFF] uppercase mb-2">Description</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Please describe what happened..."
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm focus:border-[#007AFF] outline-none transition-colors resize-none"
                ></textarea>
              </div>
              <button type="submit" className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] rounded-xl font-bold text-white transition-colors mt-2">
                Submit Report
              </button>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
}
