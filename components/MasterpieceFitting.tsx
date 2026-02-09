'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getLuxuryItems,
  getKFashionItems,
  ClothingItem
} from '@/data/mockData';
import HyperZoom from '@/components/ui/HyperZoom';
import CinematicViewer from '@/components/ui/CinematicViewer';

type FittingStep = 'select' | 'upload' | 'processing' | 'result';
type BrandCategory = 'luxury' | 'k-fashion';

export default function MasterpieceFitting() {
  const [step, setStep] = useState<FittingStep>('select');
  const [category, setCategory] = useState<BrandCategory>('luxury');
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);

  // Fetch items based on category
  const items = category === 'luxury' ? getLuxuryItems() : getKFashionItems();

  // Filter for accessories toggle? Maybe just show all for now.

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setUserPhoto(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedItem || !userPhoto) return;

    setStep('processing');
    setIsProcessing(true);
    setProcessingStatus('Initializing Masterpiece Engine...');

    try {
      // Simulate steps for cinematic effect
      await new Promise(r => setTimeout(r, 1000));
      setProcessingStatus('Analyzing Body Geometry...');
      await new Promise(r => setTimeout(r, 1000));
      setProcessingStatus(`Draping ${selectedItem.brand} Fabric...`);

      const res = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhotoUrl: userPhoto,
          garmentImageUrl: selectedItem.imageUrl, // Using the garment image from mock data
          category: selectedItem.category === 'accessories' ? 'upper_body' : selectedItem.category, // Fallback for accessories
        })
      });

      const data = await res.json();

      if (data.success && data.imageUrl) {
        setResultImage(data.imageUrl);
        setStep('result');
      } else {
        throw new Error(data.error || 'Fitting failed');
      }
    } catch (error) {
      console.error(error);
      alert('Simulation Failed. Using demo fallback.');
      // Demo fallback
      setResultImage('https://pub-83c5db439b40468498f97946200806f7.r2.dev/mock-result-sfit.png');
      setStep('result');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerateMotion = async () => {
    if (!resultImage) return;

    setIsGeneratingVideo(true);
    try {
      const res = await fetch('/api/runway-motion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: resultImage })
      });

      const data = await res.json();
      if (data.success && data.videoUrl) {
        setVideoUrl(data.videoUrl);
      } else {
         throw new Error('Video generation failed');
      }
    } catch (error) {
      console.error(error);
      alert('Motion Generation unavailable in demo environment.');
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#ecab13] selection:text-black">
      {/* Cinematic Header */}
      <header className="fixed top-0 w-full z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center">
             <span className="material-symbols-outlined text-sm">diamond</span>
           </div>
           <div>
             <h1 className="text-xl font-serif tracking-widest uppercase">Masterpiece Fit</h1>
             <p className="text-[10px] text-[#ecab13] tracking-[0.2em] uppercase">Cinematic Digital Atelier</p>
           </div>
        </div>

        {step !== 'select' && (
          <button
            onClick={() => {
              setStep('select');
              setSelectedItem(null);
              setResultImage(null);
              setVideoUrl(null);
            }}
            className="text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
          >
            Start Over
          </button>
        )}
      </header>

      <main className="pt-24 min-h-screen flex flex-col">
        <AnimatePresence mode="wait">

          {/* STEP 1: SELECT */}
          {step === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 pb-20"
            >
              {/* Category Toggle */}
              <div className="flex justify-center mb-12 gap-8">
                <button
                  onClick={() => setCategory('luxury')}
                  className={`text-2xl font-serif transition-colors ${category === 'luxury' ? 'text-white border-b border-[#ecab13] pb-2' : 'text-white/40'}`}
                >
                  High-End Luxury
                </button>
                <button
                  onClick={() => setCategory('k-fashion')}
                  className={`text-2xl font-serif transition-colors ${category === 'k-fashion' ? 'text-white border-b border-[#ecab13] pb-2' : 'text-white/40'}`}
                >
                  K-Fashion Leaders
                </button>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layoutId={item.id}
                    onClick={() => {
                      setSelectedItem(item);
                      setStep('upload');
                    }}
                    className="group relative aspect-[3/4] bg-[#111] cursor-pointer overflow-hidden rounded-sm border border-white/10 hover:border-[#ecab13] transition-colors"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-[#ecab13] text-xs font-bold tracking-widest uppercase mb-1">{item.brand}</p>
                      <h3 className="text-xl font-serif leading-tight">{item.name}</h3>
                      <div className="flex justify-between items-end mt-4 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                        <p className="text-sm font-mono">{item.currency} {item.price}</p>
                        <span className="material-symbols-outlined text-[#ecab13]">arrow_forward</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: UPLOAD */}
          {step === 'upload' && selectedItem && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full px-6"
            >
              <div className="grid md:grid-cols-2 gap-12 w-full items-center">

                {/* Selected Item Preview */}
                <div className="relative aspect-[3/4] bg-[#111] rounded-sm border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={selectedItem.imageUrl} alt={selectedItem.name} className="w-full h-full object-cover opacity-80" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-[#ecab13] text-xs font-bold tracking-widest uppercase mb-1">{selectedItem.brand}</p>
                    <h3 className="text-2xl font-serif">{selectedItem.name}</h3>
                  </div>
                </div>

                {/* Upload Section */}
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-serif">Identify Yourself</h2>
                    <p className="text-white/60">Upload a full-body photo for the most accurate fit.</p>
                  </div>

                  <label className="block w-full aspect-square md:aspect-[4/3] rounded-sm border-2 border-dashed border-white/20 hover:border-[#ecab13] bg-white/5 hover:bg-white/10 transition-all cursor-pointer flex flex-col items-center justify-center group">
                    <input type="file" onChange={handleFileUpload} className="hidden" accept="image/*" />
                    {userPhoto ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={userPhoto} alt="User" className="w-full h-full object-cover p-2" />
                    ) : (
                      <div className="flex flex-col items-center gap-4 text-white/40 group-hover:text-[#ecab13] transition-colors">
                        <span className="material-symbols-outlined text-4xl">add_a_photo</span>
                        <span className="text-sm uppercase tracking-widest font-bold">Upload Photo</span>
                      </div>
                    )}
                  </label>

                  <button
                    onClick={handleGenerate}
                    disabled={!userPhoto}
                    className={`w-full py-5 text-black font-bold uppercase tracking-widest transition-all ${
                      userPhoto
                      ? 'bg-[#ecab13] hover:bg-[#ffc02e] hover:scale-[1.02]'
                      : 'bg-white/20 cursor-not-allowed'
                    }`}
                  >
                    Generate Masterpiece
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: PROCESSING */}
          {step === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
            >
              <div className="w-24 h-24 border border-[#ecab13]/30 rounded-full flex items-center justify-center relative">
                 <div className="absolute inset-0 border-t-2 border-[#ecab13] rounded-full animate-spin" />
                 <span className="material-symbols-outlined text-[#ecab13] animate-pulse">checkroom</span>
              </div>
              <p className="mt-8 text-[#ecab13] text-sm uppercase tracking-[0.3em] animate-pulse">{processingStatus}</p>
            </motion.div>
          )}

          {/* STEP 4: RESULT */}
          {step === 'result' && resultImage && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex-1 flex flex-col items-center justify-center max-w-7xl mx-auto w-full px-6 pb-12"
            >
              <div className="grid lg:grid-cols-2 gap-12 w-full items-start">

                {/* Image Result with HyperZoom */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/60">Static Masterpiece</h3>
                    <div className="flex items-center gap-2 text-[#ecab13] text-xs">
                      <span className="material-symbols-outlined text-sm">zoom_in</span>
                      <span>Hyper-Zoom Ready</span>
                    </div>
                  </div>

                  <div className="aspect-[3/4] w-full bg-[#111] rounded-sm overflow-hidden border border-white/10 shadow-2xl">
                    <HyperZoom imageUrl={resultImage} altText="Fitting Result" />
                  </div>
                </div>

                {/* Motion & Actions */}
                <div className="space-y-8 lg:pt-12">
                   <div className="space-y-2">
                     <p className="text-[#ecab13] text-xs font-bold tracking-widest uppercase">{selectedItem?.brand}</p>
                     <h2 className="text-4xl font-serif">{selectedItem?.name}</h2>
                     <p className="text-white/60 leading-relaxed max-w-md">{selectedItem?.description}</p>
                   </div>

                   <div className="h-px w-full bg-white/10" />

                   <div className="space-y-4">
                     <h3 className="text-sm font-bold uppercase tracking-widest text-white/60">Cinematic Motion</h3>

                     {videoUrl ? (
                       <div className="w-full">
                         <CinematicViewer videoUrl={videoUrl} posterUrl={resultImage} />
                       </div>
                     ) : (
                        <div className="aspect-video w-full bg-[#111] rounded-xl border border-white/10 flex flex-col items-center justify-center p-8 text-center space-y-4">
                          <p className="text-white/40 text-sm">Experience the fabric physics in motion.</p>
                          <button
                            onClick={handleGenerateMotion}
                            disabled={isGeneratingVideo}
                            className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-[#ecab13] transition-colors disabled:opacity-50"
                          >
                            {isGeneratingVideo ? 'Synthesizing Video...' : 'Generate 4K Motion'}
                          </button>
                        </div>
                     )}
                   </div>

                   {/* Share */}
                   <button className="w-full border border-white/20 py-4 flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-colors uppercase tracking-widest text-sm font-bold">
                     <span className="material-symbols-outlined">ios_share</span>
                     Share Cinematic Look
                   </button>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
