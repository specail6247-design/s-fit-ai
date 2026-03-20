"use client";

import React, { useState, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { LuxuryImageDistortion } from "./masterpiece/LuxuryImageDistortion";

const playfairDisplay = Playfair_Display({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);

    // Simulate sophisticated loading
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white ${playfairDisplay.className}`}>
      {/* Custom Gold Ring Cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 size-8 rounded-full border border-[#ecab13] mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.7 }}
      />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="absolute inset-0 z-40 flex items-center justify-center bg-[#0a0a0a]"
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex flex-col items-center gap-6">
              {/* SVG Tracing Loader */}
              <svg width="100" height="100" viewBox="0 0 100 100" className="opacity-80">
                <motion.rect
                  x="10" y="10" width="80" height="80"
                  fill="none"
                  stroke="#ecab13"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                />
              </svg>
              <motion.p
                className="text-sm tracking-[0.3em] text-[#ecab13] uppercase"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Initializing Experience
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Luxury Viewport */}
      <div className="relative flex h-screen w-full flex-row">

        {/* Left Side: Product Image with 3D Distortion */}
        <div className="relative flex w-2/3 h-full items-center justify-center p-12">
           <LuxuryImageDistortion
             src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
             alt="Luxury Fashion Reflection"
             className="w-full max-w-2xl aspect-[3/4]"
             intensity={10}
           />

           {/* Brand Parallax Banner Overlay */}
           <motion.div
             className="absolute top-12 left-12 max-w-sm rounded-lg border border-white/10 bg-black/60 p-6 backdrop-blur-xl"
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, delay: 0.5 }}
           >
             <h1 className="text-3xl font-bold tracking-widest text-[#ecab13]">AURA</h1>
             <p className="mt-2 text-xs leading-relaxed text-white/70">
               Discover the essence of modern elegance. A curated collection blending architectural structure with fluid silk drapery.
             </p>
           </motion.div>
        </div>

        {/* Right Side: Vertical Masonry Product Selection */}
        <div className="relative flex w-1/3 flex-col border-l border-white/5 bg-black/20 p-8 backdrop-blur-sm">
           <div className="flex items-center justify-between pb-8">
             <h2 className="text-sm tracking-[0.2em] text-[#ecab13] uppercase">Collection</h2>
             <button className="flex size-10 items-center justify-center rounded-full border border-white/10 hover:border-[#ecab13] transition-colors duration-700">
               <span className="material-symbols-outlined text-sm">close</span>
             </button>
           </div>

           <div className="flex-1 overflow-y-auto scrollbar-hide space-y-8 pr-4">
             {/* Selected Item */}
             <motion.div
               className="group flex flex-col gap-4 border border-[#ecab13]/30 bg-[#ecab13]/5 p-4 rounded-xl cursor-pointer"
               whileHover={{ scale: 1.02 }}
               transition={{ duration: 0.7 }}
             >
                <div
                  className="aspect-[3/4] w-full rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0")' }}
                />
                <div className="flex justify-between items-end">
                  <p className="text-sm tracking-wider uppercase text-white">Aura Blazer</p>
                  <p className="text-sm font-semibold text-[#ecab13]">$2,400</p>
                </div>
             </motion.div>

             {/* Other Items */}
             {[
                  { name: "Silk Gown", price: "$3,100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                  { name: "Moto Jacket", price: "$1,800", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
                  { name: "Tech Coat", price: "$4,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
              ].map((item, i) => (
               <motion.div
                 key={i}
                 className="group flex flex-col gap-4 border border-white/5 bg-black/40 p-4 rounded-xl cursor-pointer hover:border-white/20 transition-colors duration-700 opacity-60 hover:opacity-100"
               >
                  <div
                    className="aspect-[3/4] w-full rounded-lg bg-cover bg-center"
                    style={{ backgroundImage: `url("${item.img}")` }}
                  />
                  <div className="flex justify-between items-end">
                    <p className="text-sm tracking-wider uppercase text-white/80">{item.name}</p>
                    <p className="text-sm font-semibold text-white/50">{item.price}</p>
                  </div>
               </motion.div>
             ))}
           </div>

           <div className="pt-8 flex justify-center">
             <button className="flex items-center gap-3 rounded-full border border-[#ecab13] px-8 py-4 text-[#ecab13] hover:bg-[#ecab13] hover:text-black transition-all duration-700 group">
               <span className="text-xs tracking-[0.2em] uppercase font-bold">Fit Snap</span>
               <span className="material-symbols-outlined text-sm group-hover:rotate-12 transition-transform">camera</span>
             </button>
           </div>
        </div>

      </div>
    </div>
  );
}
