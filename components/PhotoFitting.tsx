"use client";

import React, { useState, useRef } from "react";
import { Space_Grotesk } from "next/font/google";
import { getLuxuryItems, ClothingItem } from "@/data/mockData";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function PhotoFitting() {
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [userPhotoFile, setUserPhotoFile] = useState<File | null>(null);
  const [selectedGarment, setSelectedGarment] = useState<ClothingItem | null>(null);
  const [processing, setProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null); // High-res upscaled
  const [resultVideo, setResultVideo] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const luxuryItems = getLuxuryItems();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUserPhotoFile(file);
      setUserPhoto(URL.createObjectURL(file));
    }
  };

  const handleTryOn = async () => {
    if (!userPhotoFile || !selectedGarment) return;

    setProcessing(true);
    try {
      const formData = new FormData();
      formData.append("user_photo", userPhotoFile);

      // Handle garment image URL
      let garmentUrlToSend = selectedGarment.imageUrl;
      // If relative path, convert to Data URI for the backend/Replicate
      if (garmentUrlToSend.startsWith("/")) {
         const response = await fetch(garmentUrlToSend);
         const blob = await response.blob();
         garmentUrlToSend = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
         });
      }
      formData.append("garment_image_url", garmentUrlToSend);

      const response = await fetch("http://localhost:8000/api/orchestrate/try-on", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
         throw new Error("Backend error");
      }

      const data = await response.json();
      if (data.success) {
        setResultImage(data.upscaled_url); // Masterpiece quality
      } else {
        alert("Try-on failed: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend AI service. Ensure start_backend.sh is running.");
    } finally {
      setProcessing(false);
    }
  };

  const handleCinematic = async () => {
    if (!resultImage) return;
    setProcessing(true);
    try {
        const response = await fetch("http://localhost:8000/api/orchestrate/cinematic", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ image_url: resultImage })
        });

        const data = await response.json();
        if (data.success) {
            setResultVideo(data.video_url);
        } else {
            alert("Video generation failed");
        }
    } catch (e) {
        console.error(e);
        alert("Error generating video");
    } finally {
        setProcessing(false);
    }
  };

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white ${spaceGrotesk.className}`}>

      {/* Top App Bar */}
      <div className="z-50 flex items-center justify-between bg-transparent p-4 backdrop-blur-sm">
        <div className="flex items-center gap-4">
           <h2 className="text-xl font-bold tracking-tight text-white">M_FIT <span className="text-[#D4AF37] font-serif italic">Masterpiece</span></h2>
        </div>
        <div className="flex gap-2">
             <button
                onClick={() => fileInputRef.current?.click()}
                className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md hover:bg-white/20 transition-all"
             >
                {userPhoto ? "Change Photo" : "Upload Photo"}
             </button>
             <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*"
             />
        </div>
      </div>

      <div className="relative flex flex-1 overflow-hidden">

        {/* Main Canvas (User Photo / Result) */}
        <div className="relative flex-1 bg-[#151515] flex items-center justify-center overflow-hidden">
            {/* Background / Placeholder */}
            {!userPhoto && !resultImage && (
                <div className="text-center opacity-40">
                    <span className="material-symbols-outlined text-6xl mb-2">add_a_photo</span>
                    <p>Upload a full-body photo to begin</p>
                </div>
            )}

            {/* Display Image/Video */}
            {(userPhoto || resultImage) && (
                <div
                    className={`relative h-full w-full overflow-hidden ${!resultVideo && resultImage ? 'cursor-zoom-in' : ''}`}
                    onMouseMove={(e) => {
                        if (resultVideo || !resultImage) return;
                        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                        const x = ((e.clientX - left) / width) * 100;
                        const y = ((e.clientY - top) / height) * 100;
                        setZoomPos({ x, y });
                    }}
                    onMouseEnter={() => !resultVideo && resultImage && setIsZoomed(true)}
                    onMouseLeave={() => setIsZoomed(false)}
                >
                    {resultVideo ? (
                        <video
                            src={resultVideo}
                            autoPlay
                            loop
                            muted
                            className="h-full w-full object-contain"
                        />
                    ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={resultImage || userPhoto || ""}
                            alt="Fitting"
                            style={{
                                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                                transform: isZoomed ? "scale(2.5)" : "scale(1)"
                            }}
                            className="h-full w-full object-contain transition-transform duration-200 ease-out"
                        />
                    )}

                    {/* Processing Overlay */}
                    {processing && (
                        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md">
                            <div className="h-1 w-48 overflow-hidden rounded-full bg-white/20">
                                <div className="h-full w-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
                            </div>
                            <p className="mt-4 text-sm font-light tracking-widest text-[#D4AF37]">WEAVING DIGITAL THREADS...</p>
                        </div>
                    )}
                </div>
            )}
        </div>

        {/* Right Panel: Garment Selector */}
        <div className="w-80 bg-[#101010] border-l border-white/5 flex flex-col z-20">
            <div className="p-4 border-b border-white/5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37]">Luxury Collection</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {luxuryItems.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setSelectedGarment(item)}
                        className={`group cursor-pointer rounded-xl border border-white/5 bg-white/5 p-3 transition-all hover:border-[#D4AF37]/50 ${selectedGarment?.id === item.id ? 'border-[#D4AF37] bg-[#D4AF37]/10' : ''}`}
                    >
                        <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-[#1a1a1a] mb-3 relative">
                             {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <h4 className="text-sm font-medium text-white line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-gray-400">{item.brand}</p>
                    </div>
                ))}
            </div>

            {/* Action Bar */}
            <div className="p-4 border-t border-white/5 space-y-3">
                <button
                    onClick={handleTryOn}
                    disabled={!userPhoto || !selectedGarment || processing}
                    className="w-full rounded-lg bg-[#D4AF37] py-3 text-sm font-bold text-black shadow-lg shadow-[#D4AF37]/20 transition-all hover:bg-[#F4CF57] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {processing ? "FITTING..." : "TRY ON MASTERPIECE"}
                </button>

                {resultImage && !resultVideo && (
                    <button
                        onClick={handleCinematic}
                        disabled={processing}
                        className="w-full rounded-lg border border-[#D4AF37] py-3 text-sm font-bold text-[#D4AF37] transition-all hover:bg-[#D4AF37]/10"
                    >
                        GENERATE CINEMATIC VIDEO
                    </button>
                )}

                {resultVideo && (
                    <a
                        href={resultVideo}
                        download="masterpiece_fit.mp4"
                        className="flex items-center justify-center w-full rounded-lg bg-[#D4AF37] py-3 text-sm font-bold text-black shadow-lg shadow-[#D4AF37]/20 transition-all hover:bg-[#F4CF57]"
                    >
                        DOWNLOAD 4K VIDEO
                    </a>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
