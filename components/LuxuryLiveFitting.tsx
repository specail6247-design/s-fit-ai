"use client";

import React, { useState, useEffect } from "react";
import { Cinzel } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import LuxuryImageDistortion from "./LuxuryImageDistortion";

const cinzel = Cinzel({ subsets: ["latin"] });

// Mock brand details
const BRAND_DETAILS: Record<string, { bannerImage: string, description: string }> = {
  Gucci: {
    bannerImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000",
    description: "Florentine artistry, redefined for the modern era."
  },
  Chanel: {
    bannerImage: "https://images.unsplash.com/photo-1542452255191-c85a98f2c5d1?auto=format&fit=crop&q=80&w=2000",
    description: "Elegance is refusal. The ultimate expression of luxury."
  }
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price);
};

export default function LuxuryLiveFitting() {
  const [activeBrand, setActiveBrand] = useState<string>("Gucci");
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHoveringProduct, setIsHoveringProduct] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const activeBrandData = BRAND_DETAILS[activeBrand];

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white ${cinzel.className} cursor-none selection:bg-[#D4AF37] selection:text-black`}>
      {/* Custom Gold Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#D4AF37] pointer-events-none z-50 flex items-center justify-center mix-blend-difference"
        animate={{
          x: cursorPos.x - 16,
          y: cursorPos.y - 16,
          scale: isHoveringProduct ? 1.5 : 1,
          opacity: 1
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        <motion.div
            className="w-1 h-1 bg-[#D4AF37] rounded-full"
            animate={{ scale: isHoveringProduct ? 0 : 1 }}
        />
      </motion.div>

      {/* Main Viewport Container */}
      <div className="relative flex h-screen w-full flex-col" data-alt="Luxury live fitting background">

        {/* Brand Parallax Banner */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBrand}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              backgroundImage: `linear-gradient(rgba(10,10,10,0.4), rgba(10,10,10,0.8)), url('${activeBrandData.bannerImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </AnimatePresence>

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-8">
          <button className="flex items-center justify-center p-2 text-white/50 hover:text-white transition-colors duration-700">
            <span className="material-symbols-outlined text-[28px] font-light">menu</span>
          </button>
          <div className="flex flex-col items-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={activeBrand}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 1 }}
                className="text-2xl tracking-[0.3em] uppercase text-[#D4AF37] font-light"
              >
                {activeBrand}
              </motion.h1>
            </AnimatePresence>
            <p className="text-[10px] tracking-widest text-white/40 mt-1 uppercase font-sans">
              Live Fitting Session
            </p>
          </div>
          <button className="flex items-center justify-center p-2 text-white/50 hover:text-[#D4AF37] transition-colors duration-700">
            <span className="material-symbols-outlined text-[28px] font-light">shopping_bag</span>
          </button>
        </div>

        {/* Brand Description Overlay */}
        <div className="z-10 absolute top-32 left-8 max-w-sm pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeBrand}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-sm font-sans font-light text-white/70 leading-relaxed italic"
            >
              {activeBrandData.description}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Vertical Product Masonry List */}
        <div className="absolute right-8 top-32 bottom-32 w-48 overflow-y-auto scrollbar-hide z-10 space-y-8 pr-2 flex flex-col items-end">
          <div
            className="flex w-full flex-col gap-4 group cursor-none"
            onMouseEnter={() => setIsHoveringProduct(true)}
            onMouseLeave={() => setIsHoveringProduct(false)}
          >
            <div className="relative overflow-hidden group-hover:border-[#D4AF37]/50 border border-transparent transition-colors duration-700">
              <LuxuryImageDistortion
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0"
                alt="Aura Blazer"
                className="w-full aspect-[3/4]"
              />
              <div className="absolute inset-0 border border-[#D4AF37]/20 pointer-events-none" />
            </div>
            <div className="text-right">
              <p className="text-sm tracking-widest uppercase text-white font-light group-hover:text-[#D4AF37] transition-colors duration-700">Aura Blazer</p>
              <p className="text-xs font-sans text-white/50 mt-1">{formatPrice(2400)}</p>
            </div>
          </div>

          {[
              { name: "Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
              { name: "Moto Jacket", price: 1800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
              { name: "Tech Coat", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex w-[85%] flex-col gap-4 opacity-60 hover:opacity-100 group cursor-none transition-opacity duration-700"
              onMouseEnter={() => setIsHoveringProduct(true)}
              onMouseLeave={() => setIsHoveringProduct(false)}
            >
              <div className="relative overflow-hidden group-hover:border-[#D4AF37]/50 border border-transparent transition-colors duration-700">
                <LuxuryImageDistortion
                  src={item.img}
                  alt={item.name}
                  className="w-full aspect-[3/4]"
                />
              </div>
              <div className="text-right">
                <p className="text-sm tracking-widest uppercase text-white font-light group-hover:text-[#D4AF37] transition-colors duration-700">{item.name}</p>
                <p className="text-xs font-sans text-white/50 mt-1">{formatPrice(item.price)}</p>
              </div>
            </div>
          ))}

          {/* Luxury Loading Animation (Replacing generic skeleton) */}
          <div className="w-[85%] mt-8 flex flex-col gap-4 opacity-40">
            <div className="relative w-full aspect-[3/4] bg-white/5 overflow-hidden">
                <motion.div
                    className="absolute inset-0 border border-[#D4AF37]"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        opacity: [0, 1, 0],
                        background: ["linear-gradient(transparent, transparent)", "linear-gradient(transparent, rgba(212, 175, 55, 0.1))", "linear-gradient(transparent, transparent)"]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>
            <div className="h-4 w-2/3 ml-auto bg-white/10" />
            <div className="h-3 w-1/3 ml-auto bg-white/10" />
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-auto p-8 z-10 flex items-end justify-between">
            {/* Brand Switcher (Demo purposes) */}
            <div className="flex gap-4">
                {Object.keys(BRAND_DETAILS).map(brand => (
                    <button
                        key={brand}
                        onClick={() => setActiveBrand(brand)}
                        className={`text-xs uppercase tracking-widest transition-colors duration-700 ${activeBrand === brand ? "text-[#D4AF37] border-b border-[#D4AF37] pb-1" : "text-white/40 hover:text-white"}`}
                    >
                        {brand}
                    </button>
                ))}
            </div>

            {/* Main Action */}
            <div className="flex flex-col items-center gap-4">
                <div className="relative flex items-center justify-center">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 rounded-full border border-[#D4AF37] blur-[2px]"
                    />
                    <button
                        className="relative flex size-20 shrink-0 items-center justify-center rounded-full bg-black border border-[#D4AF37]/50 hover:border-[#D4AF37] transition-colors duration-700 group"
                        onMouseEnter={() => setIsHoveringProduct(true)}
                        onMouseLeave={() => setIsHoveringProduct(false)}
                    >
                        <span className="material-symbols-outlined text-[32px] font-light text-[#D4AF37] group-hover:scale-110 transition-transform duration-700">camera</span>
                    </button>
                </div>
                <span className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] font-light">
                    Capture Fit
                </span>
            </div>

            {/* Spacer to balance flex-between */}
            <div className="w-[120px]"></div>
        </div>

        {/* System UI Safe Area */}
        <div className="mx-auto mb-2 h-1 w-32 bg-white/20"></div>
      </div>
    </div>
  );
}
