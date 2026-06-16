"use client";

import React, { useState, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

const playfair = Playfair_Display({ subsets: ["latin"] });

function LuxuryImageDistortion({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <motion.div
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url('${src}')`, filter: 'saturate(0.9) contrast(1.1)' }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </div>
  );
}

export default function LuxuryLiveFitting() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative flex min-h-screen w-full flex-col overflow-y-auto bg-[#0a0a0a] text-white ${playfair.className} cursor-none`}>
      {/* Custom Gold Ring Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full border-2 border-[#ecab13] pointer-events-none z-[100] mix-blend-difference"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      />
      <div className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#ecab13] pointer-events-none z-[100] mix-blend-difference"
           style={{ transform: `translate(${mousePosition.x - 4}px, ${mousePosition.y - 4}px)` }} />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]"
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
             <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <motion.rect
                    x="10" y="10" width="80" height="80"
                    fill="none"
                    stroke="#ecab13"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                   <p className="text-[#ecab13] text-[10px] tracking-widest uppercase">Initializing</p>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Brand Banner Experience */}
      <div className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden bg-fixed bg-center bg-cover"
           style={{ backgroundImage: "linear-gradient(rgba(10,10,10,0.4), rgba(10,10,10,0.8)), url('https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=2000')" }}>
          <div className="z-10 text-center px-8">
              <h1 className="text-4xl md:text-6xl font-normal tracking-widest text-[#ecab13] mb-4">AURA</h1>
              <p className="max-w-xl mx-auto text-sm md:text-base text-zinc-400 font-light leading-relaxed tracking-wider">
                  Discover the intersection of precision engineering and heritage craftsmanship. The Aura collection redefines modern elegance with proprietary liquid-silk textiles.
              </p>
          </div>
      </div>

      {/* Main AR Viewport Container */}
      <div className="relative flex w-full flex-col px-8 py-12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">

            {/* Live Camera / Fitting Viewport */}
            <div className="relative w-full lg:w-2/3 aspect-[3/4] bg-zinc-900 overflow-hidden border border-[#2d2d2d]">
                <LuxuryImageDistortion src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000" alt="User reflection with AR garment overlay" />

                {/* Top Navigation Bar */}
                <div className="absolute top-0 left-0 w-full z-10 flex items-center justify-between p-8">
                  <div className="flex items-center gap-4 rounded-full px-6 py-3" style={{ background: "rgba(10, 10, 10, 0.4)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.2)" }}>
                    <div className="size-2 animate-pulse rounded-full bg-[#ecab13]"></div>
                    <h2 className="text-xs font-normal tracking-[0.2em] uppercase text-white">Live Fit AI</h2>
                  </div>
                </div>

                {/* Upper HUD: Stability & AI Status */}
                <div className="absolute bottom-8 left-8 z-10">
                  <div className="min-w-[280px] p-6" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.2)" }}>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-end justify-between">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Body Stability</p>
                        <p className="text-xs font-normal text-[#ecab13]">95%</p>
                      </div>
                      <div className="h-[1px] w-full bg-white/10">
                        <div className="h-full bg-[#ecab13] transition-all duration-1000 ease-out" style={{ width: "95%" }}></div>
                      </div>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-[#ecab13]/60">
                        MediaPipe Locked
                      </p>
                    </div>
                  </div>
                </div>
            </div>

            {/* Right Sidebar - Products & Stats */}
            <div className="w-full lg:w-1/3 flex flex-col gap-8">
                {/* Floating Fit Stats */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between p-6 border border-[#2d2d2d] bg-[#0a0a0a]/80 backdrop-blur-md transition-colors duration-700 hover:border-[#ecab13]/50">
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Shoulder</p>
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl text-white">98%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-6 border border-[#2d2d2d] bg-[#0a0a0a]/80 backdrop-blur-md transition-colors duration-700 hover:border-[#ecab13]/50">
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Waist</p>
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl text-white">94%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-6 border border-[#2d2d2d] bg-[#0a0a0a]/80 backdrop-blur-md transition-colors duration-700 hover:border-[#ecab13]/50">
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Hem Line</p>
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl text-white">100%</span>
                    </div>
                  </div>
                </div>

                {/* Garment Collection Vertical List */}
                <div className="flex flex-col gap-6 mt-8">
                    <h3 className="text-sm font-normal tracking-[0.2em] text-[#ecab13] uppercase border-b border-[#2d2d2d] pb-4">The Collection</h3>

                    <div className="flex flex-col gap-6">
                      <div className="group flex flex-col gap-4 p-4 border border-[#ecab13]/30 bg-[#ecab13]/5 transition-all duration-1000">
                        <div
                          className="aspect-[3/4] w-full bg-cover bg-center bg-no-repeat overflow-hidden"
                          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0")' }}
                        >
                            <div className="w-full h-full bg-black/20 group-hover:bg-transparent transition-colors duration-1000"></div>
                        </div>
                        <div className="flex justify-between items-end">
                          <div>
                              <p className="text-xs font-normal tracking-[0.2em] uppercase text-white mb-1">Aura Blazer</p>
                              <p className="text-sm text-zinc-500">Selected</p>
                          </div>
                          <p className="text-lg text-[#ecab13]">$2,400</p>
                        </div>
                      </div>

                      {[
                          { name: "Silk Gown", price: "$3,100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                          { name: "Moto Jacket", price: "$1,800", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
                          { name: "Tech Coat", price: "$4,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
                      ].map((item, i) => (
                        <div key={i} className="group flex flex-col gap-4 p-4 border border-[#2d2d2d] bg-[#0a0a0a] transition-all duration-1000 hover:border-[#ecab13]/50 cursor-none">
                            <div
                            className="aspect-[3/4] w-full bg-cover bg-center bg-no-repeat overflow-hidden filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                            style={{ backgroundImage: `url("${item.img}")` }}
                            ></div>
                            <div className="flex justify-between items-end">
                              <div>
                                  <p className="text-xs font-normal tracking-[0.2em] uppercase text-zinc-400 group-hover:text-white transition-colors duration-1000">{item.name}</p>
                              </div>
                              <p className="text-sm text-zinc-500">{item.price}</p>
                            </div>
                        </div>
                      ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Capture Controls / Bottom Actions */}
        <div className="mt-16 flex items-center justify-center gap-16 py-8 border-t border-[#2d2d2d]">
          <button className="text-xs tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-colors duration-700 cursor-none">
            Upload
          </button>
          <div className="relative flex items-center justify-center">
            <button className="relative flex size-24 shrink-0 items-center justify-center rounded-full border border-[#ecab13] bg-transparent hover:bg-[#ecab13]/10 transition-colors duration-1000 cursor-none">
              <div className="flex size-20 items-center justify-center rounded-full bg-[#ecab13]">
              </div>
            </button>
            <div className="absolute -bottom-8 flex flex-col items-center">
              <span className="text-[10px] font-normal uppercase tracking-[0.3em] text-[#ecab13]">Capture</span>
            </div>
          </div>
          <button className="text-xs tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-colors duration-700 cursor-none">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
