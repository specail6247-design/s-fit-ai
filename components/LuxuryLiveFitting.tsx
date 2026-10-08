"use client";
import React, { useState, useEffect } from "react";
import { Space_Grotesk, Cinzel } from "next/font/google";
import LuxuryImageDistortion from "./LuxuryImageDistortion";
import { motion, AnimatePresence } from "framer-motion";
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: 'optional' });
const cinzel = Cinzel({ subsets: ["latin"], display: 'optional' });


const LUXURY_BRAND = { name: "AURA LUXURY", description: "Elegance redefined for the modern digital era. Experience unparalleled craftsmanship in every thread.", bannerImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" };
const LUXURY_PRODUCTS = [
  { id: 1, name: "Aura Blazer", price: 2400, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=500" },
  { id: 2, name: "Silk Gown", price: 3100, img: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&q=80&w=500" },
  { id: 3, name: "Moto Jacket", price: 1800, img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=500" },
  { id: 4, name: "Tech Coat", price: 4500, img: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&q=80&w=500" }
];
export default function LuxuryLiveFitting() {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(LUXURY_PRODUCTS[0]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => { setMousePosition({ x: e.clientX, y: e.clientY }); };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  useEffect(() => {
    const handleScroll = () => { setScrollY(window.scrollY); };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => { setIsAnalyzing(false); }, 3000);
    return () => clearTimeout(timer);
  }, []);
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
  };
  return (
    <div className={`relative min-h-screen w-full bg-black text-white ${spaceGrotesk.className} cursor-none overflow-x-hidden selection:bg-[#D4AF37] selection:text-black`}>
      <motion.div className="pointer-events-none fixed z-[100] flex items-center justify-center mix-blend-difference" animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }} transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}>
        <div className="h-8 w-8 rounded-full border border-[#D4AF37] opacity-70" />
        <div className="absolute h-1 w-1 rounded-full bg-[#D4AF37]" />
      </motion.div>
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-screen" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1, ease: "easeInOut" }} className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl">
            <div className="relative h-64 w-48">
               <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <motion.rect x="2" y="2" width="96" height="96" fill="none" stroke="#D4AF37" strokeWidth="0.5" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }} />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}>
                    <span className="material-symbols-outlined text-4xl text-[#D4AF37] font-light" aria-hidden="true">auto_awesome</span>
                 </motion.div>
                 <motion.p className={`${cinzel.className} text-xs tracking-[0.3em] text-[#D4AF37] uppercase`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}>Calibrating Silhouette</motion.p>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: isAnalyzing ? 0 : 1 }} transition={{ duration: 1.5 }} className="relative z-10">
        <header className="relative h-[60vh] w-full overflow-hidden">
          <motion.div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${LUXURY_BRAND.bannerImage})`, y: scrollY * 0.5 }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <motion.h1 className={`${cinzel.className} text-5xl md:text-7xl font-bold tracking-widest text-[#D4AF37] mb-6 drop-shadow-2xl`} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>{LUXURY_BRAND.name}</motion.h1>
            <motion.p className="max-w-2xl text-sm md:text-base leading-relaxed text-white/80 tracking-wide font-light" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}>{LUXURY_BRAND.description}</motion.p>
          </div>
          <nav className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
             <button aria-label="Close" className="flex h-12 w-12 items-center justify-center rounded-full bg-black/20 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors duration-700"><span aria-hidden="true" className="material-symbols-outlined text-white font-light">close</span></button>
             <div className="flex items-center gap-3 rounded-full px-6 py-2 bg-black/20 backdrop-blur-md border border-white/10"><div className="h-2 w-2 animate-pulse rounded-full bg-[#D4AF37]" /><span className={`${cinzel.className} text-xs font-bold tracking-[0.2em] uppercase text-white`}>Digital Mirror</span></div>
             <button aria-label="Tune" className="flex h-12 w-12 items-center justify-center rounded-full bg-black/20 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors duration-700"><span aria-hidden="true" className="material-symbols-outlined text-white font-light">tune</span></button>
          </nav>
        </header>
        <main className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4 flex flex-col gap-12">
              <div className="space-y-6"><h2 className={`${cinzel.className} text-3xl text-white tracking-wide`}>Curated Selection</h2><div className="h-px w-24 bg-[#D4AF37]/50" /></div>
              <div className="flex flex-col gap-8">
                {LUXURY_PRODUCTS.map((product) => (
                  <motion.div key={product.id} className="group relative flex gap-6 cursor-pointer" onClick={() => setSelectedProduct(product)} whileHover={{ x: 10 }} transition={{ duration: 0.5, ease: "easeOut" }}>
                     <div className={`relative h-32 w-24 overflow-hidden rounded-sm transition-all duration-700 ${selectedProduct.id === product.id ? 'ring-1 ring-[#D4AF37] ring-offset-4 ring-offset-black' : 'opacity-60 group-hover:opacity-100'}`}>
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: `url(${product.img})`, filter: 'saturate(0.9) contrast(1.1)' }} />
                     </div>
                     <div className="flex flex-col justify-center gap-2">
                        <h3 className={`${cinzel.className} text-lg tracking-wider text-white group-hover:text-[#D4AF37] transition-colors duration-700`}>{product.name}</h3>
                        <p className="text-sm tracking-widest text-white/60 font-light">{formatPrice(product.price)}</p>
                     </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-8">
               <div className="sticky top-24">
                  <div className="relative aspect-[3/4] w-full max-w-2xl mx-auto rounded-sm overflow-hidden bg-[#111] border border-white/5 shadow-2xl">
                     <LuxuryImageDistortion imageUrl={selectedProduct.img} className="absolute inset-0 w-full h-full" alt={selectedProduct.name} />
                     <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                        <div className="flex flex-col gap-2 p-4 bg-black/40 backdrop-blur-md rounded-sm border border-white/10">
                           <p className={`${cinzel.className} text-sm text-[#D4AF37] tracking-widest uppercase`}>{selectedProduct.name}</p>
                           <p className="text-lg font-light tracking-wider text-white">{formatPrice(selectedProduct.price)}</p>
                        </div>
                        <div className="flex gap-4">
                           <button aria-label="Favorite" className="flex h-12 w-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all duration-700"><span aria-hidden="true" className="material-symbols-outlined font-light">favorite</span></button>
                           <button aria-label="Add to Atelier" className="flex h-12 px-8 items-center justify-center rounded-sm bg-white text-black hover:bg-[#D4AF37] transition-colors duration-700"><span className="text-xs font-bold tracking-[0.2em] uppercase">Add to Atelier</span></button>
                        </div>
                     </div>
                     <div className="absolute top-1/4 right-8 flex flex-col gap-8 opacity-40">
                         <div className="flex items-center gap-2"><div className="w-8 h-px bg-[#D4AF37]" /><span className="text-[10px] tracking-widest uppercase font-mono">Shoulder 42cm</span></div>
                         <div className="flex items-center gap-2"><div className="w-12 h-px bg-[#D4AF37]" /><span className="text-[10px] tracking-widest uppercase font-mono">Waist 76cm</span></div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </main>
      </motion.div>
    </div>
  );
}