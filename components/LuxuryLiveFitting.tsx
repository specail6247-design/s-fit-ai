"use client";

import React, { useState, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

const playfair = Playfair_Display({ subsets: ["latin"] });

const LuxuryImageDistortion = ({ src, isLoaded, onLoaded }: { src: string, isLoaded: boolean, onLoaded: () => void }) => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Simulate the Luxury Image Distortion visually */}
      <motion.img
        src={src}
        alt="User reflection"
        onLoad={onLoaded}
        initial={{ scale: 1.1, filter: 'blur(10px) brightness(0.5)' }}
        animate={isLoaded ? { scale: 1, filter: 'blur(0px) brightness(0.8)' } : {}}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
    </div>
  );
};

const LUXURY_BRANDS = [
  { id: 'gucci', name: 'Gucci', description: 'Florentine craftsmanship since 1921.', bannerImage: 'https://images.unsplash.com/photo-1549298240-0d8e60513026?auto=format&fit=crop&q=80&w=1000' },
  { id: 'prada', name: 'Prada', description: 'Intellectual fashion and avant-garde luxury.', bannerImage: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1000' },
];

const GARMENTS = [
    { name: "Aura Blazer", price: 2400, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0" },
    { name: "Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
    { name: "Moto Jacket", price: 1800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
    { name: "Tech Coat", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
];

export default function LuxuryLiveFitting() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(LUXURY_BRANDS[0]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white ${playfair.className}`}>

      {/* Custom Gold Ring Cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] h-12 w-12 rounded-full border border-[#D4AF37]/50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      />

      {/* Sophisticated Loading State */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]"
          >
            <div className="relative w-32 h-48 border border-white/5 flex items-center justify-center overflow-hidden">
               {/* Tracing gold line animation */}
               <motion.div
                  className="absolute inset-0 border border-[#D4AF37]"
                  initial={{ clipPath: 'polygon(0 0, 0 0, 0 0, 0 0)' }}
                  animate={{ clipPath: ['polygon(0 0, 100% 0, 100% 0, 0 0)', 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
               />
               <span className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] z-10 animate-pulse">Loading</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Viewport Container */}
      <div className="relative flex h-screen w-full flex-col" data-alt="User reflection with luxury AR garment overlay">

        <LuxuryImageDistortion
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
            isLoaded={isLoaded}
            onLoaded={() => setIsLoaded(true)}
        />

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-6 pt-10">
          <div className="flex size-12 items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-700 hover:bg-white/10 cursor-pointer">
            <span className="material-symbols-outlined text-white/80">close</span>
          </div>
          <div className="flex items-center gap-3 rounded-full px-6 py-3 bg-white/5 backdrop-blur-md border border-[#D4AF37]/30">
            <div className="size-1.5 animate-pulse rounded-full bg-[#D4AF37]"></div>
            <h2 className="text-sm tracking-[0.2em] uppercase text-[#D4AF37]">Luxury Fit</h2>
          </div>
          <div className="flex size-12 items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-700 hover:bg-white/10 cursor-pointer">
            <span className="material-symbols-outlined text-white/80">tune</span>
          </div>
        </div>

        {/* Brand Experience Section */}
        <div className="z-10 absolute top-32 left-6 max-w-sm">
           <AnimatePresence mode="wait">
              <motion.div
                 key={selectedBrand.id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                 className="flex flex-col gap-4"
              >
                  <h1 className="text-4xl tracking-widest text-[#D4AF37] uppercase">{selectedBrand.name}</h1>
                  <p className="text-sm text-white/60 tracking-wider leading-relaxed">{selectedBrand.description}</p>

                  {/* Brand Selector */}
                  <div className="flex gap-4 mt-4">
                     {LUXURY_BRANDS.map(brand => (
                        <button
                          key={brand.id}
                          onClick={() => setSelectedBrand(brand)}
                          className={`text-xs uppercase tracking-widest pb-1 border-b transition-all duration-700 ${selectedBrand.id === brand.id ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-white/40 hover:text-white/80'}`}
                        >
                           {brand.name}
                        </button>
                     ))}
                  </div>
              </motion.div>
           </AnimatePresence>
        </div>

        {/* Floating Stats Sidebar (Right) */}
        <div className="absolute right-6 top-1/3 z-10 flex flex-col gap-6">
          <div className="flex flex-col gap-2 bg-white/5 backdrop-blur-md border border-white/10 p-4 min-w-[140px] transition-all duration-1000 hover:border-[#D4AF37]/50">
            <p className="text-xs uppercase tracking-widest text-white/40">Shoulder</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl text-[#D4AF37]">98%</span>
              <span className="text-xs text-white/60">Perfect</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 bg-white/5 backdrop-blur-md border border-white/10 p-4 min-w-[140px] transition-all duration-1000 hover:border-[#D4AF37]/50">
            <p className="text-xs uppercase tracking-widest text-white/40">Drape</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl text-[#D4AF37]">100%</span>
              <span className="text-xs text-white/60">Flawless</span>
            </div>
          </div>
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto pb-12 z-10 flex flex-col items-center">

          {/* Garment Carousel */}
          <div className="w-full max-w-2xl px-6 mb-8 overflow-x-auto scrollbar-hide" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
             <div className="flex gap-6">
                {GARMENTS.map((item, i) => (
                   <motion.div
                      key={i}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col gap-3 min-w-[140px] cursor-pointer group"
                   >
                      <div
                         className="aspect-[3/4] w-full rounded-sm bg-cover bg-center border border-white/10 transition-all duration-700 group-hover:border-[#D4AF37]/50"
                         style={{ backgroundImage: `url('${item.img}')` }}
                      ></div>
                      <div className="flex flex-col gap-1">
                         <p className="text-xs tracking-widest text-white/80 uppercase">{item.name}</p>
                         <p className="text-sm text-[#D4AF37]">{formatPrice(item.price)}</p>
                      </div>
                   </motion.div>
                ))}
             </div>
          </div>

          {/* Capture Controls */}
          <div className="flex items-center justify-center gap-16 p-6">
            <button className="flex size-14 shrink-0 items-center justify-center rounded-full text-white/60 bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-700 hover:text-white hover:border-white/30 cursor-pointer">
              <span className="material-symbols-outlined font-light">photo_library</span>
            </button>

            <div className="relative flex items-center justify-center cursor-pointer group">
              <div className="absolute inset-0 rounded-full bg-[#D4AF37]/20 blur-2xl transition-all duration-1000 group-hover:bg-[#D4AF37]/40"></div>
              <button className="relative flex size-24 shrink-0 items-center justify-center rounded-full border-[1px] border-[#D4AF37] bg-transparent transition-all duration-1000 group-hover:scale-105">
                <div className="flex size-20 items-center justify-center rounded-full bg-[#D4AF37] text-black">
                  <span className="material-symbols-outlined text-3xl">camera</span>
                </div>
              </button>
              <div className="absolute -bottom-8 flex flex-col items-center opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <span className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">Capture</span>
              </div>
            </div>

            <button className="flex size-14 shrink-0 items-center justify-center rounded-full text-white/60 bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-700 hover:text-white hover:border-white/30 cursor-pointer">
              <span className="material-symbols-outlined font-light">cameraswitch</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
