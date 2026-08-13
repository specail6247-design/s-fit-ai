/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import { Playfair_Display, Space_Grotesk } from "next/font/google";
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { LuxuryImageDistortion } from './masterpiece/LuxuryImageDistortion';

const playfair = Playfair_Display({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

// Mock brand data with banner
const LUXURY_BRAND = {
  name: "GUCCI",
  bannerImage: "https://images.unsplash.com/photo-1542295669297-4d352b042bce?auto=format&fit=crop&q=80&w=1000",
  description: "Italian luxury house renowned for exceptional craftsmanship, innovative design, and timeless elegance."
};

const ITEMS = [
    { name: "Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
    { name: "Moto Jacket", price: 1800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
    { name: "Tech Coat", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
];

export default function LuxuryLiveFitting() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState(LUXURY_BRAND);

  // Custom Cursor (Gold Ring)
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

    window.addEventListener("mousemove", moveCursor);

    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2500);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      clearTimeout(timer);
    };
  }, [cursorX, cursorY]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0A0A0A] text-white ${spaceGrotesk.className}`}>
      {/* Custom Cursor */}
      <motion.div
        className="pointer-events-none fixed z-[9999] h-8 w-8 rounded-full border-2 border-[#C9B037] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />

      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loader"
            className="absolute inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]"
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            <div className="relative h-64 w-48 border border-white/10">
              <motion.div
                className="absolute top-0 left-0 h-[2px] bg-[#C9B037]"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-0 right-0 w-[2px] bg-[#C9B037]"
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 0.8 }}
              />
              <motion.div
                className="absolute bottom-0 right-0 h-[2px] bg-[#C9B037]"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 1.6 }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-[2px] bg-[#C9B037]"
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 2.4 }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className={`text-lg tracking-[0.3em] uppercase text-[#C9B037] ${playfair.className}`}>Loading</h2>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative flex h-full w-full flex-col"
          >
            {/* Parallax Brand Banner Background */}
            <motion.div
              className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
              style={{
                  backgroundImage: `linear-gradient(rgba(10,10,10,0.6), rgba(10,10,10,0.9)), url('${selectedBrand.bannerImage}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
              }}
            />

            {/* Top Navigation */}
            <div className="z-10 flex items-center justify-between p-8">
              <button className="flex size-12 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md transition-all duration-700 hover:border-[#C9B037] hover:bg-black/60">
                <span className="material-symbols-outlined text-white">close</span>
              </button>

              <div className="flex flex-col items-center">
                <h1 className={`text-2xl font-normal tracking-[0.2em] text-[#C9B037] ${playfair.className}`}>
                  {selectedBrand.name}
                </h1>
                <p className="mt-2 max-w-md text-center text-[10px] uppercase tracking-widest text-white/60">
                  {selectedBrand.description}
                </p>
              </div>

              <button className="flex size-12 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md transition-all duration-700 hover:border-[#C9B037] hover:bg-black/60">
                <span className="material-symbols-outlined text-white">more_horiz</span>
              </button>
            </div>

            {/* Main Interactive Area */}
            <div className="flex-1 px-8 py-12 z-10 flex items-center justify-between">
                {/* Left Side: Product Info */}
                <div className="w-1/3 space-y-12">
                    <div className="space-y-4">
                        <h3 className={`text-3xl text-white ${playfair.className}`}>Aura Blazer</h3>
                        <p className="text-2xl text-[#C9B037]">{formatPrice(2400)}</p>
                        <p className="text-sm text-white/70 leading-relaxed font-light">
                            Impeccably tailored, this signature piece combines modern architectural lines with traditional craftsmanship.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 w-20">Fit</span>
                            <div className="flex-1 h-[1px] bg-white/20 relative">
                                <div className="absolute top-1/2 left-[85%] -translate-y-1/2 w-2 h-2 rounded-full bg-[#C9B037] shadow-[0_0_10px_#C9B037]" />
                            </div>
                            <span className="text-xs text-[#C9B037]">Perfect</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 w-20">Drape</span>
                            <div className="flex-1 h-[1px] bg-white/20 relative">
                                <div className="absolute top-1/2 left-[95%] -translate-y-1/2 w-2 h-2 rounded-full bg-[#C9B037] shadow-[0_0_10px_#C9B037]" />
                            </div>
                            <span className="text-xs text-[#C9B037]">Fluid</span>
                        </div>
                    </div>
                </div>

                {/* Center: Main Visual */}
                <div className="absolute inset-0 flex items-center justify-center z-[-1] pointer-events-none">
                     <LuxuryImageDistortion
                        imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
                        className="w-[30vw] h-[70vh] border border-white/10 shadow-2xl"
                     />
                </div>
            </div>

            {/* Bottom Carousel (Masonry / Vertical styling) */}
            <div className="absolute bottom-12 right-12 z-10 w-80">
                <div className="flex flex-col gap-6">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/50 text-right mb-2">Collection</h4>

                    {ITEMS.map((item, i) => (
                        <motion.div
                            key={i}
                            className="group flex items-center gap-6 cursor-pointer"
                            whileHover={{ x: -10 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                        >
                            <div className="flex-1 text-right">
                                <p className={`text-lg text-white group-hover:text-[#C9B037] transition-colors duration-700 ${playfair.className}`}>{item.name}</p>
                                <p className="text-xs text-white/50">{formatPrice(item.price)}</p>
                            </div>
                            <div className="relative w-24 h-32 overflow-hidden border border-white/10 group-hover:border-[#C9B037]/50 transition-colors duration-700">
                                <motion.div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url("${item.img}")` }}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 1 }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Capture/Action Button */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
                <button className="group relative flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-xl transition-all duration-1000 hover:border-[#C9B037] hover:bg-black/80">
                    <div className="absolute inset-0 rounded-full border border-[#C9B037] opacity-0 scale-50 group-hover:opacity-100 group-hover:animate-ping" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9B037]">Try On</span>
                </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
