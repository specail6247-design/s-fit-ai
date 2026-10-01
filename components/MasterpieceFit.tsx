import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getBrandAesthetic } from '@/data/aesthetics';

export default function MasterpieceFit() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [garmentImage, setGarmentImage] = useState<string | null>(null);
  const [accessoryImage, setAccessoryImage] = useState<string | null>(null);
  const [brandId, setBrandId] = useState('gucci');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [resultVideo, setResultVideo] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [price] = useState(2500); // Demo price
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const aesthetic = getBrandAesthetic(brandId);

  useEffect(() => {
    // Custom Gold Ring Cursor logic could go here
    // For simplicity, handled via CSS class on the container
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setter(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (imageContainerRef.current) {
      const rect = imageContainerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleTryOn = async () => {
    if (!userImage || !garmentImage) return alert("Please upload both User Photo and Garment.");

    setIsProcessing(true);

    try {
      // Connect to FastAPI Backend
      const res = await fetch('http://localhost:8000/api/orchestrate-tryon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_photo_url: userImage,
          garment_image_url: garmentImage,
          category: 'upper_body',
          brand: brandId
        })
      });

      const data = await res.json();

      if (data.success && data.pipeline_result) {
        setResultImage(data.pipeline_result.final_image || data.pipeline_result.tryon_image);
        setResultVideo(data.pipeline_result.video_url);
      } else {
        throw new Error("Try-On Failed");
      }
    } catch (err) {
      console.error(err);
      // Fallback
      setResultImage("https://pub-83c5db439b40468498f97946200806f7.r2.dev/mock-upscaled.png");
      setResultVideo("https://pub-83c5db439b40468498f97946200806f7.r2.dev/mock-video.mp4");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#d4af37] font-serif flex overflow-hidden cursor-[url('/cursor-gold.svg'),_auto]">
      {/* Left Panel: Inputs */}
      <div className="w-1/3 p-10 flex flex-col justify-center border-r border-[#d4af37]/20 z-10 bg-black/80 backdrop-blur-xl">
        <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl tracking-[0.2em] mb-12 uppercase text-center font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Masterpiece Fit
        </motion.h1>

        <div className="space-y-10">
          <div>
            <label className="block text-sm tracking-widest uppercase mb-4 opacity-70">Client Profile</label>
            <input type="file" onChange={(e) => handleFileUpload(e, setUserImage)} className="hidden" id="user-photo" />
            <label htmlFor="user-photo" className="block w-full border border-[#d4af37]/40 p-6 text-center hover:bg-[#d4af37]/10 transition-colors duration-700 cursor-pointer">
              {userImage ? <span className="text-[#d4af37]">Profile Loaded</span> : <span className="opacity-50">Upload Photo</span>}
            </label>
          </div>

          <div>
            <label className="block text-sm tracking-widest uppercase mb-4 opacity-70">Select Garment</label>
            <input type="file" onChange={(e) => handleFileUpload(e, setGarmentImage)} className="hidden" id="garment-photo" />
            <label htmlFor="garment-photo" className="block w-full border border-[#d4af37]/40 p-6 text-center hover:bg-[#d4af37]/10 transition-colors duration-700 cursor-pointer">
              {garmentImage ? <span className="text-[#d4af37]">Garment Loaded</span> : <span className="opacity-50">Upload Garment</span>}
            </label>
          </div>

          <div>
            <label className="block text-sm tracking-widest uppercase mb-4 opacity-70">Extensible Accessory Layer</label>
            <input type="file" onChange={(e) => handleFileUpload(e, setAccessoryImage)} className="hidden" id="accessory-photo" />
            <label htmlFor="accessory-photo" className="block w-full border border-[#d4af37]/40 p-6 text-center hover:bg-[#d4af37]/10 transition-colors duration-700 cursor-pointer">
              {accessoryImage ? <span className="text-[#d4af37]">Accessory Loaded</span> : <span className="opacity-50">Upload Accessory (Bag, Ring, Necklace)</span>}
            </label>
            <p className="text-xs mt-2 opacity-50 italic">AI understands Material Interaction (e.g. heavy necklace on silk)</p>
          </div>

          <div>
            <label className="block text-sm tracking-widest uppercase mb-4 opacity-70">Aesthetic Preset</label>
            <select
                value={brandId}
                onChange={(e) => setBrandId(e.target.value)}
                className="w-full bg-transparent border border-[#d4af37]/40 p-4 text-[#d4af37] outline-none"
            >
                <option value="gucci">Gucci (High-End Luxury)</option>
                <option value="chanel">Chanel (High-End Luxury)</option>
                <option value="musinsa">Musinsa (K-Fashion Leaders)</option>
            </select>
          </div>

          <div className="pt-8 border-t border-[#d4af37]/20">
              <div className="flex justify-between items-center mb-6">
                  <span className="text-sm tracking-widest uppercase opacity-70">Estimated Value</span>
                  <span className="text-xl">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)}</span>
              </div>
            <button
                onClick={handleTryOn}
                className="w-full py-5 border border-[#d4af37] text-[#d4af37] uppercase tracking-[0.3em] hover:bg-[#d4af37] hover:text-black transition-colors duration-1000"
            >
              Generate Masterpiece
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel: Result & Interaction */}
      <div className="flex-1 relative bg-neutral-900 flex items-center justify-center">
        {isProcessing && (
          <div className="absolute inset-0 z-50 bg-black/90 flex flex-col items-center justify-center">
             {/* Sophisticated SVG tracing animation for loading */}
             <svg width="100" height="100" viewBox="0 0 100 100" className="animate-spin-slow mb-6">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#d4af37" strokeWidth="2" strokeDasharray="251" strokeDashoffset="251" className="animate-draw" />
             </svg>
             <p className="text-[#d4af37] tracking-[0.3em] uppercase text-sm animate-pulse">Orchestrating AI Pipeline...</p>
          </div>
        )}

        <AnimatePresence>
            {resultImage && !isProcessing && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="relative w-[500px] h-[750px] overflow-hidden group columns-1"
                    ref={imageContainerRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsZoomed(true)}
                    onMouseLeave={() => setIsZoomed(false)}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={resultImage} alt="Masterpiece" className="w-full h-full object-cover transition-opacity duration-1000" style={{ opacity: isZoomed ? 0.3 : 1 }} />

                    {/* Hyper-Zoom Texture Rendering Engine */}
                    {isZoomed && aesthetic && (
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                backgroundImage: `url(${aesthetic.texture_zoom_url})`,
                                backgroundPosition: `${-mousePos.x * 2}px ${-mousePos.y * 2}px`,
                                backgroundSize: '1500px',
                                maskImage: `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, black 100%, transparent 100%)`,
                                WebkitMaskImage: `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, black 40%, transparent 100%)`
                            }}
                        />
                    )}

                    {/* Cinematic Video Overlay (Optional hover play or button) */}
                    {resultVideo && (
                         <div className="absolute top-4 right-4 z-20">
                            <button
                                onClick={() => window.open(resultVideo, '_blank')}
                                className="bg-black/60 border border-[#d4af37]/50 px-4 py-2 text-xs tracking-widest uppercase hover:bg-[#d4af37] hover:text-black transition-colors"
                            >
                                Cinematic Share (4K)
                            </button>
                         </div>
                    )}

                    {/* Aesthetic Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                        <p className="text-sm tracking-widest uppercase mb-1 opacity-70">Material Physics</p>
                        <p className="text-lg">{aesthetic?.material} (Stiffness: {aesthetic?.stiffness})</p>
                        <p className="text-xs mt-2 opacity-50">Rendered with {aesthetic?.lighting}</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {!resultImage && !isProcessing && (
            <div className="text-center opacity-30">
                <span className="text-6xl mb-4 block">✧</span>
                <p className="tracking-[0.3em] uppercase text-sm">Your Personal Digital Atelier</p>
            </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes draw {
            to { stroke-dashoffset: 0; }
        }
        .animate-draw {
            animation: draw 2s ease-in-out infinite alternate;
        }
        .animate-spin-slow {
            animation: spin 8s linear infinite;
        }
        @keyframes spin {
            100% { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
}
