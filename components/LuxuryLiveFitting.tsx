'use client';

import React, { useState, useEffect } from 'react';
import { Playfair_Display } from 'next/font/google';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import LuxuryImageDistortion from './ui/LuxuryImageDistortion';

const playfairDisplay = Playfair_Display({ subsets: ['latin'] });

const BRANDS = [
  { id: 'gucci', name: 'GUCCI', desc: 'Florentine heritage meets contemporary vision.', banner: 'https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=1000' },
  { id: 'prada', name: 'PRADA', desc: 'Intellectual elegance and avant-garde luxury.', banner: 'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?auto=format&fit=crop&q=80&w=1000' },
  { id: 'lv', name: 'LOUIS VUITTON', desc: 'The art of travel since 1854.', banner: 'https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=1000' },
];

const GARMENTS = [
  { id: 1, name: 'Aura Blazer', price: 2400, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0' },
  { id: 2, name: 'Silk Gown', price: 3100, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0' },
  { id: 3, name: 'Tech Coat', price: 4500, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk' },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
};

export default function LuxuryLiveFitting() {
  const [selectedBrand, setSelectedBrand] = useState(BRANDS[0]);
  const [selectedGarment, setSelectedGarment] = useState(GARMENTS[0]);
  const [isLoading, setIsLoading] = useState(true);

  // Custom Cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white ${playfairDisplay.className}`}>
      {/* Custom Cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] size-8 rounded-full border border-[#ecab13] mix-blend-difference hidden md:block"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      />

      {/* Main AR Viewport Container */}
      <div className="relative flex h-screen w-full flex-col p-6 lg:p-12">
        {/* Top Navigation */}
        <div className="z-10 flex items-center justify-between">
          <Link href="/" className="flex size-12 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md transition-colors duration-700 hover:border-[#ecab13] hover:text-[#ecab13]">
            <span className="material-symbols-outlined text-sm font-light">close</span>
          </Link>

          <div className="flex items-center gap-6">
            {BRANDS.map(brand => (
              <button
                key={brand.id}
                onClick={() => setSelectedBrand(brand)}
                className={`text-sm tracking-[0.3em] transition-all duration-1000 ${selectedBrand.id === brand.id ? 'text-[#ecab13]' : 'text-white/40 hover:text-white/80'}`}
              >
                {brand.name}
              </button>
            ))}
          </div>

          <div className="flex size-12 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md transition-colors duration-700 hover:border-[#ecab13] hover:text-[#ecab13]">
            <span className="material-symbols-outlined text-sm font-light">menu</span>
          </div>
        </div>

        {/* Brand Experience Parallax Banner (Simulated) */}
        <motion.div
          key={selectedBrand.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute inset-0 z-0 overflow-hidden"
        >
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-[10s] ease-linear hover:scale-110"
            style={{ backgroundImage: `url(${selectedBrand.banner})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0a0a0a]" />

          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-center w-full px-4">
            <h1 className="text-4xl md:text-6xl font-normal tracking-[0.2em] text-white/90 mb-4">{selectedBrand.name}</h1>
            <p className="text-sm tracking-widest text-[#ecab13] font-light uppercase">{selectedBrand.desc}</p>
          </div>
        </motion.div>

        {/* Loading State: Thin Gold Line */}
        {isLoading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/90 backdrop-blur-sm">
            <div className="relative size-32">
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
                <motion.rect
                  x="5" y="5" width="90" height="90"
                  fill="none"
                  stroke="#ecab13"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
                />
              </svg>
            </div>
          </div>
        )}

        {/* Main Content Area - Layout with Increased Whitespace */}
        <div className="z-10 mt-auto flex flex-col md:flex-row gap-12 md:gap-24 items-end pb-8">

          {/* Main Visual - LuxuryImageDistortion */}
          <div className="w-full md:w-2/3 lg:w-1/2 shrink-0">
             <LuxuryImageDistortion
               imageUrl={selectedGarment.img}
               alt={selectedGarment.name}
               className="aspect-[3/4] w-full rounded-sm object-cover"
             />
             <div className="mt-8 flex justify-between items-end">
               <div>
                 <p className="text-sm tracking-widest text-white/50 mb-2 uppercase">{selectedBrand.name}</p>
                 <h2 className="text-3xl font-light tracking-wide">{selectedGarment.name}</h2>
               </div>
               <p className="text-xl text-[#ecab13] tracking-wider">{formatPrice(selectedGarment.price)}</p>
             </div>
          </div>

          {/* Vertical Garment Carousel */}
          <div className="w-full md:w-1/3 flex flex-col gap-8 h-[60vh] overflow-y-auto scrollbar-hide py-8" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}>
            {GARMENTS.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedGarment(item)}
                className={`group relative flex flex-col gap-4 text-left transition-all duration-700 ${selectedGarment.id === item.id ? 'opacity-100 scale-100' : 'opacity-40 scale-95 hover:opacity-80'}`}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url(${item.img})` }}
                  />
                  {selectedGarment.id === item.id && (
                    <div className="absolute inset-0 border border-[#ecab13]/50 pointer-events-none" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-light tracking-wider">{item.name}</p>
                  <p className="text-xs tracking-widest text-[#ecab13] mt-1">{formatPrice(item.price)}</p>
                </div>
              </button>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
