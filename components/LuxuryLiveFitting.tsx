"use client";

import React, { useState, useEffect } from "react";
import { Cinzel } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import LuxuryImageDistortion from "./masterpiece/LuxuryImageDistortion";
import CustomCursor from "./ui/CustomCursor";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });

const ITEMS = [
  { id: 1, name: "Aura Blazer", price: "$2,400", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0" },
  { id: 2, name: "Silk Gown", price: "$3,100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
  { id: 3, name: "Moto Jacket", price: "$1,800", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
  { id: 4, name: "Tech Coat", price: "$4,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
];

const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 1 } }}
    className="absolute inset-0 z-50 flex items-center justify-center bg-black"
  >
    <div className="relative h-32 w-32 flex items-center justify-center">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
        <motion.path
          d="M10,10 H90 V90 H10 Z"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
      </svg>
      <motion.span
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="font-serif text-[10px] tracking-[0.4em] text-[#D4AF37] uppercase"
      >
        Hermès
      </motion.span>
    </div>
  </motion.div>
);

export default function LuxuryLiveFitting() {
  const [selectedItem, setSelectedItem] = useState(ITEMS[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#050505] text-[#f5f5f5] ${cinzel.className}`}>
      <CustomCursor />

      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>

      {/* Background Visual - Luxury Image Distortion */}
      <div className="absolute inset-0 z-0 opacity-40 transition-opacity duration-1000">
         <LuxuryImageDistortion imageUrl={selectedItem.img} />
      </div>

      {/* Brand Banner Parallax (Simulated) */}
      <div className="absolute top-0 left-0 w-full h-[30vh] pointer-events-none z-10 bg-gradient-to-b from-black/80 to-transparent">
         <motion.div
           initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 2.6, duration: 1 }}
           className="flex flex-col items-center pt-8"
         >
             <h1 className="text-4xl md:text-6xl text-[#D4AF37] tracking-[0.1em] font-serif">HERMÈS</h1>
             <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 mt-2">Paris • Since 1837</p>
         </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex h-full w-full">

        {/* Left: Controls & Back */}
        <div className="flex flex-col justify-between p-8 w-24 z-20">
             <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-md bg-black/20 hover:bg-[#D4AF37]/20 transition-colors cursor-pointer">
                 <span className="material-symbols-outlined text-white">arrow_back</span>
             </div>
             {/* Mode Indicators */}
             <div className="flex flex-col gap-6">
                 <div className="text-[10px] [writing-mode:vertical-rl] rotate-180 text-[#D4AF37] tracking-widest font-bold">LUXURY MODE</div>
                 <div className="w-[1px] h-20 bg-gradient-to-b from-[#D4AF37] to-transparent"></div>
             </div>
        </div>

        {/* Center: Main Viewport (Empty to show background) */}
        <div className="flex-1 relative">
             {/* Central Focus (e.g. Scanning reticle) */}
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="w-[40vw] h-[60vh] border border-[#D4AF37]/20 rounded-full opacity-50"></div>
             </div>
        </div>

        {/* Right: Product Collection */}
        <div className="w-[400px] h-full bg-gradient-to-l from-[#050505] via-[#050505]/90 to-transparent p-8 overflow-y-auto scrollbar-hide flex flex-col pt-32">
             <motion.div
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: loading ? 0 : 1, x: loading ? 20 : 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="flex flex-col gap-12 pb-20"
             >
                 {ITEMS.map((item) => (
                     <div
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className={`group relative flex flex-col items-center cursor-pointer transition-all duration-700 ${selectedItem.id === item.id ? 'opacity-100 scale-100' : 'opacity-40 scale-95 hover:opacity-80'}`}
                     >
                         <div className="relative w-full aspect-[3/4] overflow-hidden">
                             <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                             {selectedItem.id === item.id && (
                                 <motion.div layoutId="activeBorder" className="absolute inset-0 border border-[#D4AF37]" />
                             )}
                         </div>
                         <div className="mt-4 text-center">
                             <h3 className="text-xl font-serif text-[#f5f5f5] tracking-wide">{item.name}</h3>
                             <p className="text-sm text-[#D4AF37] mt-1 font-medium">{item.price}</p>
                         </div>
                     </div>
                 ))}
             </motion.div>
        </div>
      </div>

      {/* Bottom Bar: Actions */}
      <div className="absolute bottom-0 left-0 w-full p-8 flex justify-center pointer-events-none z-20">
          <div className="pointer-events-auto flex items-center gap-8 bg-black/40 backdrop-blur-xl px-12 py-4 rounded-full border border-white/5 hover:border-[#D4AF37]/30 transition-colors duration-500">
               <button className="flex flex-col items-center gap-1 group">
                   <span className="material-symbols-outlined text-white/70 group-hover:text-white transition-colors">3d_rotation</span>
                   <span className="text-[8px] uppercase tracking-widest text-white/50">Rotate</span>
               </button>
               <button className="w-16 h-16 rounded-full border border-[#D4AF37] flex items-center justify-center bg-[#D4AF37]/10 hover:bg-[#D4AF37]/30 transition-all scale-100 hover:scale-110 active:scale-95">
                   <div className="w-12 h-12 bg-[#D4AF37] rounded-full"></div>
               </button>
               <button className="flex flex-col items-center gap-1 group">
                   <span className="material-symbols-outlined text-white/70 group-hover:text-white transition-colors">share</span>
                   <span className="text-[8px] uppercase tracking-widest text-white/50">Share</span>
               </button>
          </div>
      </div>

    </div>
  );
}
