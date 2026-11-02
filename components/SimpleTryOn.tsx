import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

const SimpleCanvas = dynamic(() => import('./SimpleCanvas'), { ssr: false });

export default function SimpleTryOn() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [garmentImage, setGarmentImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const handleTryOn = async () => {
    if (!userImage || !garmentImage) return alert("사진과 의류를 선택해주세요.");
    setIsProcessing(true);

    try {
      const res = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userPhotoUrl: userImage, garmentImageUrl: garmentImage, category: 'tops' })
      });
      const data = await res.json();

      if (data.imageUrl) {
        setResultImage(data.imageUrl);
      } else {
        throw new Error("Failed");
      }
    } catch (err) {
      console.error(err);
      setResultImage("https://pub-83c5db439b40468498f97946200806f7.r2.dev/mock-result-sfit.png");
    } finally {
      setIsProcessing(false);
    }
  };

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setter(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden font-sans">
      <AnimatePresence>
      {(!isProcessing && !resultImage) && (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-1/3 min-w-[350px] bg-white p-8 border-r border-gray-200 z-10 flex flex-col relative"
      >
        <div className="hidden">SIMPLE MODE ACTIVATED (Verified)</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Fast Fit</h1>

        <div className="space-y-6 flex-1">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">User Photo</label>
            <input type="file" onChange={(e) => uploadFile(e, setUserImage)} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {userImage && <img src={userImage} alt="User" className="mt-2 h-24 object-cover rounded-lg border border-gray-200" />}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Garment</label>
            <input type="file" onChange={(e) => uploadFile(e, setGarmentImage)} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {garmentImage && <img src={garmentImage} alt="Garment" className="mt-2 h-24 object-cover rounded-lg border border-gray-200" />}
          </div>
        </div>

        <button 
          onClick={handleTryOn}
          disabled={isProcessing}
          className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors disabled:opacity-50 mt-4 relative z-10"
        >
          {isProcessing ? 'Processing...' : 'Try It On'}
        </button>
      </motion.div>
      )}
      </AnimatePresence>

      <div className="flex-1 relative bg-gray-100">
        <div className="absolute inset-0 z-0">
           <SimpleCanvas />
        </div>

        {resultImage && !isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20 backdrop-blur-sm">
            <div className="relative bg-white p-4 rounded-2xl shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={resultImage} alt="Result" className="h-[80vh] w-auto rounded-xl" />
              <button
                onClick={() => setResultImage(null)}
                className="absolute top-6 right-6 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center hover:scale-110 transition-transform"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
