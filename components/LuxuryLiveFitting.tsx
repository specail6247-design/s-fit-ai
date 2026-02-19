'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { mockClothingItems, ClothingItem } from '@/data/mockData';

export default function LuxuryLiveFitting() {
  // State
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [selectedGarment, setSelectedGarment] = useState<ClothingItem | null>(null);
  const [selectedAccessory, setSelectedAccessory] = useState<ClothingItem | null>(null);
  const [tryOnResult, setTryOnResult] = useState<string | null>(null);
  const [videoResult, setVideoResult] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Steps: 'upload' -> 'garment' -> 'accessory' -> 'result'
  const [step, setStep] = useState<'upload' | 'garment' | 'accessory' | 'result'>('upload');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter items
  const garments = mockClothingItems.filter(item => item.category !== 'accessories');
  const accessories = mockClothingItems.filter(item => item.category === 'accessories');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserPhoto(event.target?.result as string);
        setStep('garment');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = async () => {
    if (!userPhoto || !selectedGarment) return;

    setIsProcessing(true);
    setStatusMessage('Simulating garment physics...');
    setStep('result');

    try {
      // 1. First Pass: Garment Try-On
      console.log('Starting garment try-on...');
      const garmentRes = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhotoUrl: userPhoto,
          garmentImageUrl: selectedGarment.imageUrl,
          category: selectedGarment.category
        })
      });

      const garmentData = await garmentRes.json();
      if (!garmentData.success) throw new Error(garmentData.error);

      let currentResult = garmentData.imageUrl;

      // 2. Second Pass: Accessory Layer (if selected)
      if (selectedAccessory) {
        setStatusMessage('Layering accessories...');
        console.log('Starting accessory try-on...');

        // Use the result of the first pass as the input for the second pass
        const accessoryRes = await fetch('/api/try-on', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userPhotoUrl: currentResult, // The output of step 1 is input for step 2
            garmentImageUrl: selectedAccessory.imageUrl,
            category: 'upper_body' // Map accessory to upper_body for IDM-VTON as per plan
          })
        });

        const accessoryData = await accessoryRes.json();
        if (!accessoryData.success) {
            console.warn('Accessory try-on failed, falling back to garment only', accessoryData.error);
            // Fallback to garment-only result if accessory fails
        } else {
            currentResult = accessoryData.imageUrl;
        }
      }

      setTryOnResult(currentResult);
      setStatusMessage('Rendering complete.');
    } catch (error) {
      console.error('Try-on error:', error);
      setStatusMessage('Error during simulation.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerateVideo = async () => {
    if (!tryOnResult) return;

    setIsProcessing(true);
    setStatusMessage('Synthesizing cinematic motion (Runway Gen-3)...');

    try {
      const res = await fetch('/api/runway-motion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: tryOnResult, upscale: true })
      });

      const data = await res.json();
      if (data.success) {
        setVideoResult(data.videoUrl);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Video generation error:', error);
      setStatusMessage('Failed to generate video.');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetProcess = () => {
    setUserPhoto(null);
    setSelectedGarment(null);
    setSelectedAccessory(null);
    setTryOnResult(null);
    setVideoResult(null);
    setStep('upload');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden">
       {/* Top Bar */}
       <div className="fixed top-0 z-50 w-full bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#2d2d2d]">
        <div className="flex items-center p-4 justify-between max-w-2xl mx-auto">
          <button onClick={resetProcess} className="text-white flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <span className="material-symbols-outlined">restart_alt</span>
          </button>
          <h2 className="text-white text-sm font-bold tracking-[0.2em] uppercase flex-1 text-center">
            {step === 'upload' && 'Studio Setup'}
            {step === 'garment' && 'Select Garment'}
            {step === 'accessory' && 'Accessorize'}
            {step === 'result' && 'Masterpiece Reveal'}
          </h2>
          <div className="w-10"></div>
        </div>
      </div>

      <main className="max-w-2xl mx-auto pt-24 pb-32 px-4 min-h-screen flex flex-col items-center justify-center">

        {/* Step 1: Upload */}
        {step === 'upload' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col items-center gap-6"
          >
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full aspect-[3/4] max-w-sm rounded-2xl border-2 border-dashed border-[#2d2d2d] flex flex-col items-center justify-center bg-[#1a1a1a] hover:bg-[#222] transition-colors cursor-pointer group"
            >
              <div className="size-20 rounded-full bg-[#2d2d2d] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl text-[#ecab13]">add_a_photo</span>
              </div>
              <p className="text-zinc-400 font-medium">Upload Your Photo</p>
              <p className="text-zinc-600 text-xs mt-2">Best with neutral background</p>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              accept="image/*"
              className="hidden"
            />
          </motion.div>
        )}

        {/* Step 2 & 3: Selection */}
        {(step === 'garment' || step === 'accessory') && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-light text-white">
                {step === 'garment' ? 'Choose your Look' : 'Add Accessories'}
              </h3>
              {step === 'accessory' && (
                <button
                  onClick={() => handleTryOn()}
                  className="text-xs text-zinc-400 hover:text-white underline"
                >
                  Skip
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 pb-24">
              {(step === 'garment' ? garments : accessories).map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (step === 'garment') {
                      setSelectedGarment(item);
                      setStep('accessory');
                    } else {
                      setSelectedAccessory(item);
                    }
                  }}
                  className={`relative aspect-[3/4] rounded-xl overflow-hidden bg-[#1a1a1a] border-2 cursor-pointer transition-colors ${
                    (step === 'garment' ? selectedGarment?.id === item.id : selectedAccessory?.id === item.id)
                      ? 'border-[#ecab13]'
                      : 'border-transparent hover:border-white/20'
                  }`}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover p-4"
                  />
                  <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-xs font-bold text-white truncate">{item.name}</p>
                    <p className="text-[10px] text-[#ecab13]">{item.brand}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action Bar for Accessory Step */}
            {step === 'accessory' && (
              <div className="fixed bottom-0 left-0 w-full bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-[#2d2d2d] p-4 z-40">
                <div className="max-w-2xl mx-auto">
                   <button
                    onClick={handleTryOn}
                    disabled={!selectedGarment}
                    className="w-full bg-[#ecab13] text-black h-12 rounded-lg font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#d49a11] transition-colors"
                  >
                    Generate Masterpiece
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Step 4: Result */}
        {step === 'result' && (
          <div className="w-full flex flex-col items-center gap-6">
            <div className="relative w-full aspect-[3/4] bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl border border-[#2d2d2d]">
              {isProcessing && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20 backdrop-blur-sm">
                  <div className="size-16 rounded-full border-4 border-[#2d2d2d] border-t-[#ecab13] animate-spin mb-4"></div>
                  <p className="text-[#ecab13] text-sm font-bold animate-pulse">{statusMessage}</p>
                </div>
              )}

              {tryOnResult ? (
                 videoResult ? (
                    <video
                      src={videoResult}
                      controls
                      autoPlay
                      loop
                      className="w-full h-full object-cover"
                    />
                 ) : (
                    <Image
                      src={tryOnResult}
                      alt="Try On Result"
                      fill
                      className="object-cover"
                    />
                 )
              ) : (
                userPhoto && <Image src={userPhoto} alt="Original" fill className="object-cover opacity-50 blur-sm" />
              )}
            </div>

            {!isProcessing && tryOnResult && !videoResult && (
               <button
                onClick={handleGenerateVideo}
                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white h-12 rounded-lg font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <span className="material-symbols-outlined">movie_filter</span>
                Generate Cinematic Video
              </button>
            )}

            {!isProcessing && videoResult && (
               <a
                href={videoResult}
                download="masterpiece_fit.mp4"
                className="w-full bg-[#ecab13] text-black h-12 rounded-lg font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#d49a11] transition-colors"
              >
                <span className="material-symbols-outlined">download</span>
                Download 4K Clip
              </a>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
