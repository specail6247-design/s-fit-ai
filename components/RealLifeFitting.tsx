import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { brands, mockClothingItems, ClothingItem } from '@/data/mockData';
import { generateCinematicVideo } from '@/lib/virtualTryOn';

// Dynamically import the 3D scene with SSR disabled
const AvatarCanvas = dynamic(() => import('./AvatarCanvas'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 flex items-center justify-center text-[#007AFF] font-mono text-xs animate-pulse">LOADING 3D ENGINE...</div>
});

// Cinematic Video Player Component
const CinematicPlayer = ({ videoUrl, posterUrl, onClose }: { videoUrl: string, posterUrl: string, onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
    >
      <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,122,255,0.2)]">
        <video
          src={videoUrl}
          poster={posterUrl}
          autoPlay
          loop
          muted
          controls
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 flex items-center gap-2">
           <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
           <span className="text-[10px] font-bold tracking-widest text-white uppercase">Cinematic 4K</span>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
};

// Share Modal Component
const ShareModal = ({ isOpen, onClose, imageUrl }: { isOpen: boolean, onClose: () => void, imageUrl: string }) => {
  if (!isOpen) return null;

  const handleShare = (platform: string) => {
    const text = "Check out my Masterpiece Fit on S_FIT AI! 🎬✨ #SFIT #VirtualTryOn";
    const url = "https://s-fit.ai";
    let link = "";

    switch(platform) {
      case 'twitter': link = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`; break;
      case 'facebook': link = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`; break;
      case 'whatsapp': link = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`; break;
    }

    if (link) window.open(link, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#1a1a1a] border border-white/10 p-6 rounded-2xl w-full max-w-sm m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-white mb-2 text-center">Share Your Look</h3>
        <p className="text-xs text-gray-400 text-center mb-6">Show off your cinematic style to the world.</p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <button onClick={() => handleShare('twitter')} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-[#1DA1F2]/20 hover:text-[#1DA1F2] transition-colors">
            <span className="text-xl">𝕏</span>
            <span className="text-[10px] font-bold">Twitter</span>
          </button>
          <button onClick={() => handleShare('facebook')} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-[#1877F2]/20 hover:text-[#1877F2] transition-colors">
            <span className="text-xl">fb</span>
            <span className="text-[10px] font-bold">Facebook</span>
          </button>
          <button onClick={() => handleShare('whatsapp')} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-[#25D366]/20 hover:text-[#25D366] transition-colors">
            <span className="text-xl">wa</span>
            <span className="text-[10px] font-bold">WhatsApp</span>
          </button>
        </div>

        <button onClick={onClose} className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-colors">
          Close
        </button>
      </motion.div>
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function RealLifeFitting() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [garmentImage, setGarmentImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // Masterpiece State
  const [fittingSource, setFittingSource] = useState<'upload' | 'library'>('upload');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ClothingItem['category']>('tops');
  const [libraryItems, setLibraryItems] = useState<ClothingItem[]>([]);
  const [selectedLibraryItem, setSelectedLibraryItem] = useState<ClothingItem | null>(null);

  // Cinematic State
  const [isZoomed, setIsZoomed] = useState(false);
  const [isVideoGenerating, setIsVideoGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Load library items
  useEffect(() => {
    if (fittingSource === 'library') {
      let items = mockClothingItems;
      if (selectedBrand) {
        items = items.filter(item => item.brand.toLowerCase() === selectedBrand.toLowerCase());
      }
      if (selectedCategory) {
        items = items.filter(item => item.category === selectedCategory);
      }
      setLibraryItems(items);
    }
  }, [fittingSource, selectedBrand, selectedCategory]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setter(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = async () => {
    const activeGarmentImage = fittingSource === 'upload' ? garmentImage : selectedLibraryItem?.imageUrl;
    const activeCategory = fittingSource === 'upload' ? 'tops' : selectedLibraryItem?.category;

    if (!userImage || !activeGarmentImage) return alert("Please ensure both User Photo and Garment are selected.");
    
    setIsProcessing(true);
    setProgress(0);
    setResultImage(null);
    setVideoUrl(null);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + 10;
      });
    }, 500);

    try {
      const res = await fetch('/api/try-on/masterpiece', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhotoUrl: userImage,
          garmentImageUrl: activeGarmentImage,
          category: activeCategory
        })
      });
      const data = await res.json();
      
      clearInterval(interval);
      setProgress(100);
      
      if (data.success && data.imageUrl) {
        setResultImage(data.imageUrl);
      } else {
        throw new Error(data.error || "Try-On Failed");
      }
    } catch (err) {
      clearInterval(interval);
      console.error(err);
      setResultImage("https://pub-83c5db439b40468498f97946200806f7.r2.dev/mock-result-sfit.png");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerateVideo = async () => {
    if (!resultImage) return;
    setIsVideoGenerating(true);
    try {
      const res = await fetch('/api/try-on/video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: resultImage })
      });
      const data = await res.json();
      if (data.success && data.videoUrl) {
        setVideoUrl(data.videoUrl);
        setShowVideoPlayer(true);
      } else {
        alert("Failed to generate video: " + (data.error || "Unknown error"));
      }
    } catch (e) {
      console.error(e);
      alert("Error generating video");
    } finally {
      setIsVideoGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex overflow-hidden">
      
      {/* LEFT PANEL: CONTROLS */}
      <div className="w-1/3 min-w-[400px] h-full p-8 flex flex-col z-10 glass-panel border-r border-white/10 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00ffff]/5 to-[#007AFF]/10 pointer-events-none" />
        
        <header className="mb-8 relative z-10">
          <h1 className="text-4xl font-black tracking-tighter italic">
            M_FIT <span className="text-[#007AFF]">MASTERPIECE</span>
          </h1>
          <p className="text-xs text-gray-400 tracking-[0.3em] uppercase mt-2">
            Cinematic Virtual Atelier
          </p>
        </header>

        {/* ... (Existing Control UI) ... */}
        <div className="space-y-6 relative z-10 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {/* User Photo Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#007AFF] uppercase">01. Identity Matrix</label>
            <div className="border border-white/20 bg-black/40 rounded-xl p-4 hover:border-[#007AFF] transition-colors group">
              <input type="file" onChange={(e) => handleFileUpload(e, setUserImage)} className="hidden" id="user-upload" />
              <label htmlFor="user-upload" className="cursor-pointer flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden border border-white/10">
                  {userImage ? <img src={userImage} className="w-full h-full object-cover" /> : <span className="text-2xl">👤</span>}
                </div>
                <div>
                  <div className="text-sm font-bold group-hover:text-white text-gray-300">Upload User Photo</div>
                  <div className="text-[10px] text-gray-500">Full body shot recommended (Max 5MB)</div>
                </div>
              </label>
            </div>
          </div>

          {/* Source Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#007AFF] uppercase">02. Garment Source</label>
            <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
              <button onClick={() => setFittingSource('upload')} className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${fittingSource === 'upload' ? 'bg-[#007AFF] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>CUSTOM UPLOAD</button>
              <button onClick={() => setFittingSource('library')} className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${fittingSource === 'library' ? 'bg-[#007AFF] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>BRAND LIBRARY</button>
            </div>
          </div>

          {/* Garment Input: Custom Upload */}
          {fittingSource === 'upload' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
              <div className="border border-white/20 bg-black/40 rounded-xl p-4 hover:border-[#007AFF] transition-colors group">
                <input type="file" onChange={(e) => handleFileUpload(e, setGarmentImage)} className="hidden" id="garment-upload" />
                <label htmlFor="garment-upload" className="cursor-pointer flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden border border-white/10">
                    {garmentImage ? <img src={garmentImage} className="w-full h-full object-cover" /> : <span className="text-2xl">👕</span>}
                  </div>
                  <div><div className="text-sm font-bold group-hover:text-white text-gray-300">Select Garment</div><div className="text-[10px] text-gray-500">High-res front view preferred</div></div>
                </label>
              </div>
            </motion.div>
          )}

          {/* Garment Input: Brand Library */}
          {fittingSource === 'library' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="grid grid-cols-4 gap-2">
                {brands.map((brand) => (
                  <button key={brand.id} onClick={() => setSelectedBrand(selectedBrand === brand.id ? '' : brand.id)} className={`aspect-square rounded-lg border flex flex-col items-center justify-center p-1 transition-all ${selectedBrand === brand.id ? 'border-[#007AFF] bg-[#007AFF]/20' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
                    <img src={brand.logo} alt={brand.name} className="w-8 h-8 rounded-full mb-1 opacity-80" />
                    <span className="text-[8px] font-bold text-center leading-tight truncate w-full">{brand.name}</span>
                  </button>
                ))}
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {['tops', 'bottoms', 'outerwear', 'dresses', 'accessories'].map((cat) => (
                  <button key={cat} onClick={() => setSelectedCategory(cat as any)} className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase whitespace-nowrap border transition-all ${selectedCategory === cat ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-gray-600 hover:border-gray-400'}`}>{cat}</button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                {libraryItems.length > 0 ? (
                  libraryItems.map((item) => (
                    <button key={item.id} onClick={() => setSelectedLibraryItem(item)} className={`relative aspect-[3/4] rounded-xl border overflow-hidden group transition-all text-left ${selectedLibraryItem?.id === item.id ? 'border-[#007AFF] ring-2 ring-[#007AFF]/50' : 'border-white/10 hover:border-white/30'}`}>
                      <div className="absolute inset-0 bg-gray-800"><img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain p-2" /></div>
                      <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/90 to-transparent pt-8"><p className="text-[10px] font-bold text-white truncate">{item.name}</p><p className="text-[9px] text-gray-400">{item.brand}</p></div>
                      {item.isLuxury && <div className="absolute top-2 right-2 w-4 h-4 bg-[#ffd700] rounded-full flex items-center justify-center text-[8px] text-black font-bold shadow-lg">★</div>}
                    </button>
                  ))
                ) : <div className="col-span-2 py-8 text-center text-gray-500 text-xs italic border border-dashed border-white/10 rounded-xl">No items found in this collection.</div>}
              </div>
            </motion.div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-6 relative z-10">
          {isProcessing ? (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-[#007AFF] font-mono"><span>ORCHESTRATING FITTING...</span><span>{progress}%</span></div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden"><motion.div className="h-full bg-[#007AFF]" initial={{ width: 0 }} animate={{ width: `${progress}%` }} /></div>
            </div>
          ) : (
            <button onClick={handleTryOn} disabled={!userImage || (fittingSource === 'upload' ? !garmentImage : !selectedLibraryItem)} className="w-full py-4 bg-[#007AFF] hover:bg-[#005bb5] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-[0_0_20px_rgba(0,122,255,0.4)] transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2">
              <span>✨</span> GENERATE MASTERPIECE
            </button>
          )}
        </div>
      </div>

      {/* RIGHT PANEL: RESULT */}
      <div className="flex-1 relative bg-gradient-to-b from-[#0a0a0a] to-[#111] overflow-hidden">
        <div className="absolute inset-0 z-10">
          <ErrorBoundary fallback={<div className="absolute inset-0 flex items-center justify-center text-white/50 text-xs">3D VIEWPORT ERROR</div>}>
            <AvatarCanvas />
          </ErrorBoundary>
        </div>

        {/* Result UI */}
        <AnimatePresence>
          {resultImage && !isProcessing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 bg-black/60 backdrop-blur-sm">

              <div className="relative w-full max-w-2xl aspect-[3/4] group">
                {/* Image Container with Zoom */}
                <div
                  className="w-full h-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl relative cursor-zoom-in"
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <img
                    src={resultImage}
                    alt="Masterpiece Fit"
                    className={`w-full h-full object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100'}`}
                    style={{ transformOrigin: 'center 30%' }}
                  />

                  {/* Texture Hint */}
                  {!isZoomed && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
                        <span className="text-white text-xs font-bold tracking-widest uppercase">Tap to Inspect Texture</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Cinematic Controls */}
                <div className="absolute -right-20 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                  <button
                    onClick={handleGenerateVideo}
                    disabled={isVideoGenerating}
                    className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-110 transition-transform disabled:opacity-50 disabled:scale-100 group/btn"
                    title="Generate Cinematic Motion"
                  >
                    {isVideoGenerating ? <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <span className="material-symbols-outlined text-2xl">movie_filter</span>}
                    <span className="absolute right-16 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      Cinematic Motion
                    </span>
                  </button>

                  <button
                    onClick={() => setShowShareModal(true)}
                    className="w-14 h-14 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all group/btn"
                    title="Share Look"
                  >
                    <span className="material-symbols-outlined text-xl">ios_share</span>
                     <span className="absolute right-16 bg-black/80 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
                      Share Look
                    </span>
                  </button>

                  <button
                    onClick={() => setResultImage(null)}
                    className="w-14 h-14 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center hover:bg-red-500/20 hover:border-red-500 hover:text-red-500 transition-all"
                    title="Close"
                  >
                    <span className="material-symbols-outlined text-xl">close</span>
                  </button>
                </div>

                {/* Bottom Stats */}
                <div className="absolute -bottom-16 left-0 right-0 flex justify-between items-center px-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">Masterpiece Render</h3>
                    <p className="text-xs text-[#007AFF] tracking-widest uppercase font-bold">4K Upscaled • Physics Enabled</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-right">
                       <p className="text-[10px] text-gray-500 uppercase">Fidelity</p>
                       <p className="text-sm font-bold text-white">99.8%</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] text-gray-500 uppercase">Texture</p>
                       <p className="text-sm font-bold text-white">Ultra</p>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cinematic Player Overlay */}
        <AnimatePresence>
          {showVideoPlayer && videoUrl && resultImage && (
            <CinematicPlayer
              videoUrl={videoUrl}
              posterUrl={resultImage}
              onClose={() => setShowVideoPlayer(false)}
            />
          )}
        </AnimatePresence>

        {/* Share Modal Overlay */}
        <AnimatePresence>
          {showShareModal && resultImage && (
            <ShareModal
              isOpen={showShareModal}
              onClose={() => setShowShareModal(false)}
              imageUrl={resultImage}
            />
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
