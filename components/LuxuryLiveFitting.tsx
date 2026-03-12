'use client';

import React, { useState, useEffect } from 'react';
import { Playfair_Display } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { brands } from '@/data/mockData';
import GoldRingCursor from './GoldRingCursor';
import { LuxuryImageDistortion } from './masterpiece/LuxuryImageDistortion';
import Link from 'next/link';

const playfair = Playfair_Display({ subsets: ['latin'] });

export default function LuxuryLiveFitting() {
  const { selectedBrand } = useStore();
  const [isProcessing, setIsProcessing] = useState(true);

  // Fake loading sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsProcessing(false);
    }, 4000); // Wait for Masterpiece tracing box animation
    return () => clearTimeout(timer);
  }, []);

  const formatPrice = (price: number | undefined, currency: string = 'USD') => {
    if (price === undefined) return '';
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
      }).format(price);
    } catch {
      return `$${price.toLocaleString()}`;
    }
  };

  const currentBrand = brands.find(b => b.id === selectedBrand);

  const mockItems = [
    { name: 'Aura Blazer', price: 2400, currency: 'USD', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0' },
    { name: 'Silk Gown', price: 3100, currency: 'USD', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0' },
    { name: 'Moto Jacket', price: 1800, currency: 'USD', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA' },
    { name: 'Tech Coat', price: 4500, currency: 'USD', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk' },
  ];

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0A0A0A] text-white ${playfair.className} duration-1000 transition-all ease-in-out`}>
      <GoldRingCursor />

      {/* Tracing Box Loader Overlay */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A0A]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
          >
            <div className="relative size-48">
              <motion.svg
                className="absolute inset-0 size-full"
                viewBox="0 0 100 100"
                initial="hidden"
                animate="visible"
              >
                <motion.rect
                  width="98"
                  height="98"
                  x="1"
                  y="1"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
                />
              </motion.svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
                <span className="text-[#D4AF37] material-symbols-outlined text-4xl animate-pulse">diamond</span>
                <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">Masterpiece</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="relative flex h-full w-full">
        {/* Left Side: Parallax Brand Experience */}
        <motion.div
            className="hidden md:flex flex-col w-1/3 h-full border-r border-[#D4AF37]/20 relative overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isProcessing ? 0 : 1, x: isProcessing ? -50 : 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        >
            {/* Background Parallax */}
            <motion.div
                className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity saturate-[0.9] contrast-[1.1]"
                style={{ backgroundImage: `url('${currentBrand?.bannerImage || 'https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=2000&auto=format&fit=crop'}')` }}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            />

            <div className="relative z-10 p-12 flex flex-col h-full">
                <Link href="/" className="mb-12 inline-block">
                    <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em]">S_FIT AI <br/> Luxury</span>
                </Link>

                <div className="mt-auto mb-12">
                    <h1 className="text-5xl lg:text-7xl font-light text-white mb-6 uppercase tracking-widest leading-tight">
                        {currentBrand?.name || 'Exclusive'} <br/> <span className="text-[#D4AF37]">Collection</span>
                    </h1>
                    <p className="text-white/60 text-sm leading-relaxed max-w-sm tracking-wider font-sans">
                        {currentBrand?.description || 'Experience the epitome of digital tailoring. Our Masterpiece engine renders fabrics with microscopic precision, simulating authentic draping and light interaction.'}
                    </p>
                </div>
            </div>
        </motion.div>

        {/* Right Side: Product Visualizer & Cards */}
        <div className="flex-1 relative flex flex-col lg:flex-row h-full">
             {/* 3D Visualizer Area */}
            <div className="absolute inset-0 z-0">
               <LuxuryImageDistortion
                    imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
                    className="w-full h-full object-cover saturate-[0.9] contrast-[1.1]"
                    aspectRatio={16/9}
                />
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.8)_100%)] pointer-events-none" />
                <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
            </div>

            {/* Top Navigation Bar (Mobile/Overlay) */}
            <div className="absolute top-0 w-full z-20 flex items-center justify-between p-6">
                <Link href="/" className="md:hidden flex size-12 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#0A0A0A]/40 backdrop-blur-md text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors duration-700">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <div className="flex items-center gap-3 rounded-full border border-[#D4AF37]/30 bg-[#0A0A0A]/40 backdrop-blur-md px-6 py-3 ml-auto">
                    <div className="size-2 animate-pulse rounded-full bg-[#D4AF37]"></div>
                    <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4AF37]">Live Fit Mode</h2>
                </div>
            </div>

            {/* Upper HUD: Stability */}
            <motion.div
                className="absolute top-24 right-6 z-20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isProcessing ? 0 : 1, y: isProcessing ? -20 : 0 }}
                transition={{ duration: 1, delay: 1 }}
            >
                <div className="w-48 p-4 rounded-none border border-[#D4AF37]/20 bg-[#0A0A0A]/60 backdrop-blur-xl">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-end justify-between">
                            <p className="text-[10px] uppercase tracking-widest text-white/50">Stability</p>
                            <p className="text-sm font-bold text-[#D4AF37]">99.8%</p>
                        </div>
                        <div className="h-[1px] w-full bg-white/10 relative">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-[#D4AF37]"
                                initial={{ width: "0%" }}
                                animate={{ width: "99.8%" }}
                                transition={{ duration: 2, delay: 1.5 }}
                            />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Vertical Product Carousel (Right Edge) */}
            <motion.div
                className="absolute right-0 bottom-0 top-0 z-20 hidden lg:flex flex-col justify-center w-64 p-6 gap-6"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: isProcessing ? 0 : 1, x: isProcessing ? 50 : 0 }}
                transition={{ duration: 1.5, delay: 1 }}
            >
                <div className="flex flex-col gap-6 w-full max-h-[80vh] overflow-y-auto scrollbar-hide no-scrollbar pb-24" style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }}>
                    {mockItems.map((item, i) => (
                        <div key={i} className={`flex flex-col gap-4 p-3 rounded-none border ${i === 0 ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-[#D4AF37]/20 bg-[#0A0A0A]/60'} backdrop-blur-xl transition-all duration-700 hover:border-[#D4AF37]/50 cursor-pointer group`}>
                            <div className="aspect-[3/4] w-full relative overflow-hidden bg-zinc-900 border border-white/5">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 saturate-[0.9] contrast-[1.1]"
                                    style={{ backgroundImage: `url("${item.img}")` }}
                                ></div>
                                {i === 0 && (
                                    <div className="absolute top-2 right-2 bg-[#D4AF37] text-black text-[9px] font-bold px-2 py-1 uppercase tracking-widest">
                                        Fitted
                                    </div>
                                )}
                            </div>
                            <div className="text-center pb-2">
                                <p className="text-xs uppercase tracking-widest text-white mb-1">{item.name}</p>
                                <p className="text-sm text-[#D4AF37]">{formatPrice(item.price, item.currency)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Bottom Actions */}
            <motion.div
                className="absolute bottom-10 left-0 right-0 z-20 flex justify-center lg:justify-start lg:ml-[10%]"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: isProcessing ? 0 : 1, y: isProcessing ? 50 : 0 }}
                transition={{ duration: 1.5, delay: 1.2 }}
            >
                <div className="flex items-center gap-12">
                    <button className="flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors duration-700">
                        <div className="flex size-14 items-center justify-center rounded-full border border-white/20 bg-[#0A0A0A]/80 backdrop-blur-md">
                            <span className="material-symbols-outlined font-light">tune</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-widest">Adjust</span>
                    </button>

                    <div className="relative group cursor-pointer">
                        <div className="absolute inset-0 rounded-full border border-[#D4AF37] animate-ping opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
                        <button className="relative flex size-24 items-center justify-center rounded-full bg-[#D4AF37] text-black shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-transform duration-700 hover:scale-105">
                            <span className="material-symbols-outlined text-3xl font-light">camera</span>
                        </button>
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] whitespace-nowrap">
                            Capture Look
                        </span>
                    </div>

                    <button className="flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors duration-700">
                        <div className="flex size-14 items-center justify-center rounded-full border border-white/20 bg-[#0A0A0A]/80 backdrop-blur-md">
                            <span className="material-symbols-outlined font-light">info</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-widest">Details</span>
                    </button>
                </div>
            </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}