'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cinzel, Space_Grotesk } from 'next/font/google';
import { generateStoryImage } from '@/lib/shareUtils';
import Link from 'next/link';

const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

type ProcessingState = 'idle' | 'uploading' | 'fitting' | 'upscaling' | 'generating_video';

export default function LuxuryLiveFitting() {
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [garmentPhoto, setGarmentPhoto] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [upscaledImage, setUpscaledImage] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<ProcessingState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isHoveringResult, setIsHoveringResult] = useState(false);
  const resultContainerRef = useRef<HTMLDivElement>(null);

  // File Upload Handlers
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setter(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  // 1. Initial Try-On (IDM-VTON)
  const handleTryOn = async () => {
    if (!userPhoto || !garmentPhoto) {
      setError("Please provide both a user photo and a garment photo.");
      return;
    }

    setStatus('fitting');
    setError(null);

    try {
      const res = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhotoUrl: userPhoto,
          garmentImageUrl: garmentPhoto,
          category: 'upper_body' // Defaulting to upper body for now
        })
      });

      const data = await res.json();

      if (data.success && data.imageUrl) {
        setResultImage(data.imageUrl);
        setStatus('idle');
      } else {
        throw new Error(data.error || "Virtual try-on failed.");
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
      setStatus('idle');
    }
  };

  // 2. Hyper-Zoom (Upscaling)
  const handleUpscale = async () => {
    if (!resultImage) return;
    setStatus('upscaling');

    try {
      const res = await fetch('/api/cinematic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'upscale',
          imageUrl: resultImage
        })
      });

      const data = await res.json();
      if (data.success && data.resultUrl) {
        setUpscaledImage(data.resultUrl);
        // Automatically enter zoom mode or show notification?
        // For now, update resultImage to the high res one effectively, or keep separate
        setResultImage(data.resultUrl);
        setStatus('idle');
      } else {
        throw new Error(data.error || "Upscaling failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to enhance image resolution.");
      setStatus('idle');
    }
  };

  // 3. Cinematic Motion (Video)
  const handleGenerateVideo = async () => {
    if (!resultImage) return;
    setStatus('generating_video');

    try {
      const res = await fetch('/api/cinematic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'video',
          imageUrl: upscaledImage || resultImage // Prefer high res
        })
      });

      const data = await res.json();
      if (data.success && data.resultUrl) {
        setVideoUrl(data.resultUrl);
        setStatus('idle');
      } else {
        throw new Error(data.error || "Video generation failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to generate cinematic video.");
      setStatus('idle');
    }
  };

  // 4. Share to Story
  const handleShare = async () => {
    if (!resultImage) return;
    try {
      const storyImage = await generateStoryImage(upscaledImage || resultImage);
      // Create a temporary link to download
      const link = document.createElement('a');
      link.href = storyImage;
      link.download = 's_fit_masterpiece.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
      setError("Failed to generate share image.");
    }
  };

  // Zoom Interaction
  const handleZoom = () => {
    if (!resultContainerRef.current) return;

    if (zoomLevel > 1) {
        setZoomLevel(1);
        return;
    }

    // Zoom in
    setZoomLevel(2.5);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (zoomLevel === 1 || !resultContainerRef.current) return;
    const { left, top, width, height } = resultContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    resultContainerRef.current.style.transformOrigin = `${x}% ${y}%`;
  };

  return (
    <div className={`min-h-screen bg-[#050505] text-[#E5E5E5] ${spaceGrotesk.variable} ${cinzel.variable} font-sans overflow-x-hidden selection:bg-[#D4AF37] selection:text-black`}>

        {/* HEADER */}
        <header className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-[#D4AF37]/10">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="text-2xl font-serif text-white tracking-widest group-hover:text-[#D4AF37] transition-colors">S_FIT</span>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] mt-1">Masterpiece</span>
                </Link>
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500">
                        <span className={`w-2 h-2 rounded-full ${status === 'idle' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></span>
                        System {status === 'idle' ? 'Ready' : 'Processing'}
                    </div>
                </div>
            </div>
        </header>

        <main className="pt-24 min-h-screen flex flex-col lg:flex-row">

            {/* LEFT: CONTROLS & INPUTS */}
            <div className="lg:w-1/3 p-6 lg:p-12 flex flex-col gap-10 border-r border-[#D4AF37]/10 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-20"></div>

                <div className="space-y-2">
                    <h1 className="font-serif text-4xl lg:text-5xl text-white leading-tight">
                        Virtual <br/> <span className="text-[#D4AF37]">Atelier</span>
                    </h1>
                    <p className="text-gray-400 text-sm tracking-wide leading-relaxed">
                        Experience hyper-realistic fitting with our proprietary Masterpiece engine.
                        Micro-fiber detail rendering enabled.
                    </p>
                </div>

                {/* Uploaders */}
                <div className="space-y-6">
                    {/* User Photo */}
                    <div className="group relative">
                        <label className="block text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-3">01. The Muse (You)</label>
                        <div className={`relative h-48 rounded-lg border border-dashed border-gray-700 bg-gray-900/50 hover:bg-gray-800/50 hover:border-[#D4AF37] transition-all overflow-hidden flex items-center justify-center cursor-pointer ${userPhoto ? 'border-solid border-[#D4AF37]/50' : ''}`}>
                            <input type="file" onChange={(e) => handleFileUpload(e, setUserPhoto)} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                            {userPhoto ? (
                                <img src={userPhoto} alt="User Photo" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                            ) : (
                                <div className="text-center p-4">
                                    <span className="material-symbols-outlined text-3xl text-gray-600 mb-2">person_add</span>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Upload Portrait</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Garment Photo */}
                    <div className="group relative">
                        <label className="block text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-3">02. The Masterpiece (Garment)</label>
                        <div className={`relative h-48 rounded-lg border border-dashed border-gray-700 bg-gray-900/50 hover:bg-gray-800/50 hover:border-[#D4AF37] transition-all overflow-hidden flex items-center justify-center cursor-pointer ${garmentPhoto ? 'border-solid border-[#D4AF37]/50' : ''}`}>
                            <input type="file" onChange={(e) => handleFileUpload(e, setGarmentPhoto)} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                            {garmentPhoto ? (
                                <img src={garmentPhoto} alt="Garment Photo" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                            ) : (
                                <div className="text-center p-4">
                                    <span className="material-symbols-outlined text-3xl text-gray-600 mb-2">checkroom</span>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Upload Garment</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="mt-auto pt-8">
                    {error && (
                        <div className="mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded text-red-400 text-xs flex items-center gap-2">
                             <span className="material-symbols-outlined text-sm">error</span>
                             {error}
                        </div>
                    )}

                    <button
                        onClick={handleTryOn}
                        disabled={status !== 'idle' || !userPhoto || !garmentPhoto}
                        className={`w-full h-14 relative overflow-hidden group rounded-sm ${status !== 'idle' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <div className="absolute inset-0 bg-[#D4AF37] group-hover:bg-[#F4CF57] transition-colors"></div>
                        <div className="absolute inset-0 flex items-center justify-center gap-3 text-black font-bold tracking-widest uppercase text-sm z-10">
                            {status === 'fitting' ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                                    Weaving Reality...
                                </>
                            ) : (
                                <>
                                    <span>Create Fitting</span>
                                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                </>
                            )}
                        </div>
                    </button>
                    <p className="text-center text-[10px] text-gray-600 mt-3 uppercase tracking-widest">
                        Powered by S_FIT Neural Engine v2.4
                    </p>
                </div>
            </div>

            {/* RIGHT: RESULT & CINEMATIC VIEW */}
            <div className="lg:w-2/3 bg-[#0a0a0a] relative overflow-hidden flex flex-col">
                {/* Background Ambience */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900/40 via-[#050505] to-[#050505] pointer-events-none"></div>

                {/* Main Viewport */}
                <div className="flex-1 relative flex items-center justify-center p-8 lg:p-16">
                    <AnimatePresence mode="wait">
                        {!resultImage ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center opacity-30"
                            >
                                <span className="material-symbols-outlined text-6xl lg:text-8xl font-thin mb-4">accessibility_new</span>
                                <p className="font-serif text-2xl tracking-widest">ATELIER EMPTY</p>
                                <p className="text-xs uppercase tracking-[0.3em] mt-2">Awaiting Input</p>
                            </motion.div>
                        ) : (
                             // RESULT DISPLAY
                             <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative w-full max-w-2xl aspect-[3/4] group"
                             >
                                {/* Video Layer (if exists) */}
                                {videoUrl ? (
                                    <video
                                        src={videoUrl}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover rounded-sm shadow-2xl border border-white/10"
                                    />
                                ) : (
                                    // Image Layer with Zoom
                                    <div
                                        className="relative w-full h-full overflow-hidden rounded-sm shadow-2xl border border-white/10 cursor-zoom-in"
                                        onMouseEnter={() => setIsHoveringResult(true)}
                                        onMouseLeave={() => setIsHoveringResult(false)}
                                        onClick={handleZoom}
                                        onMouseMove={handleMouseMove}
                                    >
                                        <div
                                            ref={resultContainerRef}
                                            className="w-full h-full transition-transform duration-200 ease-out will-change-transform"
                                            style={{
                                                backgroundImage: `url(${upscaledImage || resultImage})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                transform: `scale(${zoomLevel})`
                                            }}
                                        />

                                        {/* Zoom Hint */}
                                        <div className={`absolute bottom-4 right-4 bg-black/50 backdrop-blur px-3 py-1 rounded text-[10px] uppercase tracking-wider transition-opacity ${isHoveringResult && zoomLevel === 1 ? 'opacity-100' : 'opacity-0'}`}>
                                            Click to Inspect Fiber
                                        </div>
                                    </div>
                                )}

                                {/* Status Overlays */}
                                {(status === 'upscaling' || status === 'generating_video') && (
                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                                        <div className="w-16 h-16 border border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin mb-4"></div>
                                        <p className="font-serif text-xl text-[#D4AF37] tracking-widest">
                                            {status === 'upscaling' ? 'Refining Textures' : 'Synthesizing Motion'}
                                        </p>
                                        <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mt-2">
                                            Applying {status === 'upscaling' ? 'Micro-Detail' : 'Physics'} Shader
                                        </p>
                                    </div>
                                )}
                             </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Tool Bar */}
                {resultImage && (
                    <div className="h-24 bg-[#0a0a0a] border-t border-white/10 flex items-center justify-center gap-4 px-6 relative z-30">

                        <button
                            onClick={handleUpscale}
                            disabled={status !== 'idle' || !!upscaledImage}
                            className={`flex flex-col items-center justify-center gap-1 min-w-[100px] group ${upscaledImage ? 'text-[#D4AF37]' : 'text-gray-400 hover:text-white'}`}
                        >
                            <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">
                                {upscaledImage ? 'hd' : 'auto_fix_high'}
                            </span>
                            <span className="text-[9px] uppercase tracking-widest font-bold">
                                {upscaledImage ? 'Enhanced' : 'Hyper-Zoom'}
                            </span>
                        </button>

                        <div className="w-px h-8 bg-white/10"></div>

                        <button
                            onClick={handleGenerateVideo}
                            disabled={status !== 'idle' || !!videoUrl}
                            className={`flex flex-col items-center justify-center gap-1 min-w-[100px] group ${videoUrl ? 'text-[#D4AF37]' : 'text-gray-400 hover:text-white'}`}
                        >
                            <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">
                                {videoUrl ? 'videocam' : 'movie_filter'}
                            </span>
                            <span className="text-[9px] uppercase tracking-widest font-bold">
                                {videoUrl ? 'Playing' : 'Motion'}
                            </span>
                        </button>

                        <div className="w-px h-8 bg-white/10"></div>

                        <button
                            onClick={handleShare}
                            className="flex flex-col items-center justify-center gap-1 min-w-[100px] text-gray-400 hover:text-[#D4AF37] group"
                        >
                            <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">ios_share</span>
                            <span className="text-[9px] uppercase tracking-widest font-bold">Story</span>
                        </button>

                    </div>
                )}
            </div>
        </main>
    </div>
  );
}
