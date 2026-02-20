'use client';

import React, { useState } from 'react';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

// Mock Accessories
const ACCESSORIES = [
  { id: 'acc1', name: 'None', image: null },
  { id: 'acc2', name: 'Golden Chain Necklace', image: 'https://placehold.co/300x300/gold/white?text=Necklace' },
  { id: 'acc3', name: 'Luxury Leather Bag', image: 'https://placehold.co/300x300/black/white?text=Bag' },
  { id: 'acc4', name: 'Silk Scarf', image: 'https://placehold.co/300x300/red/white?text=Scarf' },
];

export default function MasterpieceFitting() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [garmentImage, setGarmentImage] = useState<string | null>(null);
  const [selectedAccessory, setSelectedAccessory] = useState(ACCESSORIES[0]);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [highResImage, setHighResImage] = useState<string | null>(null);
  const [cinematicVideo, setCinematicVideo] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<string>(''); // For progress messages
  const [isZoomed, setIsZoomed] = useState(false);

  // File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setter(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Mock API Call (Replace with actual backend call later)
  const handleTryOn = async () => {
    if (!userImage || !garmentImage) return alert("Please upload User Photo and Garment.");

    setIsProcessing(true);
    setStatus("Initializing Masterpiece Engine...");

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    try {
        const response = await fetch(`${API_URL}/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_photo: userImage,
                garment_image: garmentImage,
                accessory_image: selectedAccessory.image,
                category: 'upper_body'
            })
        });

        if (!response.ok) throw new Error("Backend connection failed");

        const data = await response.json();

        if (data.success && data.image_url) {
             setResultImage(data.image_url);
        } else {
             throw new Error(data.error || "Generation Failed");
        }
    } catch (err) {
        console.error("Backend Error, using fallback:", err);
        // Fallback for demo
        setStatus("Backend unavailable, using demo mode...");
        await new Promise(resolve => setTimeout(resolve, 1500));
        setResultImage("https://placehold.co/600x800/1a1a1a/white?text=Result+(Demo)");
    } finally {
        setIsProcessing(false);
        setStatus("");
    }
  };

  const handleCinematic = async () => {
      if (!resultImage) return;
      setIsProcessing(true);
      setStatus("Generating Cinematic Video (Runway Gen-3)...");

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      try {
        const response = await fetch(`${API_URL}/cinematic`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                image_url: resultImage
            })
        });

        if (!response.ok) throw new Error("Backend connection failed");

        const data = await response.json();

        if (data.success && data.video_url) {
             setCinematicVideo(data.video_url);
        } else {
             throw new Error(data.error || "Video Generation Failed");
        }
      } catch (err) {
          console.error("Backend Error:", err);
          await new Promise(resolve => setTimeout(resolve, 1500));
          setCinematicVideo("https://www.w3schools.com/html/mov_bbb.mp4"); // Mock video
      } finally {
          setIsProcessing(false);
          setStatus("");
      }
  }

  const handleUpscale = async () => {
      if (!resultImage) return;
      setIsProcessing(true);
      setStatus("Upscaling Texture (Hyper-Zoom)...");

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      try {
        const response = await fetch(`${API_URL}/upscale`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                image_url: resultImage
            })
        });

        if (!response.ok) throw new Error("Backend connection failed");

        const data = await response.json();

        if (data.success && data.image_url) {
             setHighResImage(data.image_url);
             setIsZoomed(true);
        } else {
             throw new Error(data.error || "Upscaling Failed");
        }
      } catch (err) {
          console.error("Backend Error:", err);
          await new Promise(resolve => setTimeout(resolve, 1500));
          setHighResImage("https://placehold.co/1200x1600/1a1a1a/white?text=High+Res+Texture");
          setIsZoomed(true);
      } finally {
          setIsProcessing(false);
          setStatus("");
      }
  }

  return (
    <div className={`min-h-screen bg-[#050505] text-white flex flex-col md:flex-row overflow-hidden ${spaceGrotesk.className}`}>

      {/* Left Panel: Controls */}
      <div className="w-full md:w-1/3 min-w-[350px] p-6 border-r border-white/10 flex flex-col h-screen overflow-y-auto bg-black/90 backdrop-blur-md z-10">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-2">
             <span className="material-symbols-outlined text-[#ecab13]">diamond</span>
             <h1 className="text-xl font-bold tracking-widest uppercase text-[#ecab13]">Masterpiece Fit</h1>
          </div>
          <p className="text-xs text-gray-500 tracking-[0.2em] uppercase">Cinematic Virtual Atelier</p>
        </header>

        <div className="space-y-6 flex-1">
          {/* Step 1: User */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#ecab13] uppercase tracking-widest">01. Muse (User)</label>
            <div className="border border-white/10 bg-white/5 rounded-lg p-3 hover:border-[#ecab13]/50 transition-colors">
               <input type="file" onChange={(e) => handleFileUpload(e, setUserImage)} className="hidden" id="user-upload-lux" />
               <label htmlFor="user-upload-lux" className="cursor-pointer flex items-center gap-4">
                 <div className="w-12 h-12 bg-black rounded border border-white/10 overflow-hidden flex items-center justify-center">
                    {userImage ? <img src={userImage} className="w-full h-full object-cover" alt="User" /> : <span className="text-xl text-gray-600">👤</span>}
                 </div>
                 <div>
                    <div className="text-xs font-bold text-gray-300">Upload Photo</div>
                    <div className="text-[9px] text-gray-600">Full body preferred</div>
                 </div>
               </label>
            </div>
          </div>

          {/* Step 2: Garment */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#ecab13] uppercase tracking-widest">02. Masterpiece (Garment)</label>
            <div className="border border-white/10 bg-white/5 rounded-lg p-3 hover:border-[#ecab13]/50 transition-colors">
               <input type="file" onChange={(e) => handleFileUpload(e, setGarmentImage)} className="hidden" id="garment-upload-lux" />
               <label htmlFor="garment-upload-lux" className="cursor-pointer flex items-center gap-4">
                 <div className="w-12 h-12 bg-black rounded border border-white/10 overflow-hidden flex items-center justify-center">
                    {garmentImage ? <img src={garmentImage} className="w-full h-full object-cover" alt="Garment" /> : <span className="text-xl text-gray-600">👗</span>}
                 </div>
                 <div>
                    <div className="text-xs font-bold text-gray-300">Select Garment</div>
                    <div className="text-[9px] text-gray-600">High resolution</div>
                 </div>
               </label>
            </div>
          </div>

          {/* Step 3: Accessories */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#ecab13] uppercase tracking-widest">03. Accents (Accessories)</label>
            <div className="grid grid-cols-4 gap-2">
                {ACCESSORIES.map(acc => (
                    <button
                        key={acc.id}
                        onClick={() => setSelectedAccessory(acc)}
                        className={`aspect-square rounded border ${selectedAccessory.id === acc.id ? 'border-[#ecab13] bg-[#ecab13]/10' : 'border-white/10 bg-black'} flex items-center justify-center relative overflow-hidden group transition-all`}
                        title={acc.name}
                    >
                        {acc.image ? <img src={acc.image} className="w-full h-full object-cover opacity-70 group-hover:opacity-100" /> : <span className="text-[9px] text-gray-600">None</span>}
                    </button>
                ))}
            </div>
            <p className="text-[9px] text-gray-500 italic mt-1">Selected: {selectedAccessory.name}</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6">
            <button
                onClick={handleTryOn}
                disabled={isProcessing || !userImage || !garmentImage}
                className="w-full py-4 bg-gradient-to-r from-[#ecab13] to-[#c48a0a] text-black font-bold uppercase tracking-widest text-xs rounded shadow-[0_0_20px_rgba(236,171,19,0.2)] hover:shadow-[0_0_30px_rgba(236,171,19,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isProcessing ? status : 'Reveal Masterpiece'}
            </button>
        </div>
      </div>

      {/* Right Panel: Display */}
      <div className="flex-1 relative bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
         {/* Background Ambience */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a1a1a] to-black opacity-50 pointer-events-none" />

         {/* Main Content */}
         <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
            {!resultImage ? (
                <div className="text-center space-y-4 opacity-30">
                    <span className="material-symbols-outlined text-6xl font-thin">checkroom</span>
                    <p className="text-xs tracking-[0.3em] uppercase">Atelier Awaiting Input</p>
                </div>
            ) : (
                <div className="relative w-full max-w-lg h-full max-h-[80vh] group">
                    {cinematicVideo ? (
                        <video src={cinematicVideo} autoPlay loop controls className="w-full h-full object-contain rounded-lg shadow-2xl border border-white/10" />
                    ) : (
                        <div className="relative w-full h-full">
                            <img
                                src={isZoomed && highResImage ? highResImage : resultImage}
                                className={`w-full h-full object-contain rounded-lg shadow-2xl border border-white/10 transition-transform duration-700 ${isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`}
                                onClick={() => isZoomed ? setIsZoomed(false) : handleUpscale()}
                            />

                            {/* Controls Overlay */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={handleUpscale} className="flex flex-col items-center gap-1 text-white hover:text-[#ecab13] transition-colors">
                                    <span className="material-symbols-outlined">zoom_in</span>
                                    <span className="text-[8px] uppercase tracking-wider">Hyper-Zoom</span>
                                </button>
                                <div className="w-px h-8 bg-white/20" />
                                <button onClick={handleCinematic} className="flex flex-col items-center gap-1 text-white hover:text-[#ecab13] transition-colors">
                                    <span className="material-symbols-outlined">movie_creation</span>
                                    <span className="text-[8px] uppercase tracking-wider">Cinematic</span>
                                </button>
                                <div className="w-px h-8 bg-white/20" />
                                <button className="flex flex-col items-center gap-1 text-white hover:text-[#ecab13] transition-colors">
                                    <span className="material-symbols-outlined">share</span>
                                    <span className="text-[8px] uppercase tracking-wider">Share</span>
                                </button>
                            </div>

                            {/* Zoom Indicator */}
                            {isZoomed && (
                                <div className="absolute top-4 right-4 bg-black/80 text-[#ecab13] text-[9px] px-2 py-1 rounded border border-[#ecab13]/30 uppercase tracking-widest font-bold">
                                    4K Texture Active
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
         </div>

         {/* Status Message Overlay */}
         {isProcessing && (
             <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                 <div className="w-16 h-16 border-4 border-[#ecab13]/30 border-t-[#ecab13] rounded-full animate-spin mb-4" />
                 <p className="text-[#ecab13] text-xs uppercase tracking-[0.2em] font-bold animate-pulse">{status}</p>
             </div>
         )}
      </div>

    </div>
  );
}
