"use client";

import React, { useState, useEffect } from "react";
import { Space_Grotesk, Cinzel } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { LuxuryImageDistortion } from "./masterpiece/LuxuryImageDistortion";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    // Simulate sophisticated loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleBrandSelect = (brandName: string) => {
    setSelectedBrand(selectedBrand === brandName ? null : brandName);
  };

  const garmentItems = [
    { name: "Aura Blazer", price: "$2,400", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0", brand: "Aura", desc: "A masterpiece of modern tailoring." },
    { name: "Silk Gown", price: "$3,100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0", brand: "Silk & Co", desc: "Flowing elegance for evening galas." },
    { name: "Moto Jacket", price: "$1,800", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA", brand: "Rider", desc: "Classic rebellion in premium leather." },
    { name: "Tech Coat", price: "$4,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk", brand: "Future", desc: "Advanced materials meet high fashion." },
  ];

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white cursor-none ${spaceGrotesk.className}`}>

      {/* Custom Gold Cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full border border-[#ecab13] mix-blend-difference"
        animate={{
          x: mousePosition.x - (isHovering ? 24 : 12),
          y: mousePosition.y - (isHovering ? 24 : 12),
          width: isHovering ? 48 : 24,
          height: isHovering ? 48 : 24,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        <motion.div
            className="w-1 h-1 bg-[#ecab13] rounded-full"
            animate={{ scale: isHovering ? 0 : 1 }}
        />
      </motion.div>

      {/* Loading State Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]"
          >
            <div className="relative w-48 h-48 flex items-center justify-center">
              {/* Thin gold line tracing a box animation */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <motion.rect
                  x="2" y="2" width="96" height="96"
                  fill="none"
                  stroke="#ecab13"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                />
              </svg>
              <h1 className={`${cinzel.className} text-[#ecab13] text-sm tracking-[0.3em] uppercase animate-pulse`}>
                Masterpiece
              </h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Brand Parallax Background */}
      <AnimatePresence>
        {selectedBrand && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&q=80&w=2000')", // Abstract luxury background
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.3
                }}
            />
        )}
      </AnimatePresence>


      {/* Main AR Viewport Container */}
      <div
        className="relative flex h-full w-full flex-col z-10"
        data-alt="User reflection with AR garment overlay"
        style={{
            backgroundImage: "linear-gradient(rgba(10,10,10,0.5), rgba(10,10,10,0.8)), url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000')",
            backgroundSize: "cover",
            backgroundPosition: "center"
        }}
      >
        {/* Scanning Effect Overlay */}
        <div
            className="absolute top-[40%] w-full h-[1px] opacity-40"
            style={{
                background: "linear-gradient(90deg, transparent, #ecab13, transparent)",
                boxShadow: "0 0 20px #ecab13"
            }}
        ></div>

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-6 pt-10">
          <button
            className="flex size-12 items-center justify-center rounded-full transition-colors duration-700 hover:bg-white/10"
            style={{ background: "rgba(10, 10, 10, 0.4)", backdropFilter: "blur(20px)", border: "1px solid rgba(236, 171, 19, 0.2)" }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-white/80 font-light">close</span>
          </button>
          <div className="flex items-center gap-3 px-6 py-2" style={{ background: "rgba(10, 10, 10, 0.4)", backdropFilter: "blur(20px)", border: "1px solid rgba(236, 171, 19, 0.2)" }}>
            <div className="size-1.5 animate-pulse rounded-full bg-[#ecab13]"></div>
            <h2 className={`${cinzel.className} text-xs tracking-[0.3em] uppercase text-[#ecab13]`}>Luxury Fit</h2>
          </div>
          <button
            className="flex size-12 items-center justify-center rounded-full transition-colors duration-700 hover:bg-white/10"
            style={{ background: "rgba(10, 10, 10, 0.4)", backdropFilter: "blur(20px)", border: "1px solid rgba(236, 171, 19, 0.2)" }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            aria-label="Flash"
          >
            <span className="material-symbols-outlined text-white/80 font-light">flash_on</span>
          </button>
        </div>

        {/* Upper HUD: Stability & AI Status */}
        <div className="mt-8 space-y-6 px-6 z-10">
          <div className="max-w-[280px] p-5" style={{ background: "rgba(10, 10, 10, 0.4)", backdropFilter: "blur(20px)", border: "1px solid rgba(236, 171, 19, 0.1)" }}>
            <div className="flex flex-col gap-4">
              <div className="flex items-end justify-between">
                <p className={`${cinzel.className} text-xs tracking-widest text-white/70 uppercase`}>Body Stability</p>
                <p className={`${cinzel.className} text-sm text-[#ecab13]`}>95%</p>
              </div>
              <div className="h-[1px] w-full bg-white/10">
                <div className="h-full bg-[#ecab13] transition-all duration-1000 ease-out" style={{ width: "95%" }}></div>
              </div>
              <p className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-white/40">
                <span className="material-symbols-outlined text-[10px] text-[#ecab13]">target</span>
                Precision Locked
              </p>
            </div>
          </div>
        </div>

        {/* Floating Fit Stats Sidebar (Right) */}
        <div className="absolute right-6 top-1/4 z-10 flex flex-col gap-6">
          <div className="flex min-w-[140px] flex-col gap-2 p-4 text-right" style={{ background: "rgba(10, 10, 10, 0.4)", backdropFilter: "blur(20px)", border: "1px solid rgba(236, 171, 19, 0.1)" }}>
            <p className={`${cinzel.className} text-[10px] uppercase tracking-widest text-white/50`}>Shoulder</p>
            <div className="flex items-baseline justify-end gap-2">
              <span className="text-xl font-light text-white">98%</span>
              <span className="text-[9px] text-[#ecab13] tracking-widest">+2%</span>
            </div>
          </div>
          <div className="flex min-w-[140px] flex-col gap-2 p-4 text-right" style={{ background: "rgba(10, 10, 10, 0.4)", backdropFilter: "blur(20px)", border: "1px solid rgba(236, 171, 19, 0.1)" }}>
            <p className={`${cinzel.className} text-[10px] uppercase tracking-widest text-white/50`}>Waist</p>
            <div className="flex items-baseline justify-end gap-2">
              <span className="text-xl font-light text-white">94%</span>
              <span className="text-[9px] text-[#ecab13] tracking-widest">+1%</span>
            </div>
          </div>
          <div className="flex min-w-[140px] flex-col gap-2 p-4 text-right" style={{ background: "rgba(10, 10, 10, 0.4)", backdropFilter: "blur(20px)", border: "1px solid rgba(236, 171, 19, 0.1)" }}>
            <p className={`${cinzel.className} text-[10px] uppercase tracking-widest text-white/50`}>Hem Line</p>
            <div className="flex items-baseline justify-end gap-2">
              <span className="text-xl font-light text-white">100%</span>
              <span className="material-symbols-outlined text-[12px] text-[#ecab13]">verified</span>
            </div>
          </div>
        </div>

        {/* Brand Description Panel */}
        <AnimatePresence>
            {selectedBrand && (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.7 }}
                    className="absolute left-6 top-1/2 z-10 max-w-xs"
                >
                    <div className="p-6" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(30px)", borderLeft: "2px solid #ecab13" }}>
                        <h3 className={`${cinzel.className} text-xl text-[#ecab13] mb-2 uppercase tracking-widest`}>{selectedBrand}</h3>
                        <p className="text-sm text-white/70 leading-relaxed font-light">
                            {garmentItems.find(g => g.brand === selectedBrand)?.desc}
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>


        {/* Bottom UI Section: Vertical Masonry Cards */}
        <div className="absolute left-6 bottom-32 z-20 flex gap-6 max-w-full overflow-x-auto pb-8 scrollbar-hide no-scrollbar pr-12">
            {garmentItems.map((item, i) => (
                <div
                    key={i}
                    className="flex flex-col gap-4 group cursor-none"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onClick={() => handleBrandSelect(item.brand)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Select ${item.name} by ${item.brand}`}
                >
                    <div className="w-[200px] h-[280px] p-2 transition-all duration-1000" style={{ background: selectedBrand === item.brand ? "rgba(236, 171, 19, 0.1)" : "rgba(10, 10, 10, 0.4)", backdropFilter: "blur(20px)", border: selectedBrand === item.brand ? "1px solid rgba(236, 171, 19, 0.5)" : "1px solid rgba(255, 255, 255, 0.05)" }}>
                        <div className="w-full h-full relative">
                            <LuxuryImageDistortion
                                imageUrl={item.img}
                                alt={item.name}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 px-2">
                        <p className={`${cinzel.className} text-xs tracking-widest uppercase text-white/80 transition-colors duration-700 group-hover:text-white`}>{item.name}</p>
                        <p className="text-sm font-light text-[#ecab13]">{item.price}</p>
                    </div>
                </div>
            ))}
        </div>

        {/* Bottom Capture Controls */}
        <div className="absolute bottom-8 w-full z-20 flex items-center justify-center gap-16">
            <button
                className="flex size-14 items-center justify-center rounded-full transition-transform duration-700 hover:scale-110"
                style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(20px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                aria-label="Gallery"
            >
              <span className="material-symbols-outlined text-white/70 font-light">photo_library</span>
            </button>
            <div className="relative flex items-center justify-center group cursor-none" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              <div className="absolute inset-0 rounded-full bg-[#ecab13]/20 blur-2xl transition-opacity duration-1000 group-hover:opacity-100 opacity-50"></div>
              <button
                className="relative flex size-24 items-center justify-center rounded-full border border-[#ecab13] bg-transparent transition-transform duration-700 group-hover:scale-105"
                aria-label="Capture"
              >
                <div className="flex size-20 items-center justify-center rounded-full border border-[#ecab13]/50 bg-[#0a0a0a]/80 backdrop-blur-md">
                  <span className="material-symbols-outlined text-3xl text-[#ecab13] font-light">camera</span>
                </div>
              </button>
            </div>
            <button
                className="flex size-14 items-center justify-center rounded-full transition-transform duration-700 hover:scale-110"
                style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(20px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                aria-label="Refresh"
            >
              <span className="material-symbols-outlined text-white/70 font-light">refresh</span>
            </button>
        </div>

        {/* System UI Safe Area */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 h-1 w-32 rounded-full bg-white/10 z-20"></div>

      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
