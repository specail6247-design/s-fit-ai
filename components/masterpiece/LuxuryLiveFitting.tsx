/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Cinzel, Playfair_Display } from "next/font/google";
import { mockClothingItems, ClothingItem } from "@/data/mockData";

const cinzel = Cinzel({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [garmentImage, setGarmentImage] = useState<string | null>(null);
  const [selectedGarment, setSelectedGarment] = useState<ClothingItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('tops');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [resultVideoUrl, setResultVideoUrl] = useState<string | null>(null);
  const [processingStage, setProcessingStage] = useState<string>("");

  const filteredItems = useMemo(() => {
    return mockClothingItems.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  // Background Ambience
  useEffect(() => {
    // Optional: Load ambient sound here
  }, []);

  return (
    <div className={`relative min-h-screen w-full bg-[#0a0a0a] text-[#D4AF37] overflow-hidden ${playfair.className}`}>
      {/* Background Video/Effect */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-[#0a0a0a] to-[#0a0a0a]"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 flex items-center justify-between p-8 border-b border-[#D4AF37]/20 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="flex flex-col">
          <h1 className={`text-3xl font-bold tracking-widest ${cinzel.className}`}>MASTERPIECE FIT</h1>
          <span className="text-[10px] tracking-[0.3em] text-[#D4AF37]/60 uppercase">The Digital Atelier</span>
        </div>
        <nav className="flex gap-8 text-xs tracking-widest uppercase text-[#D4AF37]/80">
          <button className="hover:text-white transition-colors">Collection</button>
          <button className="hover:text-white transition-colors">Atelier</button>
          <button className="hover:text-white transition-colors">Vault</button>
        </nav>
      </header>

      {/* Main Content Grid */}
      <main className="relative z-10 grid grid-cols-12 h-[calc(100vh-100px)]">

        {/* Left Panel: Controls & Selection */}
        <div className="col-span-3 border-r border-[#D4AF37]/20 p-6 overflow-y-auto custom-scrollbar">
            <h2 className={`text-xl mb-6 ${cinzel.className}`}>Atelier Controls</h2>

            {/* User Photo Upload */}
            <div className="mb-8">
                <label className="block text-xs uppercase tracking-widest mb-3 text-[#D4AF37]/70">01. Subject Identification</label>
                <div className="border border-[#D4AF37]/30 border-dashed rounded-sm p-8 flex flex-col items-center justify-center hover:bg-[#D4AF37]/5 transition-colors cursor-pointer group relative">
                    <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = (ev) => setUserImage(ev.target?.result as string);
                                reader.readAsDataURL(file);
                            }
                        }}
                    />
                    {userImage ? (
                        <img src={userImage} alt="User" className="w-24 h-24 object-cover rounded-full border border-[#D4AF37]" />
                    ) : (
                        <div className="text-center">
                            <span className="material-symbols-outlined text-3xl mb-2 text-[#D4AF37]/50 group-hover:text-[#D4AF37]">face_3</span>
                            <p className="text-[10px] uppercase tracking-widest text-[#D4AF37]/50">Upload Portrait</p>
                        </div>
                    )}
                </div>
            </div>

            {/* ACTION BUTTON */}
            <button
                onClick={async () => {
                    if (!userImage || !garmentImage) return alert("Please upload a photo and select a garment.");

                    setIsProcessing(true);
                    setResultVideoUrl(null);
                    setResultImage(null);

                    try {
                        // 1. Try-On (IDM-VTON)
                        setProcessingStage("Draping Fabric (High-Precision Physics)...");
                        const tryOnRes = await fetch('/api/try-on', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                userPhotoUrl: userImage,
                                garmentImageUrl: garmentImage,
                                category: selectedCategory === 'accessories' ? 'tops' : selectedCategory // Simplified mapping
                            })
                        });

                        const tryOnData = await tryOnRes.json();
                        if (!tryOnData.imageUrl) throw new Error(tryOnData.error || "Try-On Failed");
                        setResultImage(tryOnData.imageUrl);

                        // 2. Cinematic Video (Runway/SVD)
                        setProcessingStage("Generating Cinematic Motion (4K Render)...");
                        const videoRes = await fetch('/api/runway-motion', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                imageUrl: tryOnData.imageUrl,
                                upscale: true // Ensure sharpness before motion
                            })
                        });

                        const videoData = await videoRes.json();
                        if (videoData.videoUrl) {
                            setResultVideoUrl(videoData.videoUrl);
                        } else {
                            console.warn("Video generation failed, showing image only");
                        }

                    } catch (err) {
                        console.error(err);
                        alert("Fitting Process Failed. Please try again.");
                    } finally {
                        setIsProcessing(false);
                        setProcessingStage("");
                    }
                }}
                disabled={isProcessing || !userImage || !garmentImage}
                className="w-full mb-8 py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isProcessing ? "Processing..." : "Initiate Masterpiece Fit"}
            </button>

            {/* Garment Categories & Selection */}
            <div className="mb-8 flex-1 flex flex-col min-h-0">
                <label className="block text-xs uppercase tracking-widest mb-3 text-[#D4AF37]/70">02. Curated Selection</label>

                {/* Category Filter */}
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide shrink-0">
                    {['tops', 'bottoms', 'dresses', 'outerwear', 'accessories'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1 text-[10px] uppercase tracking-wider border transition-all whitespace-nowrap ${selectedCategory === cat ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'border-[#D4AF37]/30 text-[#D4AF37]/60 hover:border-[#D4AF37]'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-2 gap-4 overflow-y-auto pr-2 custom-scrollbar pb-12">
                    {filteredItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => {
                                setGarmentImage(item.imageUrl);
                                setSelectedGarment(item);
                            }}
                            className={`relative group cursor-pointer border transition-all ${selectedGarment?.id === item.id ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-[#D4AF37]/10 hover:border-[#D4AF37]/50'}`}
                        >
                            <div className="aspect-[3/4] overflow-hidden bg-[#111] relative">
                                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                {item.isLuxury && (
                                    <div className="absolute top-2 right-2 bg-black/80 text-[#D4AF37] text-[8px] px-1.5 py-0.5 border border-[#D4AF37]/30 uppercase tracking-widest">
                                        Luxury
                                    </div>
                                )}
                            </div>
                            <div className="p-3">
                                <p className="text-[10px] text-[#D4AF37]/60 uppercase tracking-wider mb-1">{item.brand}</p>
                                <p className={`text-xs text-[#D4AF37] leading-tight line-clamp-2 ${cinzel.className}`}>{item.name}</p>
                                <p className="text-[10px] text-[#D4AF37]/40 mt-1">{item.currency} {item.price}</p>
                            </div>
                        </div>
                    ))}
                    {filteredItems.length === 0 && (
                         <div className="col-span-2 text-center py-12 text-[#D4AF37]/30 text-xs uppercase tracking-widest">
                             No items in this collection
                         </div>
                    )}
                </div>
            </div>
        </div>

        {/* Center Panel: Fitting Stage */}
        <div className="col-span-9 relative bg-[#050505] flex items-center justify-center overflow-hidden">
            {/* Stage Lighting Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-full bg-gradient-to-b from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none"></div>

            {/* Main Visual */}
            <div className="relative z-10 max-h-[80vh] w-auto aspect-[3/4] border border-[#D4AF37]/10 bg-[#0a0a0a] shadow-2xl shadow-[#D4AF37]/5 flex items-center justify-center group overflow-hidden">
                <div className="relative w-full h-full transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[2.5] cursor-zoom-in">
                    {resultVideoUrl ? (
                        <video
                            src={resultVideoUrl}
                            autoPlay
                            loop
                            muted
                            className="w-full h-full object-cover"
                        />
                    ) : resultImage ? (
                        <img
                            src={resultImage}
                            alt="Result"
                            className="w-full h-full object-cover"
                        />
                    ) : userImage ? (
                        <img
                            src={userImage}
                            alt="Subject"
                            className="w-full h-full object-cover opacity-80"
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center">
                            <span className={`text-4xl opacity-20 ${cinzel.className}`}>M_FIT</span>
                            <p className="text-xs uppercase tracking-[0.5em] mt-4 opacity-30">Waiting for Subject</p>
                        </div>
                    )}
                </div>

                {/* Cinematic Share Overlay (Only visible when result exists) */}
                {(resultVideoUrl || resultImage) && (
                    <div className="absolute bottom-8 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none group-hover:pointer-events-auto">
                        <button
                            onClick={() => {
                                const link = document.createElement('a');
                                link.href = resultVideoUrl || resultImage || "";
                                link.download = resultVideoUrl ? 'MasterpieceFit_Cinematic.mp4' : 'MasterpieceFit_Look.png';
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            }}
                            className="flex items-center gap-3 bg-[#D4AF37] text-black px-8 py-3 rounded-sm hover:bg-white transition-colors shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                        >
                            <span className="material-symbols-outlined text-lg">movie_filter</span>
                            <span className="text-xs font-bold uppercase tracking-widest">Cinematic Share</span>
                        </button>
                    </div>
                )}

                {/* Hyper-Zoom Hint */}
                {(resultVideoUrl || resultImage) && (
                    <div className="absolute top-4 right-4 flex items-center gap-2 opacity-50 group-hover:opacity-0 transition-opacity">
                        <span className="material-symbols-outlined text-[#D4AF37] text-sm">zoom_in</span>
                        <span className="text-[10px] uppercase tracking-widest text-[#D4AF37]">Hyper-Zoom Active</span>
                    </div>
                )}
            </div>

            {/* Processing Overlay */}
            {isProcessing && (
                <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center">
                    <div className="w-16 h-16 border-t-2 border-[#D4AF37] rounded-full animate-spin mb-4"></div>
                    <p className={`text-xl text-[#D4AF37] ${cinzel.className} animate-pulse`}>Crafting Masterpiece</p>
                    <p className="text-xs uppercase tracking-widest text-[#D4AF37]/50 mt-2">{processingStage}</p>
                </div>
            )}
        </div>

      </main>
    </div>
  );
}
