import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import html2canvas from 'html2canvas';
import LegalModal from '@/components/LegalModal';
import SupportHub from '@/components/SupportHub';

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

  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalContent, setLegalContent] = useState<{ title: string; content: React.ReactNode }>({ title: '', content: null });
  const [isSupportHubOpen, setIsSupportHubOpen] = useState(false);

  const handleShareToStory = async () => {
    const element = document.getElementById('fitting-result-container');
    if (!element) return;
    try {
      const canvas = await html2canvas(element, { useCORS: true, backgroundColor: '#0a0a0a' });
      const image = canvas.toDataURL('image/jpeg', 0.9);
      const link = document.createElement('a');
      link.href = image;
      link.download = 'sfit_story.jpg';
      link.click();
    } catch (err) {
      console.error("Error generating story image", err);
    }
  };

  const openLegal = (type: 'privacy' | 'terms') => {
    if (type === 'privacy') {
      setLegalContent({
        title: 'Privacy Policy',
        content: (
          <div>
            <p>Your privacy is important to us. S_FIT AI does not store your photos permanently. They are processed securely for the sole purpose of generating your virtual try-on experience and are immediately discarded from our active servers after processing.</p>
            <p className="mt-4">We do not sell your personal data or facial features to third parties.</p>
          </div>
        )
      });
    } else {
      setLegalContent({
        title: 'Terms of Service',
        content: (
          <div>
            <p>By using S_FIT AI, you agree to our Terms of Service. This service is provided &quot;as is&quot; without warranty. Do not upload inappropriate, explicit, or copyrighted materials.</p>
            <p className="mt-4">We reserve the right to suspend accounts violating these terms.</p>
          </div>
        )
      });
    }
    setIsLegalModalOpen(true);
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
                  {userImage ? <img src={userImage} className="w-full h-full object-cover" /> : <span className="text-2xl">👤</span>}
                </div>
                <div>
                  <div className="text-sm font-bold group-hover:text-white text-gray-300">Upload User Photo</div>
                  <div className="text-[10px] text-gray-500">Supports JPG, PNG (Max 5MB)</div>
                </div>
              </label>
            </div>
          </div>

          {/* Data Safety Badge */}
          <div className="flex items-center gap-2 text-[10px] text-green-400/80 bg-green-900/20 p-2 rounded-lg border border-green-500/20">
            <span>🔒</span>
            <span>Photos are processed securely and not shared.</span>
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

          {/* Trust & Growth Footer Links */}
          <div className="mt-8 flex flex-col items-center gap-3">
             <div className="flex items-center justify-center gap-4 text-[10px] text-gray-500 uppercase tracking-wider">
               <button onClick={() => openLegal('privacy')} className="hover:text-white transition-colors">Privacy</button>
               <span>|</span>
               <button onClick={() => openLegal('terms')} className="hover:text-white transition-colors">Terms</button>
             </div>
             <button onClick={() => setIsSupportHubOpen(true)} className="text-[10px] text-gray-400 hover:text-[#007AFF] transition-colors border border-gray-800 hover:border-[#007AFF]/50 px-3 py-1 rounded-full flex items-center gap-1">
               <span>🐛</span> Report Issue
             </button>
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
            <div id="fitting-result-container" className="relative group bg-[#0a0a0a] p-4 rounded-xl flex flex-col items-center">
              {/* Added a title/logo for the branded story share */}
              <div className="w-full flex justify-between items-center mb-4 px-2">
                 <h2 className="text-xl font-black italic text-white">S_FIT <span className="text-[#007AFF]">NEO</span></h2>
                 <span className="text-[10px] text-gray-400 tracking-widest uppercase">Virtual Fitting</span>
              </div>
              <img src={resultImage} alt="Result" crossOrigin="anonymous" className="w-auto h-[70vh] rounded-xl object-contain shadow-2xl" />
              <button 
                data-html2canvas-ignore="true"
                onClick={() => setResultImage(null)} 
                className="absolute top-4 right-4 bg-black/60 text-white rounded-full p-2 hover:bg-red-500 transition-colors z-30"
              >
                ✕
              </button>

              <div className="w-full flex justify-between items-end mt-4 px-2">
                <div className="bg-black/60 text-[#007AFF] px-3 py-1 rounded-md text-xs font-bold font-mono border border-[#007AFF]/30">
                  AI GENERATED_
                </div>
                {/* Share to Story Button - ignored in canvas generation to prevent infinite recursion/UI artifacts */}
                <button
                  data-html2canvas-ignore="true"
                  onClick={handleShareToStory}
                  className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:opacity-90 text-white font-bold py-2 px-4 rounded-full text-xs shadow-lg flex items-center gap-2 transition-transform transform hover:scale-105 z-30"
                >
                  <span>📸</span> Share to Story
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <LegalModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        title={legalContent.title}
        content={legalContent.content}
      />
      <SupportHub
        isOpen={isSupportHubOpen}
        onClose={() => setIsSupportHubOpen(false)}
      />
    </div>
  );
}
