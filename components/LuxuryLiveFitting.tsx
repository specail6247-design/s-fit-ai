'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const HyperZoomWrapper = dynamic(() => import('./HyperZoomViewer'), { ssr: false });

export default function LuxuryLiveFitting() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [garmentImage] = useState<string>("https://lh3.googleusercontent.com/aida-public/AB6AXuC5m1trvvOgtFQZrHz7J1_8YKjIyJFwuTm6b_C9mQJtDJDsOl_xtHZHfLA3MDVgFSQv4zos6OnEPUwen36ZcXZRERoj4Bj3o87kdcXjQWJ8YNc33SLIAqJUET6o0yOwx_pVzx0OswcPQw2ivo6sLma8xEumxoFQDfDsbpY-obuXwXx9h6QOzOhEDJvrFuPoRkbJEz-kJUE5bbVxawyJiFfEmGOi47n8Jrh8-zVHq14XQL_snfcQ2Ia117Mk5S2bn_rRht21zxTm58E");
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultVideo, setResultVideo] = useState<string | null>(null);

  // Custom Cursor state (Magnetizing Cursor)
  const [cursorPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      // Direct DOM manipulation for performance as per memory rules
      const cursor = document.getElementById('luxury-cursor');
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }

      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button') || target.closest('a') || target.closest('.group') || target.tagName.toLowerCase() === 'input';
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setUserImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = async () => {
    if (!userImage) return alert("Please upload a User Photo.");
    setIsProcessing(true);

    try {
      // Call our FastAPI Orchestrator via Next.js proxy route to avoid CORS issues
      const tryOnRes = await fetch('/api/orchestrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_photo: userImage,
          garment_image: garmentImage,
          category: 'tops'
        })
      });
      const tryOnData = await tryOnRes.json();

      if (!tryOnData.success || !tryOnData.final_video_url) throw new Error("Orchestration Failed");

      setResultVideo(tryOnData.final_video_url);
    } catch (err) {
      console.error(err);
      // Fallback for demo if API fails
      setResultVideo("https://www.w3schools.com/html/mov_bbb.mp4");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleShare = async () => {
    if (!resultVideo) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My Masterpiece Fit',
          text: 'Check out my cinematic fitting!',
          url: resultVideo
        });
      } else {
        navigator.clipboard.writeText(resultVideo);
        alert("Link copied to clipboard!");
      }
    } catch (e) {
      console.log("Sharing failed", e);
    }
  };

  return (
    <div className={`min-h-screen bg-[#050505] text-white font-serif relative overflow-hidden ${isProcessing ? 'opacity-0 transition-opacity duration-1000' : 'opacity-100 transition-opacity duration-700'}`}>
      {/* Custom Gold Ring Cursor */}
      <div
        id="luxury-cursor"
        className={`fixed w-8 h-8 border border-[#C9B037] rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out ${isHovering ? 'scale-150 bg-[#C9B037]/20' : 'scale-100'}`}
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      <header className="p-8 flex justify-between items-center absolute top-0 w-full z-10">
        <Link href="/luxury" className="text-[#C9B037] hover:text-white transition-colors duration-700" aria-label="Back" aria-hidden="true">
           <span className="material-symbols-outlined focus-visible:ring-2 outline-none">arrow_back</span>
        </Link>
        <h1 className="text-2xl tracking-[0.3em] font-['Cinzel'] uppercase">M_FIT</h1>
        <div className="w-8" />
      </header>

      <main className="h-screen flex flex-col lg:flex-row items-center justify-center p-8 gap-12 font-sans font-['Space_Grotesk',_'Inter',_sans-serif]">

        {/* Left: Input/Controls */}
        <div className="w-full lg:w-1/3 space-y-12">
          <div className="text-center lg:text-left space-y-4">
            <h2 className="text-4xl font-light text-[#C9B037] font-['Cinzel']">Digital Atelier</h2>
            <p className="text-sm text-gray-400 tracking-widest font-light">Experience High-Fidelity Physics</p>
          </div>

          <div className="space-y-6">
            <div className="relative group cursor-pointer border border-[#C9B037]/30 hover:border-[#C9B037] bg-black/50 p-6 flex flex-col items-center justify-center min-h-[200px] transition-all duration-700">
               <input type="file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" aria-label="Upload your photo" />
               {userImage ? (
                 <img src={userImage} alt="User" className="absolute inset-0 w-full h-full object-cover opacity-60 saturate-[0.9] contrast-[1.1]" />
               ) : (
                 <div className="text-center space-y-2">
                   <span className="material-symbols-outlined text-4xl text-[#C9B037] font-light">photo_camera</span>
                   <p className="text-xs tracking-[0.2em] uppercase text-gray-300">Provide Your Canvas</p>
                 </div>
               )}
            </div>

            <button
              onClick={handleTryOn}
              disabled={isProcessing || !userImage}
              className="w-full py-5 border border-[#C9B037] text-[#C9B037] hover:bg-[#C9B037] hover:text-black transition-all duration-700 tracking-[0.3em] uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Weaving...' : 'Commence Fitting'}
            </button>
          </div>
        </div>

        {/* Right: Output */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <div className="w-full h-[50vh] border border-[#C9B037]/20 relative overflow-hidden bg-[#0A0A0A] flex items-center justify-center">
             {isProcessing ? (
               <div className="flex flex-col items-center justify-center space-y-4">
                 <div className="w-12 h-12 border-t border-[#C9B037] rounded-full animate-spin" />
                 <p className="text-[#C9B037] text-xs tracking-[0.4em] uppercase font-light">Analyzing Drapery</p>
               </div>
             ) : resultVideo ? (
               <div className="w-full h-full relative">
                 <video src={resultVideo} autoPlay loop muted playsInline className="w-full h-full object-cover saturate-[0.9] contrast-[1.1]" />
                 <button
                   onClick={handleShare}
                   className="absolute bottom-8 right-8 bg-[#C9B037] text-black px-6 py-3 flex items-center gap-2 hover:bg-white transition-colors duration-500 rounded-none group"
                   aria-label="Cinematic Share"
                 >
                   <span className="text-xs tracking-widest font-bold uppercase">Share</span>
                   <span className="material-symbols-outlined text-sm group-hover:rotate-12 transition-transform focus-visible:ring-2 outline-none" aria-hidden="true">send</span>
                 </button>
               </div>
             ) : (
               <div className="text-center space-y-4 opacity-50">
                 <img src={garmentImage} className="w-32 h-32 object-contain mx-auto mix-blend-screen opacity-50" alt="Garment" />
                 <p className="text-[#C9B037] text-xs tracking-[0.3em] uppercase font-['Cinzel']">Awaiting Subject</p>
               </div>
             )}
          </div>

          <div className="w-full h-[25vh]">
            {/* Dynamic import of HyperZoomViewer to avoid SSR canvas issues if needed, but it's a client component */}
            <React.Suspense fallback={<div className="w-full h-full border border-white/10 flex items-center justify-center text-xs text-[#C9B037]">Loading Engine...</div>}>
              <HyperZoomWrapper imageUrl={garmentImage} materialType="silk" />
            </React.Suspense>
          </div>
        </div>

      </main>
    </div>
  );
}
