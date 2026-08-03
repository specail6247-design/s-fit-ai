"use client";

import React, { useState, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import { motion, useMotionValue, useSpring } from "framer-motion";
import LuxuryImageDistortion from "./ui/LuxuryImageDistortion";

const playfair = Playfair_Display({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  // Custom Cursor (Gold Ring)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white ${playfair.className}`}>

      {/* Custom Cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 flex h-8 w-8 items-center justify-center rounded-full border border-[#ecab13]"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      >
        <div className="h-1 w-1 rounded-full bg-[#ecab13]" />
      </motion.div>

      {/* Main Container */}
      <div className="relative flex h-screen w-full">

        {/* Left Side: Brand Experience & Products (Vertical Layout) */}
        <div className="z-10 flex w-[400px] flex-col justify-between border-r border-[#ffffff10] bg-[#0a0a0a]/80 p-8 backdrop-blur-xl">

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-[0.2em] uppercase text-white">S_FIT AI</h2>
            <button className="text-[#ecab13] transition-colors duration-700 hover:text-white">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="my-10 space-y-8 flex-1 overflow-y-auto no-scrollbar pr-4">
            {/* Brand Banner Parallax */}
            <div className="group relative h-40 w-full overflow-hidden rounded-sm border border-[#ecab13]/20 cursor-pointer" onClick={() => setSelectedBrand("AURORA")}>
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000")' }}
              />
              <div className="absolute inset-0 bg-black/50 transition-colors duration-700 group-hover:bg-black/30" />
              <div className="absolute bottom-4 left-4 z-10">
                <p className="text-[10px] font-bold tracking-widest text-[#ecab13] uppercase">Featured Brand</p>
                <h3 className="text-2xl font-normal text-white">AURORA</h3>
              </div>
            </div>

            {selectedBrand && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-sm text-white/70 font-light leading-relaxed"
              >
                Timeless elegance redefined. Experience the bespoke craftsmanship of our latest evening collection, curated exclusively for S_FIT AI.
              </motion.div>
            )}

            {/* Vertical Product Cards */}
            <div className="space-y-6 pt-6">
              <h4 className="text-xs uppercase tracking-widest text-white/50">Collection</h4>

              {[
                { name: "Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                { name: "Aura Blazer", price: 2400, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0" },
                { name: "Tech Coat", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
              ].map((item, i) => (
                <div key={i} className="group flex cursor-pointer gap-4 transition-all duration-700 hover:translate-x-2">
                  <div className="relative h-24 w-20 overflow-hidden rounded-sm border border-transparent transition-colors duration-700 group-hover:border-[#ecab13]/50">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.img} alt={item.name} className="h-full w-full object-cover grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-sm font-normal uppercase tracking-wider text-white transition-colors duration-700 group-hover:text-[#ecab13]">{item.name}</p>
                    <p className="text-xs font-light text-white/50 mt-1">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(item.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 border-t border-[#ffffff10] pt-6">
             <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#ecab13]/30">
               {/* Sophisticated loading animation: thin gold line tracing */}
               <svg className="absolute inset-0 h-full w-full rotate-[-90deg]">
                  <circle cx="24" cy="24" r="23" fill="none" stroke="#ecab13" strokeWidth="1" strokeDasharray="144" strokeDashoffset="144" className="animate-[dash_2s_ease-in-out_infinite]" />
               </svg>
               <span className="material-symbols-outlined text-[#ecab13] text-sm">camera_alt</span>
             </div>
             <div>
               <p className="text-[10px] uppercase tracking-[0.2em] text-[#ecab13]">Ready</p>
               <p className="text-xs font-light text-white/50">Capture Fit</p>
             </div>
          </div>
        </div>

        {/* Right Side: Main Visual with LuxuryImageDistortion */}
        <div className="relative flex-1 bg-[#050505]">
          <div className="absolute inset-0">
             <LuxuryImageDistortion
               imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
               alt="Main Product Visual"
             />
          </div>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#0a0a0a]" />

          {/* Fit Stats (Subtle) */}
          <div className="absolute right-8 top-1/2 flex -translate-y-1/2 flex-col gap-6 z-10">
            <div className="flex flex-col items-end gap-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Shoulder Line</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-light text-white">Perfect</span>
                <span className="h-1 w-1 rounded-full bg-[#ecab13]"></span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Drape</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-light text-white">Natural</span>
                <span className="h-1 w-1 rounded-full bg-[#ecab13]"></span>
              </div>
            </div>
          </div>
        </div>

      </div>
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes dash {
          0% { stroke-dashoffset: 144; }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 144; }
        }
      `}</style>
    </div>
  );
}
