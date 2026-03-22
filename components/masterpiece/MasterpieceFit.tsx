'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function MasterpieceFit() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [garmentImage, setGarmentImage] = useState<string | null>(null);

  // Try-On State
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [progressValue, setProgressValue] = useState(0);
  const [tryOnImage, setTryOnImage] = useState<string | null>(null);

  // Cinematic Video State
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  // UX States
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setter(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!userImage || !garmentImage) return;

    setIsProcessing(true);
    setTryOnImage(null);
    setVideoUrl(null);

    try {
      // Step 1: Virtual Try-On
      setProgressText('Draping Garment (IDM-VTON)...');
      setProgressValue(20);

      const tryOnRes = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhotoUrl: userImage,
          garmentImageUrl: garmentImage,
          category: 'upper_body'
        })
      });

      const tryOnData = await tryOnRes.json();
      if (!tryOnRes.ok || !tryOnData.imageUrl) {
        throw new Error(tryOnData.error || 'Failed to generate try-on image');
      }

      setProgressValue(50);
      setTryOnImage(tryOnData.imageUrl);

      // Step 2: Cinematic Video Generation (Upscale + Motion)
      setProgressText('Synthesizing Motion & Upscaling Textures...');
      setProgressValue(70);

      const runwayRes = await fetch('/api/runway-motion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: tryOnData.imageUrl,
          upscale: true
        })
      });

      const runwayData = await runwayRes.json();
      if (!runwayRes.ok || !runwayData.videoUrl) {
        // Fallback if video fails, we still have the try-on image
        console.error('Runway error:', runwayData.error);
        setProgressText('Cinematic processing failed. Showing static result.');
      } else {
        setVideoUrl(runwayData.videoUrl);
        setProgressText('Masterpiece Ready.');
      }

      setProgressValue(100);

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error(err);
      setProgressText(`Error: ${errorMessage}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleShareToStory = async () => {
    if (!tryOnImage) return;
    try {
      // Create a canvas specifically sized for IG Stories (1080x1920)
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw aesthetic background
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Load Image
      const img = new Image();
      img.crossOrigin = 'anonymous'; // Important for preventing canvas tainting
      img.src = tryOnImage;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // Calculate scale to fit width while maintaining aspect ratio (or crop)
      const scale = canvas.width / img.width;
      const drawHeight = img.height * scale;
      const drawY = (canvas.height - drawHeight) / 2; // Center vertically

      // Draw the generated image
      ctx.drawImage(img, 0, drawY, canvas.width, drawHeight);

      // Draw Brand Overlays
      ctx.fillStyle = '#ecab13';
      ctx.font = 'bold 60px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('M_FIT', canvas.width / 2, 120);

      ctx.fillStyle = '#ffffff';
      ctx.font = '40px sans-serif';
      ctx.fillText('Digital Atelier', canvas.width / 2, canvas.height - 80);

      // Convert to blob and share/download
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

      if (navigator.share) {
        // Try native Web Share API (mobile)
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], 'm_fit_story.jpg', { type: 'image/jpeg' });
        await navigator.share({
          title: 'My Masterpiece Fit',
          text: 'Check out my custom digital atelier fit!',
          files: [file]
        });
      } else {
        // Fallback: trigger download
        const link = document.createElement('a');
        link.download = 'm_fit_story.jpg';
        link.href = dataUrl;
        link.click();
      }
    } catch (err) {
      console.error('Share failed:', err);
      alert('Failed to generate story image. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col items-center py-12 px-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#c9b037]/5 to-[#1a1a1a]/50 pointer-events-none" />

      <header className="mb-12 relative z-10 text-center">
        <h1 className="text-5xl font-black tracking-tighter uppercase font-serif text-[#ecab13] drop-shadow-lg">
          Masterpiece <span className="text-white font-sans italic font-light">Fit</span>
        </h1>
        <p className="text-xs text-gray-400 tracking-[0.3em] uppercase mt-4">
          Personal Digital Atelier
        </p>
      </header>

      <div className="w-full max-w-4xl relative z-10 glass-panel border border-white/10 rounded-2xl p-8 bg-black/40 backdrop-blur-xl">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* User Photo Input */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-[#ecab13] uppercase tracking-wider">01. Your Portrait</label>
            <div className="border border-white/20 bg-black/40 rounded-xl p-4 hover:border-[#ecab13] transition-colors group h-40 flex flex-col items-center justify-center relative overflow-hidden">
              <input type="file" onChange={(e) => handleFileUpload(e, setUserImage)} className="hidden" id="mfit-user-upload" accept="image/*" />
              <label htmlFor="mfit-user-upload" className="cursor-pointer flex flex-col items-center gap-2 w-full h-full justify-center absolute inset-0">
                {userImage ? (
                  <img src={userImage} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="User" />
                ) : (
                  <>
                    <span className="text-3xl text-gray-500 group-hover:text-white transition-colors material-symbols-outlined">face</span>
                    <div className="text-sm font-bold group-hover:text-white text-gray-400 transition-colors">Upload Portrait</div>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Garment Input */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-[#ecab13] uppercase tracking-wider">02. Luxury Garment</label>
            <div className="border border-white/20 bg-black/40 rounded-xl p-4 hover:border-[#ecab13] transition-colors group h-40 flex flex-col items-center justify-center relative overflow-hidden">
              <input type="file" onChange={(e) => handleFileUpload(e, setGarmentImage)} className="hidden" id="mfit-garment-upload" accept="image/*" />
              <label htmlFor="mfit-garment-upload" className="cursor-pointer flex flex-col items-center gap-2 w-full h-full justify-center absolute inset-0">
                {garmentImage ? (
                  <img src={garmentImage} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Garment" />
                ) : (
                  <>
                    <span className="text-3xl text-gray-500 group-hover:text-white transition-colors material-symbols-outlined">checkroom</span>
                    <div className="text-sm font-bold group-hover:text-white text-gray-400 transition-colors">Select Garment</div>
                  </>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Progress & Action */}
        <div className="mt-8 relative z-10 flex flex-col items-center">
          {isProcessing || progressValue > 0 ? (
            <div className="w-full mb-6 space-y-2">
              <div className="flex justify-between text-xs text-[#ecab13] font-mono tracking-widest uppercase">
                <span>{progressText}</span>
                <span>{progressValue}%</span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#ecab13] to-[#c9b037]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressValue}%` }}
                />
              </div>
            </div>
          ) : null}

          {!isProcessing && !videoUrl && !tryOnImage && (
            <button
              onClick={handleGenerate}
              className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-[#ecab13] to-[#c9b037] text-black font-bold uppercase tracking-widest text-sm rounded-full shadow-[0_0_20px_rgba(236,171,19,0.3)] hover:shadow-[0_0_30px_rgba(236,171,19,0.5)] transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={!userImage || !garmentImage}
            >
              <span className="material-symbols-outlined font-bold">auto_awesome</span>
              Generate Cinematic Fit
            </button>
          )}
        </div>
      </div>

      {/* Result View */}
      {(tryOnImage || videoUrl) && (
        <div className="w-full max-w-4xl mt-8 relative z-10 flex flex-col items-center">
          <div className="flex justify-between items-center w-full max-w-md mb-6">
             <h2 className="text-xl font-bold tracking-widest uppercase font-serif text-white">
               Your <span className="text-[#ecab13] italic">Masterpiece</span>
             </h2>
             {tryOnImage && (
                <button
                  onClick={handleShareToStory}
                  className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 flex items-center justify-center transition-colors"
                  aria-label="Share to Story"
                  title="Share to Story"
                >
                  <span className="material-symbols-outlined">ios_share</span>
                </button>
             )}
          </div>

          <div
            className="relative w-full max-w-md aspect-[9/16] max-h-[80vh] bg-black rounded-2xl overflow-hidden border border-[#ecab13]/30 shadow-[0_0_50px_rgba(236,171,19,0.1)] cursor-crosshair group"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            {videoUrl ? (
              <video
                src={videoUrl}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : tryOnImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={tryOnImage}
                className="w-full h-full object-cover transition-transform duration-300 ease-out"
                style={{
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transform: isZoomed ? 'scale(2.5)' : 'scale(1)',
                }}
                alt="Try-on Result"
              />
            ) : null}

            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-[#ecab13]/30 px-3 py-1.5 rounded-full text-xs font-bold text-[#ecab13] uppercase tracking-widest flex items-center gap-2 opacity-100 group-hover:opacity-0 transition-opacity">
              <span className="material-symbols-outlined text-[14px]">search</span>
              Hyper-Zoom
            </div>

            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-[#ecab13]/30 px-3 py-1.5 rounded-full text-xs font-bold text-[#ecab13] uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              {videoUrl ? 'Cinematic 4K' : 'Ultra-HD'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
