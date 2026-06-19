"use client";

import React, { useState, useEffect } from "react";
import { Space_Grotesk, Cinzel } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import LuxuryImageDistortion from "./LuxuryImageDistortion";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] });

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
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-black text-white ${spaceGrotesk.className}`}>

      {/* Custom Gold Ring Cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] flex size-8 items-center justify-center rounded-full border border-[#ecab13] mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      >
        <div className="size-1 rounded-full bg-[#ecab13]" />
      </motion.div>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black"
          >
            <div className="relative size-32">
              <motion.div
                className="absolute inset-0 border border-[#ecab13]/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <svg className="absolute inset-0 size-full" viewBox="0 0 100 100">
                <motion.rect
                  x="0" y="0" width="100" height="100"
                  fill="none"
                  stroke="#ecab13"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className={`text-[#ecab13] text-xs tracking-widest ${cinzel.className}`}>LOADING</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Viewport Container */}
      <div className="relative flex h-screen w-full flex-col">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0">
          <LuxuryImageDistortion
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
            alt="User reflection with AR garment overlay"
            className="h-full w-full opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 pointer-events-none" />
        </div>

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-6 pt-10">
          <button className="flex size-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:border-[#ecab13]/50 transition-colors duration-700">
            <span className="material-symbols-outlined text-white">close</span>
          </button>

          <div className="flex flex-col items-center">
            <h2 className={`text-xl text-[#ecab13] tracking-[0.2em] uppercase ${cinzel.className}`}>
              Aura Paris
            </h2>
            <p className="text-[10px] text-white/50 tracking-widest uppercase mt-1">Fall 2024 Collection</p>
          </div>

          <button className="flex size-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:border-[#ecab13]/50 transition-colors duration-700">
            <span className="material-symbols-outlined text-white">flash_on</span>
          </button>
        </div>

        {/* Upper HUD */}
        <div className="mt-4 px-6 z-10 flex justify-between items-start">
            <div className="w-[200px] rounded-xl p-4 bg-black/40 backdrop-blur-md border border-white/10">
              <div className="flex flex-col gap-3">
                <div className="flex items-end justify-between">
                  <p className={`text-xs uppercase tracking-widest text-white ${cinzel.className}`}>Pose Sync</p>
                  <p className={`text-xs text-[#ecab13] ${cinzel.className}`}>99%</p>
                </div>
                <div className="h-[1px] w-full bg-white/10">
                  <motion.div
                    className="h-full bg-[#ecab13]"
                    initial={{ width: 0 }}
                    animate={{ width: "99%" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 text-right">
                <div className="flex flex-col items-end">
                    <p className="text-[10px] font-light uppercase tracking-widest text-white/50">Material</p>
                    <p className={`text-sm text-[#ecab13] tracking-wider ${cinzel.className}`}>Silk Blend</p>
                </div>
                <div className="flex flex-col items-end">
                    <p className="text-[10px] font-light uppercase tracking-widest text-white/50">Fit</p>
                    <p className={`text-sm text-[#ecab13] tracking-wider ${cinzel.className}`}>Tailored</p>
                </div>
            </div>
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto pb-12 z-10 flex flex-col gap-8">

          {/* Garment Carousel - Masonry/Vertical style converted to large horizontal scroll */}
          <div className="flex overflow-x-auto px-6 py-4 scrollbar-hide gap-6" style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}>

            {/* Active Item */}
            <motion.div
              className="flex min-w-[180px] flex-col gap-4 shrink-0"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.7 }}
            >
              <div className="aspect-[3/4] w-full rounded-sm border border-[#ecab13]/50 p-1 bg-black/40 backdrop-blur-md">
                 <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0")' }}
                ></div>
              </div>
              <div className="px-1 text-center">
                <p className={`text-xs tracking-widest uppercase text-white ${cinzel.className}`}>Aura Blazer</p>
                <p className="text-xs font-light tracking-wider text-[#ecab13] mt-1">$2,400</p>
              </div>
            </motion.div>

            {[
                { name: "Silk Gown", price: "$3,100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                { name: "Moto Jacket", price: "$1,800", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
                { name: "Tech Coat", price: "$4,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex min-w-[180px] flex-col gap-4 shrink-0 opacity-60"
                whileHover={{ scale: 1.02, opacity: 1 }}
                transition={{ duration: 0.7 }}
              >
                  <div className="aspect-[3/4] w-full rounded-sm border border-white/10 p-1 bg-black/40 backdrop-blur-md">
                      <div
                      className="h-full w-full bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-1000"
                      style={{ backgroundImage: `url("${item.img}")` }}
                      ></div>
                  </div>
                  <div className="px-1 text-center">
                  <p className={`text-xs tracking-widest uppercase text-white ${cinzel.className}`}>{item.name}</p>
                  <p className="text-xs font-light tracking-wider text-white/50 mt-1">{item.price}</p>
                  </div>
              </motion.div>
            ))}
          </div>

          {/* Capture Controls */}
          <div className="flex items-center justify-center gap-12 px-6">
            <button className="flex size-14 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-white hover:border-white/30 transition-all duration-700">
              <span className="material-symbols-outlined font-light">photo_library</span>
            </button>

            <div className="relative flex items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-full border border-[#ecab13]/30"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <button className="relative flex size-24 shrink-0 items-center justify-center rounded-full border border-[#ecab13] bg-black hover:bg-[#ecab13]/10 transition-colors duration-1000">
                <div className="flex size-20 items-center justify-center rounded-full border border-[#ecab13]/50">
                  <span className="material-symbols-outlined text-4xl text-[#ecab13] font-light">camera</span>
                </div>
              </button>
            </div>

            <button className="flex size-14 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-white hover:border-white/30 transition-all duration-700">
              <span className="material-symbols-outlined font-light">refresh</span>
            </button>
          </div>
        </div>

        {/* System UI Safe Area */}
        <div className="mx-auto mb-2 h-1 w-32 rounded-full bg-white/20"></div>
      </div>
    </div>
  );
}
