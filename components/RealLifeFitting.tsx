import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { mockClothingItems, type ClothingItem } from '@/data/mockData';
import ZoomableImage from '@/components/ui/ZoomableImage';
import CinematicViewer from '@/components/ui/CinematicViewer';

// Dynamically import the 3D scene with SSR disabled
const AvatarCanvas = dynamic(() => import('./AvatarCanvas'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 flex items-center justify-center text-[#007AFF] font-mono text-xs animate-pulse">LOADING 3D ENGINE...</div>
});

// --- MAIN CONTROL COMPONENT ---
export default function RealLifeFitting() {
  const [fittingMode, setFittingMode] = useState<'upload' | 'library'>('upload');
  const [activeCategory, setActiveCategory] = useState('All');
  const [userImage, setUserImage] = useState<string | null>(null);
  const [garmentImage, setGarmentImage] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setter(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = async () => {
    // Validation
    if (!userImage) return alert("Please upload your photo first.");
    
    if (fittingMode === 'upload' && !garmentImage) return alert("Please upload a garment image.");
    if (fittingMode === 'library' && !selectedItem) return alert("Please select an item from the library.");

    const targetGarmentUrl = fittingMode === 'library' && selectedItem ? selectedItem.imageUrl : garmentImage;
    const targetCategory = fittingMode === 'library' && selectedItem ? selectedItem.category : 'tops';

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
          garmentImageUrl: targetGarmentUrl,
          category: targetCategory
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

  const handleGenerateVideo = async () => {
     if (!resultImage) return;

     setIsGeneratingVideo(true);
     setVideoUrl(null);

     try {
       const res = await fetch('/api/cinematic-try-on', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ imageUrl: resultImage })
       });
       const data = await res.json();

       if (data.success && data.videoUrl) {
          setVideoUrl(data.videoUrl);
       } else {
          // Fallback demo video if API fails or token missing
          console.warn("API failed, using fallback video");
          setVideoUrl("https://cdn.openai.com/sora/sora-videos/fashion.mp4"); // Placeholder high quality video
       }
     } catch (err) {
        console.error("Video generation failed", err);
        setVideoUrl("https://cdn.openai.com/sora/sora-videos/fashion.mp4");
     } finally {
        setIsGeneratingVideo(false);
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
                  {userImage ? <img src={userImage} alt="User Upload" className="w-full h-full object-cover" /> : <span className="text-2xl">👤</span>}
                </div>
                <div>
                  <div className="text-sm font-bold group-hover:text-white text-gray-300">Upload User Photo</div>
                  <div className="text-[10px] text-gray-500">Supports JPG, PNG (Max 5MB)</div>
                </div>
              </label>
            </div>
          </div>

          {/* Garment Input Section */}
          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#007AFF] uppercase">02. Target Garment</label>
                <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                   <button
                      onClick={() => setFittingMode('upload')}
                      className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${fittingMode === 'upload' ? 'bg-[#007AFF] text-white' : 'text-gray-400 hover:text-white'}`}
                   >
                      UPLOAD
                   </button>
                   <button
                      onClick={() => setFittingMode('library')}
                      className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${fittingMode === 'library' ? 'bg-[#007AFF] text-white' : 'text-gray-400 hover:text-white'}`}
                   >
                      LIBRARY
                   </button>
                </div>
             </div>

            {fittingMode === 'upload' ? (
               <div className="border border-white/20 bg-black/40 rounded-xl p-4 hover:border-[#007AFF] transition-colors group">
                 <input type="file" onChange={(e) => handleFileUpload(e, setGarmentImage)} className="hidden" id="garment-upload" />
                 <label htmlFor="garment-upload" className="cursor-pointer flex items-center gap-4">
                   <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden border border-white/10">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     {garmentImage ? <img src={garmentImage} alt="Garment Upload" className="w-full h-full object-cover" /> : <span className="text-2xl">👕</span>}
                   </div>
                   <div>
                     <div className="text-sm font-bold group-hover:text-white text-gray-300">Select Garment</div>
                     <div className="text-[10px] text-gray-500">Front view preferred</div>
                   </div>
                 </label>
               </div>
            ) : (
               <div className="space-y-3">
                  {/* Category Filter */}
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                     {['All', 'Luxury', 'Accessories', 'Tops', 'Dresses', 'Bottoms'].map((cat) => (
                        <button
                           key={cat}
                           onClick={() => setActiveCategory(cat)}
                           className={`px-3 py-1.5 border border-white/10 rounded-full text-[10px] font-bold uppercase whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-white text-black' : 'hover:bg-white/10 text-gray-300'}`}
                        >
                           {cat}
                        </button>
                     ))}
                  </div>

                  {/* Grid */}
                  <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                     {mockClothingItems.filter(item => {
                        if (activeCategory === 'All') return true;
                        if (activeCategory === 'Luxury') return item.isLuxury;
                        return item.category.toLowerCase() === activeCategory.toLowerCase();
                     }).map((item) => (
                        <div
                           key={item.id}
                           onClick={() => setSelectedItem(item)}
                           className={`relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer border-2 transition-all group ${selectedItem?.id === item.id ? 'border-[#007AFF] shadow-[0_0_15px_rgba(0,122,255,0.4)]' : 'border-transparent hover:border-white/30'}`}
                        >
                           {/* eslint-disable-next-line @next/next/no-img-element */}
                           <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                              <span className="text-[9px] font-bold text-white leading-tight">{item.brand}</span>
                              <span className="text-[8px] text-gray-300 truncate">{item.name}</span>
                           </div>
                           {/* Selection Indicator */}
                           {selectedItem?.id === item.id && (
                              <div className="absolute top-2 right-2 w-4 h-4 bg-[#007AFF] rounded-full flex items-center justify-center">
                                 <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                              </div>
                           )}
                           {item.category === 'accessories' && (
                              <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-purple-500/80 rounded-sm text-[8px] font-bold text-white uppercase backdrop-blur-sm">
                                 ACC
                              </div>
                           )}
                        </div>
                     ))}
                  </div>
               </div>
            )}
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
        <AnimatePresence>
          {resultImage && !isProcessing && !videoUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl max-w-[90vw] max-h-[90vh] overflow-hidden flex flex-col items-center"
            >
              <div className="relative group w-auto h-[70vh]">
                <ZoomableImage src={resultImage} alt="Virtual Try-On Result" className="w-full h-full rounded-xl" />

                <button
                  onClick={() => setResultImage(null)}
                  className="absolute top-4 right-4 bg-black/60 text-white rounded-full p-2 hover:bg-[#007AFF] transition-colors z-50"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>

                <div className="absolute bottom-4 left-4 pointer-events-none bg-black/60 text-[#007AFF] px-3 py-1 rounded-md text-xs font-bold font-mono border border-[#007AFF]/30 z-10">
                  AI GENERATED_
                </div>
              </div>

              {/* Actions */}
              <div className="w-full mt-4 flex gap-3">
                 <button
                    onClick={handleGenerateVideo}
                    disabled={isGeneratingVideo}
                    className="flex-1 py-3 bg-[#007AFF] hover:bg-[#0060df] disabled:bg-gray-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,122,255,0.3)]"
                 >
                    {isGeneratingVideo ? (
                       <>
                          <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></span>
                          <span>RENDERING 4K VIDEO...</span>
                       </>
                    ) : (
                       <>
                          <span className="material-symbols-outlined">movie_filter</span>
                          <span>GENERATE CINEMATIC VIDEO</span>
                       </>
                    )}
                 </button>
                 <button className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/10">
                    <span className="material-symbols-outlined">share</span>
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cinematic Video Result */}
        <AnimatePresence>
           {videoUrl && (
              <motion.div
                 initial={{ opacity: 0, y: 50 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: 50 }}
                 className="absolute inset-0 z-30 bg-black/90 backdrop-blur-xl flex items-center justify-center p-8"
              >
                 <div className="w-full max-w-md">
                    <div className="flex justify-between items-center mb-6">
                       <h3 className="text-2xl font-bold italic tracking-tighter">CINEMATIC <span className="text-[#007AFF]">MODE</span></h3>
                       <button onClick={() => setVideoUrl(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                          <span className="material-symbols-outlined">close</span>
                       </button>
                    </div>

                    <CinematicViewer videoUrl={videoUrl} className="shadow-[0_0_50px_rgba(0,122,255,0.2)] border border-white/10" />

                    <div className="mt-8 grid grid-cols-2 gap-4">
                       <button className="py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                          <span className="material-symbols-outlined">download</span>
                          SAVE TO GALLERY
                       </button>
                       <button className="py-3 bg-[#E1306C] text-white font-bold rounded-full hover:bg-[#C13584] transition-colors flex items-center justify-center gap-2">
                          <span className="material-symbols-outlined">share</span>
                          SHARE TO STORY
                       </button>
                    </div>
                 </div>
              </motion.div>
           )}
        </AnimatePresence>
      </div>
    </div>
  );
}
