'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FabricType } from '@/components/masterpiece/types';
import { BrandAccessorySelector } from '@/components/m-fit/BrandAccessorySelector';
import { CinematicView } from '@/components/m-fit/CinematicView';
import { ClothingItem } from '@/data/mockData';

export default function MasterpieceFitPage() {
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [selectedGarment, setSelectedGarment] = useState<ClothingItem | null>(null);
  const [selectedAccessory, setSelectedAccessory] = useState<ClothingItem | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<FabricType>('silk');

  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState<string>('');

  const [cinematicVideoUrl, setCinematicVideoUrl] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setUserPhoto(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCinematicTryOn = async () => {
    if (!userPhoto || !selectedGarment) return alert("Please upload a photo and select a garment.");

    setIsProcessing(true);
    setLoadingStatus('Initializing IDM-VTON Engine');

    try {
      // 1. Generate Virtual Try-On
      setLoadingStatus('Synthesizing Fit');
      const tryOnRes = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhoto,
          garmentImage: selectedGarment.imageUrl,
          category: selectedGarment.category,
          garmentDescription: selectedGarment.description
        })
      });

      const tryOnData = await tryOnRes.json();
      if (!tryOnData.success || !tryOnData.imageUrl) {
        throw new Error(tryOnData.error || 'Failed to generate try-on image');
      }

      // 2. Generate Cinematic Video (SVD/Runway)
      setLoadingStatus('Rendering 4K Motion Physics');
      const videoRes = await fetch('/api/cinematic-try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: tryOnData.imageUrl })
      });

      const videoData = await videoRes.json();
      if (!videoData.success || !videoData.videoUrl) {
        throw new Error(videoData.error || 'Failed to generate cinematic video');
      }

      setCinematicVideoUrl(videoData.videoUrl);

    } catch (error) {
      console.error('Error during Masterpiece generation:', error);
      alert('Generation failed. Please try again.');
    } finally {
      setIsProcessing(false);
      setLoadingStatus('');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#F4E4BC] font-sans selection:bg-[#C9B037] selection:text-black">
      {/* Premium Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#C9B037]/20">
        <div className="flex items-center p-4 justify-between max-w-7xl mx-auto">
          <Link href="/" className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#C9B037]/30 text-[#C9B037] hover:bg-[#C9B037]/10 transition-colors duration-700">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h2 className="text-[#C9B037] text-sm font-bold tracking-[0.3em] uppercase flex-1 text-center font-serif">M_FIT Atelier</h2>
          <div className="flex w-10 items-center justify-end"></div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto pt-24 pb-32 px-4 md:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extralight tracking-widest uppercase mb-4 text-[#F4E4BC] font-serif">Masterpiece Fit</h1>
          <p className="text-[#C9B037] tracking-[0.2em] text-sm uppercase">Your Personal Digital Atelier</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Upload & Configuration */}
          <div className="space-y-12">

            {/* Step 1: Upload Photo */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#C9B037]/20 pb-2">
                <h3 className="text-[#C9B037] text-xs font-bold tracking-[0.2em] uppercase">01. Your Canvas</h3>
              </div>
              <div className="relative aspect-[3/4] md:aspect-video w-full rounded-sm border border-[#C9B037]/30 bg-[#111] overflow-hidden group">
                {userPhoto ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={userPhoto} alt="User" className="w-full h-full object-cover" />
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <span className="material-symbols-outlined text-4xl text-[#C9B037]/50">face</span>
                    <p className="text-[#F4E4BC]/50 tracking-wider text-sm">Upload your full-body portrait</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                  <label className="cursor-pointer border border-[#C9B037] text-[#C9B037] px-8 py-3 tracking-widest text-xs uppercase hover:bg-[#C9B037] hover:text-black transition-colors duration-700">
                    {userPhoto ? 'Change Photo' : 'Select Photo'}
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                  </label>
                </div>
              </div>
            </section>

            <BrandAccessorySelector
              selectedGarment={selectedGarment}
              setSelectedGarment={setSelectedGarment}
              selectedAccessory={selectedAccessory}
              setSelectedAccessory={setSelectedAccessory}
            />

            {/* Step 4: Material Engine */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#C9B037]/20 pb-2">
                <h3 className="text-[#C9B037] text-xs font-bold tracking-[0.2em] uppercase">02. Material Physics</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {(['silk', 'denim', 'wool'] as FabricType[]).map((mat) => (
                  <button
                    key={mat}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`p-4 border transition-all duration-700 flex flex-col items-center gap-2 ${
                      selectedMaterial === mat
                        ? 'border-[#C9B037] bg-[#C9B037]/10'
                        : 'border-[#333] hover:border-[#C9B037]/50'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[#C9B037]">
                      {mat === 'silk' ? 'waves' : mat === 'denim' ? 'texture' : 'cloud'}
                    </span>
                    <span className="tracking-widest text-xs uppercase text-[#F4E4BC]">{mat}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Cinematic Output */}
          <div className="space-y-8 flex flex-col">
            <div className="flex-1 relative border border-[#C9B037]/20 bg-[#050505] min-h-[600px] flex items-center justify-center overflow-hidden">
               {cinematicVideoUrl ? (
                 <CinematicView videoUrl={cinematicVideoUrl} materialType={selectedMaterial} />
               ) : (
                 <>
                   {!isProcessing && (
                     <div className="text-center space-y-4">
                        <span className="material-symbols-outlined text-6xl text-[#C9B037]/20">movie</span>
                        <p className="text-[#F4E4BC]/40 tracking-[0.2em] text-sm uppercase">Awaiting Masterpiece</p>
                     </div>
                   )}
                   {isProcessing && (
                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-10">
                       <div className="w-16 h-16 border-t-2 border-r-2 border-[#C9B037] rounded-full animate-spin mb-6"></div>
                       <p className="text-[#C9B037] tracking-[0.3em] text-sm uppercase mb-2">Synthesizing</p>
                       <p className="text-[#F4E4BC]/70 tracking-wider text-xs">{loadingStatus}</p>
                     </div>
                   )}
                 </>
               )}
            </div>

            <button
              onClick={handleCinematicTryOn}
              disabled={isProcessing || !userPhoto}
              className={`w-full py-6 border border-[#C9B037] tracking-[0.3em] text-sm uppercase transition-all duration-1000 ${
                isProcessing || !userPhoto
                  ? 'opacity-50 cursor-not-allowed bg-transparent text-[#C9B037]/50'
                  : 'bg-[#C9B037]/10 text-[#C9B037] hover:bg-[#C9B037] hover:text-black hover:shadow-[0_0_30px_rgba(201,176,55,0.3)]'
              }`}
            >
              Generate 4K Experience
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
