"use client";

import React, { useState, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import { motion, useMotionValue, useSpring } from "framer-motion";
import LuxuryImageDistortion from "./masterpiece/LuxuryImageDistortion";

const playfairDisplay = Playfair_Display({ subsets: ["latin"] });

const traceAnimation = `
  @keyframes trace {
    0% { stroke-dashoffset: 1200; opacity: 0; }
    10% { opacity: 1; }
    50% { stroke-dashoffset: 0; opacity: 1; }
    90% { opacity: 1; }
    100% { stroke-dashoffset: -1200; opacity: 0; }
  }
`;

export default function LuxuryLiveFitting() {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  // Hide default cursor globally for this component
  useEffect(() => {
    document.body.style.cursor = 'none';
    const interactables = document.querySelectorAll('button, a, input, select, textarea, [role="button"]');

    const onEnter = () => setIsHovering(true);
    const onLeave = () => setIsHovering(false);

    interactables.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
      // Force hide cursor on children
      (el as HTMLElement).style.cursor = 'none';
    });

    return () => {
      document.body.style.cursor = '';
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
        (el as HTMLElement).style.cursor = '';
      });
    };
  }, []);
  return (
    <>
      <style>{traceAnimation}</style>
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#f8f7f6] text-white dark:bg-[#0a0a0a] ${playfairDisplay.className}`}>
      {/* Custom Gold Ring Cursor */}
      <motion.div
        className="pointer-events-none fixed z-[9999] flex items-center justify-center rounded-full border border-[#ecab13] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: 32,
          height: 32,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(236, 171, 19, 0.1)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="h-1 w-1 rounded-full bg-[#ecab13]" />
      </motion.div>

      {/* Main AR Viewport Container */}
      <div
        className="relative flex h-screen w-full flex-col"
        data-alt="User reflection with AR garment overlay"
      >
        <div className="absolute inset-0 z-0">
          <LuxuryImageDistortion
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
            alt="Main Garment Visual"
            intensity={10}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/80" />
        </div>
        {/* Luxury Tracing Box Loading State */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="relative w-64 h-96">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 256 384">
              <rect
                x="2"
                y="2"
                width="252"
                height="380"
                fill="none"
                stroke="#ecab13"
                strokeWidth="1"
                strokeDasharray="1200"
                strokeDashoffset="1200"
                style={{ animation: "trace 3s ease-in-out infinite" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-80">
              <span className="material-symbols-outlined text-[#ecab13] animate-pulse">checkroom</span>
              <p className="mt-2 text-[8px] tracking-[0.3em] text-[#ecab13] uppercase">Analyzing Proportions</p>
            </div>
          </div>
        </div>

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-4 pt-8">
          <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <span className="material-symbols-outlined text-white">close</span>
          </div>
          <div className="flex items-center gap-2 rounded-full px-4 py-2" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <div className="size-2 animate-pulse rounded-full bg-red-500"></div>
            <h2 className="text-sm font-bold tracking-widest uppercase text-white">Live Fit AI</h2>
          </div>
          <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <span className="material-symbols-outlined text-white">flash_on</span>
          </div>
        </div>

        {/* Upper HUD: Stability & AI Status */}
        <div className="mt-4 space-y-4 px-4 z-10">
          <div className="max-w-[240px] rounded-xl p-4" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <div className="flex flex-col gap-2">
              <div className="flex items-end justify-between">
                <p className="text-xs font-medium uppercase tracking-tighter text-white">Body Stability</p>
                <p className="text-xs font-bold leading-none text-[#ecab13]">95%</p>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[#ecab13]" style={{ width: "95%" }}></div>
              </div>
              <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-white/50">
                <span className="material-symbols-outlined text-[12px]">target</span>
                MediaPipe Locked
              </p>
            </div>
          </div>
        </div>

        {/* Floating Fit Stats Sidebar (Right) */}
        <div className="absolute right-4 top-1/4 z-10 flex flex-col gap-3">
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-3" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <p className="text-[10px] font-bold uppercase text-white/60">Shoulder</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">98%</span>
              <span className="text-[10px] font-bold text-green-400">+2%</span>
            </div>
          </div>
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-3" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <p className="text-[10px] font-bold uppercase text-white/60">Waist</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">94%</span>
              <span className="text-[10px] font-bold text-green-400">+1%</span>
            </div>
          </div>
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-3" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <p className="text-[10px] font-bold uppercase text-white/60">Hem Line</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">100%</span>
              <span className="material-symbols-outlined text-[14px] text-[#ecab13]">verified</span>
            </div>
          </div>
        </div>

        {/* Brand Experience Section */}
        <div className="absolute right-6 bottom-32 z-20 w-80 rounded-2xl border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-2xl p-6 text-right transition-all duration-1000">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h3 className="text-xl font-bold tracking-[0.2em] text-[#ecab13] uppercase mb-2">Aura Maison</h3>
            <p className="text-sm font-light leading-relaxed text-white/70">
              Crafted in the heart of Paris, featuring our signature liquid silk alloy. Designed for the modern visionary who demands unparalleled elegance and structural perfection.
            </p>
            <div className="mt-4 flex justify-end gap-3">
              <span className="rounded-full border border-[#ecab13]/30 bg-[#ecab13]/10 px-3 py-1 text-[10px] tracking-widest text-[#ecab13] uppercase">Heritage Collection</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] tracking-widest text-white/50 uppercase">2024 Fall</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto pb-10 z-10">
          {/* Vertical Garment Selection */}
          <div className="absolute left-6 top-1/4 bottom-32 w-40 overflow-y-auto no-scrollbar z-20 flex flex-col gap-8 pr-4" style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }}>
              <div className="flex w-full flex-col gap-3 rounded-2xl border border-[#ecab13] bg-[#ecab13]/10 p-2 backdrop-blur-xl transition-all duration-1000 hover:scale-[1.02]">
                <div
                  className="aspect-[3/4] w-full rounded-xl bg-cover bg-center bg-no-repeat transition-transform duration-700"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0")' }}
                ></div>
                <div className="px-2 pb-2 text-center">
                  <p className="truncate text-xs font-bold uppercase tracking-widest text-white">Aura Blazer</p>
                  <p className="text-xs font-light text-[#ecab13] mt-1">$12,400</p>
                </div>
              </div>

              {[
                  { name: "Silk Gown", price: "$23,100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                  { name: "Moto Jacket", price: "$11,800", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
                  { name: "Tech Coat", price: "$14,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
              ].map((item, i) => (
                <div key={i} className="flex w-full flex-col gap-3 rounded-2xl border border-white/5 bg-[#0a0a0a]/40 p-2 backdrop-blur-xl opacity-70 transition-all duration-1000 hover:opacity-100 hover:scale-[1.02] hover:border-white/20">
                    <div
                    className="aspect-[3/4] w-full rounded-xl bg-cover bg-center bg-no-repeat grayscale-[30%] transition-all duration-700 hover:grayscale-0"
                    style={{ backgroundImage: `url("${item.img}")` }}
                    ></div>
                    <div className="px-2 pb-2 text-center">
                    <p className="truncate text-xs font-bold uppercase tracking-widest text-white/80 transition-colors duration-700 hover:text-white">{item.name}</p>
                    <p className="text-xs font-light text-white/40 mt-1">{item.price}</p>
                    </div>
                </div>
              ))}
          </div>

          {/* Capture Controls */}
          <div className="flex items-center justify-center gap-10 p-4">
            <button className="flex size-12 shrink-0 items-center justify-center rounded-full text-white" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <span className="material-symbols-outlined">photo_library</span>
            </button>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#ecab13]/30 blur-xl"></div>
              <button className="relative flex size-20 shrink-0 items-center justify-center rounded-full border-4 border-[#ecab13] bg-white">
                <div className="flex size-16 items-center justify-center rounded-full border-2 border-[#0a0a0a]/10">
                  <span className="material-symbols-outlined text-4xl text-[#0a0a0a]">camera</span>
                </div>
              </button>
              <div className="absolute -bottom-6 flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ecab13]">Fit Snap</span>
              </div>
            </div>
            <button className="flex size-12 shrink-0 items-center justify-center rounded-full text-white" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <span className="material-symbols-outlined">refresh</span>
            </button>
          </div>
        </div>

        {/* System UI Safe Area */}
        <div className="mx-auto mb-2 h-2 w-32 rounded-full bg-white/20"></div>
      </div>
    </div>
    </>
  );
}
