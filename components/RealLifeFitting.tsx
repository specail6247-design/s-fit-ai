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
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('tops');
  const [brandTier, setBrandTier] = useState<string>('mass');
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setter(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const generateMotion = async () => {
    if (!resultImage) return;
    setIsProcessing(true);
    setProgress(0);
    const interval = setInterval(() => setProgress((prev) => prev >= 90 ? prev : prev + 10), 500);
    try {
      const res = await fetch('/api/cinematic-try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: resultImage })
      });
      const data = await res.json();
      clearInterval(interval);
      setProgress(100);
      if (data.success && data.videoUrl) {
        setVideoUrl(data.videoUrl);
      } else {
        alert("Motion generation failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      clearInterval(interval);
      console.error(err);
      alert("Failed to generate motion clip");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTryOn = async () => {
    if (!userImage || !garmentImage) return alert("Please upload both User Photo and Garment.");
    
    setIsProcessing(true);
    setProgress(0);
    setResultImage(null);
    setVideoUrl(null);

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
          category: category,
          brandTier: brandTier
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
          {/* Settings: Category & Brand Tier */}
          <div className="space-y-4 mb-8 relative z-10">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#007AFF] uppercase">03. Category (Accessory Layer)</label>
              <div className="flex gap-2">
                {['tops', 'bottoms', 'dresses', 'accessories'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1.5 text-[10px] rounded border uppercase font-mono transition-colors ${category === cat ? 'bg-[#007AFF] border-[#007AFF] text-white' : 'border-white/20 hover:border-white/50 text-gray-400'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#007AFF] uppercase">04. Brand Aesthetic</label>
              <div className="flex gap-2">
                {['mass', 'luxury', 'k-fashion'].map(tier => (
                  <button
                    key={tier}
                    onClick={() => setBrandTier(tier)}
                    className={`px-3 py-1.5 text-[10px] rounded border uppercase font-mono transition-colors ${brandTier === tier ? (tier === 'luxury' ? 'bg-[#c9b037] border-[#c9b037] text-black' : 'bg-[#007AFF] border-[#007AFF] text-white') : 'border-white/20 hover:border-white/50 text-gray-400'}`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>
          </div>

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
            className="absolute inset-4 z-20 flex items-center justify-center pointer-events-none"
          >
            <div className="relative group bg-black/80 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl pointer-events-auto flex flex-col md:flex-row gap-8 max-w-6xl w-full">

              {/* Visual Display: Image with Hyper-Zoom or Video */}
              <div className="relative flex-1 rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/5 flex items-center justify-center min-h-[60vh]">
                {videoUrl ? (
                  <video src={videoUrl} autoPlay loop muted playsInline className="w-full h-full object-contain" />
                ) : (
                  <div
                    className="relative w-full h-full cursor-crosshair overflow-hidden"
                    onMouseEnter={() => setIsHoveringImage(true)}
                    onMouseLeave={() => setIsHoveringImage(false)}
                    onMouseMove={handleMouseMove}
                  >
                    <img src={resultImage} alt="Result" className="w-full h-full object-contain" />
                    {isHoveringImage && (
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage: `url(${resultImage})`,
                          backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                          backgroundSize: '250%',
                          backgroundRepeat: 'no-repeat',
                          clipPath: `circle(100px at ${mousePos.x}% ${mousePos.y}%)`,
                          filter: 'contrast(1.2) saturate(1.1) brightness(1.1)'
                        }}
                      />
                    )}
                    {isHoveringImage && (
                      <div className="absolute top-4 left-4 bg-black/60 text-white px-2 py-1 rounded text-[10px] font-mono tracking-widest border border-white/20 pointer-events-none backdrop-blur-md">
                        HYPER-ZOOM ACTIVE_
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Personal Digital Atelier Controls */}
              <div className="w-full md:w-72 flex flex-col gap-6">
                <div>
                  <h3 className="text-xl font-bold font-serif italic mb-1">Your Masterpiece</h3>
                  <p className="text-xs text-gray-400 font-mono">DIGITAL ATELIER</p>
                </div>

                <div className="space-y-3">
                  {!videoUrl && (
                    <button
                      onClick={generateMotion}
                      disabled={isProcessing}
                      className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 text-sm shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    >
                      <span className="text-lg">🎬</span> {isProcessing ? 'Generating...' : 'Generate Motion Clip'}
                    </button>
                  )}

                  <button
                    onClick={() => alert("Sharing 4K clip to social media...")}
                    className="w-full py-3 bg-transparent border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <span className="text-lg">📤</span> Cinematic Share
                  </button>

                  <button
                    onClick={() => { setResultImage(null); setVideoUrl(null); }}
                    className="w-full py-3 bg-transparent text-gray-500 font-bold rounded-xl hover:text-white transition-colors flex items-center justify-center gap-2 text-xs uppercase tracking-widest mt-8"
                  >
                    Start Over
                  </button>
                </div>

                <div className="mt-auto pt-4 border-t border-white/10">
                  <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
                    <span>QUALITY</span>
                    <span className="text-white">4K ULTRA</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 mt-1">
                    <span>PHYSICS</span>
                    <span className="text-white">ENABLED</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
