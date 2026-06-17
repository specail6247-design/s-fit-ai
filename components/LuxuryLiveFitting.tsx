"use client";

import React, { useState, useEffect } from "react";
import { Cinzel, Space_Grotesk } from "next/font/google";
import LuxuryImageDistortion from "./ui/LuxuryImageDistortion";
import { motion, AnimatePresence } from "framer-motion";

const cinzel = Cinzel({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState("Aura");
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  const brands = {
    "Aura": {
      name: "Aura",
      description: "Ethereal designs blending modern architecture with fluid silhouettes.",
      banner: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000"
    }
  };

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-black text-white ${spaceGrotesk.className} cursor-none`}>
      {/* Custom Cursor */}
      <motion.div
        className="pointer-events-none fixed z-[100] size-8 rounded-full border border-[#ecab13] mix-blend-difference"
        animate={{ x: cursorPosition.x - 16, y: cursorPosition.y - 16 }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="pointer-events-none fixed z-[100] size-2 rounded-full bg-[#ecab13]"
        animate={{ x: cursorPosition.x - 4, y: cursorPosition.y - 4 }}
        transition={{ type: "spring", stiffness: 1000, damping: 40, mass: 0.1 }}
      />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black"
          >
             <div className="relative size-32">
                <motion.div
                    className="absolute inset-0 border border-white/20"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                />
                <motion.div
                    className="absolute inset-0 border-t border-l border-[#ecab13]"
                    initial={{ pathLength: 0, rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-[#ecab13] text-xl ${cinzel.className}`}>S_FIT</span>
                </div>
             </div>
             <p className="mt-8 text-xs tracking-[0.3em] uppercase text-white/50">Calibrating Experience</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Brand Experience Container */}
      <div className="relative flex h-[40vh] w-full flex-col justify-end p-8"
        style={{
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%), url('${brands.Aura.banner}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed" // Parallax effect
        }}
      >
        <div className="z-10 max-w-2xl">
            <h1 className={`text-5xl md:text-7xl font-light text-white mb-4 ${cinzel.className}`}>{brands.Aura.name}</h1>
            <p className="text-sm md:text-base text-white/70 max-w-md leading-relaxed tracking-wide">
                {brands.Aura.description}
            </p>
        </div>
      </div>

      {/* Top Navigation Bar (Overlaid on banner) */}
      <div className="absolute top-0 left-0 w-full z-20 flex items-center justify-between p-6">
        <button className="flex size-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:border-[#ecab13]/50 transition-colors duration-700">
          <span className="material-symbols-outlined text-white">close</span>
        </button>
        <div className="flex items-center gap-3 rounded-full px-6 py-3 bg-black/40 backdrop-blur-md border border-white/10">
          <h2 className={`text-sm tracking-[0.2em] uppercase text-[#ecab13] ${cinzel.className}`}>Luxury Fit AI</h2>
        </div>
        <button className="flex size-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:border-[#ecab13]/50 transition-colors duration-700">
          <span className="material-symbols-outlined text-white">tune</span>
        </button>
      </div>

      {/* Product Display Section */}
      <div className="flex-1 overflow-y-auto px-8 py-12 bg-black">
          <div className="flex items-center justify-between mb-12">
              <h3 className={`text-2xl text-white ${cinzel.className}`}>Curated Collection</h3>
              <span className="text-xs uppercase tracking-widest text-[#ecab13]">Autumn / Winter</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {/* Featured Main Product using LuxuryImageDistortion */}
              <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col gap-6 group">
                <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden border border-white/5 bg-zinc-900">
                    <LuxuryImageDistortion
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0"
                        alt="Aura Blazer"
                        className="w-full h-full"
                    />
                    <div className="absolute top-4 left-4 z-20">
                        <span className="px-3 py-1 text-[10px] uppercase tracking-widest bg-black/60 backdrop-blur-md text-[#ecab13] border border-[#ecab13]/30">Featured</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                        <h4 className={`text-xl text-white ${cinzel.className}`}>Aura Blazer</h4>
                        <p className="text-lg text-[#ecab13] tracking-wide">$2,400</p>
                    </div>
                    <p className="text-xs text-white/50 tracking-wider uppercase">Italian Silk Blend</p>
                </div>
              </div>

              {/* Other Products */}
              {[
                  { name: "Silk Gown", price: "$3,100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                  { name: "Moto Jacket", price: "$1,800", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
                  { name: "Tech Coat", price: "$4,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-6 group cursor-pointer">
                    <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden border border-white/5 bg-zinc-900">
                         <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
                            style={{ backgroundImage: `url("${item.img}")` }}
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>
                    <div className="flex flex-col gap-2 transition-transform duration-700 transform group-hover:translate-x-2">
                        <div className="flex justify-between items-start">
                            <h4 className={`text-xl text-white/90 group-hover:text-white transition-colors duration-700 ${cinzel.className}`}>{item.name}</h4>
                            <p className="text-lg text-[#ecab13]/80 group-hover:text-[#ecab13] transition-colors duration-700 tracking-wide">{item.price}</p>
                        </div>
                    </div>
                </div>
              ))}
          </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 w-full p-6 bg-gradient-to-t from-black via-black/90 to-transparent z-40">
         <div className="max-w-md mx-auto">
            <button className="w-full relative flex items-center justify-center py-5 bg-[#ecab13] text-black overflow-hidden group transition-all duration-700 hover:shadow-[0_0_30px_rgba(236,171,19,0.3)]">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out" />
                <span className={`relative z-10 text-sm tracking-[0.2em] uppercase font-bold ${cinzel.className}`}>
                    Initiate Fitting
                </span>
            </button>
         </div>
      </div>
    </div>
  );
}
