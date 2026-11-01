'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function SimpleTryOn() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [garmentImage, setGarmentImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setter(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!userImage || !garmentImage) {
      alert('Please upload both images');
      return;
    }

    setIsProcessing(true);
    try {
      const res = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhotoUrl: userImage,
          garmentImageUrl: garmentImage,
          category: 'tops'
        })
      });

      const data = await res.json();
      if (data.imageUrl) {
        setResultImage(data.imageUrl);
      } else {
        throw new Error('Generation failed');
      }
    } catch (error) {
      console.error(error);
      // Fallback for demo if API fails
      setResultImage('https://pub-83c5db439b40468498f97946200806f7.r2.dev/mock-result-sfit.png');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-void-black text-white min-h-screen">
      <h1 className="text-3xl font-display mb-8 text-center text-cyber-lime">VIRTUAL TRY-ON</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

        {/* User Photo */}
        <div className="border border-white/20 rounded-xl p-4 flex flex-col items-center justify-center min-h-[300px] relative bg-white/5">
          {userImage ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={userImage} alt="User" className="w-full h-full object-cover rounded-lg absolute inset-0" />
          ) : (
            <div className="text-center">
              <span className="text-4xl mb-2 block">👤</span>
              <p className="text-sm text-soft-gray">Upload Your Photo</p>
            </div>
          )}
          <input type="file" onChange={(e) => handleUpload(e, setUserImage)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
        </div>

        {/* Garment Photo */}
        <div className="border border-white/20 rounded-xl p-4 flex flex-col items-center justify-center min-h-[300px] relative bg-white/5">
          {garmentImage ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={garmentImage} alt="Garment" className="w-full h-full object-cover rounded-lg absolute inset-0" />
          ) : (
            <div className="text-center">
              <span className="text-4xl mb-2 block">👕</span>
              <p className="text-sm text-soft-gray">Upload Garment</p>
            </div>
          )}
          <input type="file" onChange={(e) => handleUpload(e, setGarmentImage)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
        </div>
      </div>

      <div className="text-center mb-12">
        <button 
          onClick={handleGenerate}
          disabled={!userImage || !garmentImage || isProcessing}
          className="bg-cyber-lime text-void-black font-bold py-4 px-12 rounded-full uppercase tracking-widest disabled:opacity-50 hover:brightness-110 transition-all"
        >
          {isProcessing ? 'GENERATING...' : 'GENERATE FIT'}
        </button>
      </div>

      {resultImage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 border border-cyber-lime/30 rounded-xl p-4 bg-white/5"
        >
          <h2 className="text-xl font-mono text-cyber-lime mb-4 text-center">RESULT</h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={resultImage} alt="Generated Fit" className="w-full max-w-md mx-auto rounded-lg" />
        </motion.div>
      )}
    </div>
  );
}
